import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentState, EducationalDegree, EducationalProgramType, EducationProgram, PaymentType, Role, StudyForm, StudyType } from '@prisma/client';
import { EmailService } from '../email/email.service';
import { FileService } from 'src/globals/files/file.service';
import { PriorityDto } from './dto/priority.dto';
import { PersonalDataDto, StudyContractDto } from './dto/study-contract.dto';
import { UserRepo } from 'src/database/repo/user.repo';
import { CONTRACT_IS_CREATED_MSG, CONTRACTS_ARE_SENT_MSG, DATA_NOT_FOUND_MSG, EDUCATION_PROGRAMS_INVALID_MSG, PAYMENT_TYPE_IS_REQUIRED_MSG, PRIORITIES_ARE_SENT_MSG, PRIORITY_IS_GENERATED_MSG } from './constants';
import { StudyTypeEnum } from '../../globals/enums/study-type.enum';
import { PaymentTypeEnum } from '../../globals/enums/payment-type.enum';
import { StudyFormEnum } from '../../globals/enums/study-form.enum';
import { EducationalDegreeEnum } from '../../globals/enums/educational-degree.enum';
import { EducationalProgramTypeEnum } from '../../globals/enums/educational-program-type.enum';
import { getEnumKeyByValue } from 'src/globals/enum-utils';

const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const EducationPrograms = {
  121: [EducationProgram.CSSE, EducationProgram.ISSE],
  126: [EducationProgram.IIS, EducationProgram.ISRS, EducationProgram.IMST],
};

@Injectable()
export class DocumentService {

  constructor (
    private readonly fileService: FileService,
    private readonly emailService: EmailService,
    private readonly userRepo: UserRepo,
  ) {}

  private getFullString (separator: string, ...args) {
    return args.filter((a) => a).join(separator);
  }

  private formatPersonalData (data: PersonalDataDto) {
    const passport = this.getFullString(' ', data.passportSeries, data.passportNumber);
    return {
      ...data,
      passport,
      passportData: this.getFullString(', ', data.passportDate, data.passportInstitute),
      address: this.getFullString(', ', data.region, data.settlement, data.address, data.index),
      idCode: !data.idCode ? passport : data.idCode,
      bigName: data.lastName.toUpperCase(),
    };
  }

  private formatContracts (data: StudyContractDto) {
    const obj = {
      entrant: this.formatPersonalData(data.entrant),
      representative: data.representative?.firstName ? this.formatPersonalData(data.representative) : {},
    };

    const agreementName = `${getEnumKeyByValue(EducationalDegreeEnum, data.meta.degree)}_${data.meta.specialty}_${getEnumKeyByValue(EducationalProgramTypeEnum, data.meta.programType)}_${data.meta.studyForm}_${data.meta.studyType}.docx`;
    const agreement = this.fileService.fillTemplate(agreementName, obj);

    const attachments = [{ name: `Договір | ${data.entrant.lastName} ${data.entrant.firstName} ${data.entrant.middleName} ${data.meta.specialty}.docx`, buffer: agreement, contentType: DOCX }];

    if (getEnumKeyByValue(StudyTypeEnum, data.meta.studyType) === StudyType.CONTRACT) {
      const paymentName = `${getEnumKeyByValue(EducationalDegreeEnum, data.meta.degree)}_${data.meta.specialty}_${getEnumKeyByValue(EducationalProgramTypeEnum, data.meta.programType)}_${data.meta.studyForm}_${data.meta.paymentType}.docx`;
      const payment = this.fileService.fillTemplate(paymentName, { ...obj, customer: this.formatPersonalData(data.customer) });
      attachments.push({ name: `Оплата | ${data.entrant.lastName} ${data.entrant.firstName} ${data.entrant.middleName} ${data.meta.specialty}.docx`, buffer: payment, contentType: DOCX });
    }
    return attachments;
  }

  private async sendContracts (data: StudyContractDto[], sendToEntrant: boolean) {
    const attachments = [];

    data.forEach((studyContract) => {
      attachments.push(...this.formatContracts(studyContract));
    });

    const emails = [];
    if (sendToEntrant) emails.push(data[0].entrant.email);
    if (data[0].meta.isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    const admissionEmail = getEnumKeyByValue(EducationalDegreeEnum, data[0].meta.degree) === EducationalDegree.MASTER ? 'vstup.fiot.m@gmail.com' : 'vstup.fiot@gmail.com';
    const link = getEnumKeyByValue(EducationalDegreeEnum, data[0].meta.degree) === EducationalDegree.MASTER ? 'https://t.me/fictmasterchat' : 'https://t.me/abit_fict';

    await this.emailService.sendEmail({
      to: emails,
      subject: `Договори щодо вступу | ${data[0].entrant.lastName} ${data[0].entrant.firstName}`,
      message: `Договори НЕ ТРЕБА друкувати чи доповнювати іншою інформацією. Якщо подаєте дистанційно, завантажте документи та підпишіть КЕПом вступника та законного представника (замовника), якщо вступнику немає 18 років (деталі: https://pk.kpi.ua/originals/). Підписані КЕПом документи слід відправляти на пошту ${admissionEmail}. Якщо виникають запитання, звертайтеся в чат в телеграмі:`,
      link,
      attachments,
    });
  }

  private formatPriorities (data: PriorityDto) {
    const priorities = {};
    for (const num in data.priorities) {
      const program = data.priorities[num];
      priorities[program] = num;
    }

    const day = data.day.padStart(2, '0');
    const priority = this.fileService.fillTemplate(`Пріоритетка_${data.specialty}.docx`, { ...data, day, ...priorities });

    return { name: `Пріоритетка | ${data.lastName} ${data.firstName} ${data.middleName} ${data.specialty}.docx`, buffer: priority, contentType: DOCX };
  }

  private async sendPriorities (data: PriorityDto[], sendToEntrant: boolean) {
    const attachments = [];
    
    data.forEach((priority) => {
      attachments.push(this.formatPriorities(priority));
    });

    const emails = [];
    if (sendToEntrant) emails.push(data[0].email);
    if (data[0].isToAdmission) emails.push(process.env.ADMISSION_EMAIL);

    await this.emailService.sendEmail({
      to: emails,
      subject: `Пріоритетки | ${data[0].lastName} ${data[0].firstName}`,
      message: 'Пріоритетки НЕ ТРЕБА друкувати чи доповнювати іншою інформацією. Якщо подаєте дистанційно, завантажте документ та підпишіть КЕПом вступника. Якщо виникають запитання, звертайтеся в чат в телеграмі:',
      link: 'https://t.me/abit_fict',
      attachments,
    });
  }

  async createContract (data: StudyContractDto) {
    if (getEnumKeyByValue(StudyTypeEnum, data.meta.studyType) === StudyType.CONTRACT && !data.meta.paymentType) {
      throw new BadRequestException(PAYMENT_TYPE_IS_REQUIRED_MSG);
    }

    const { firstName, middleName, lastName, email, ...entrant } = data.entrant;

    const dbEntrant = await this.userRepo.getOrCreate({
      firstName,
      middleName,
      lastName,
      email: email,
      role: Role.ENTRANT,
    });

    const customer = data.customer ?? data.representative ?? data.entrant;

    await this.sendContracts([{ ...data, customer }], true);

    await this.userRepo.updateById(dbEntrant.id, {
      contracts: {
        create: {
          degree: getEnumKeyByValue(EducationalDegreeEnum, data.meta.degree) as EducationalDegree,
          educationalProgram: data.meta.educationalProgram,
          programType: getEnumKeyByValue(EducationalProgramTypeEnum, data.meta.programType) as EducationalProgramType,
          paymentType: getEnumKeyByValue(PaymentTypeEnum, data.meta.paymentType) as PaymentType,
          specialty: data.meta.specialty,
          studyForm: getEnumKeyByValue(StudyFormEnum, data.meta.studyForm) as StudyForm,
          studyType: getEnumKeyByValue(StudyTypeEnum, data.meta.studyType) as StudyType,
        },
      },
      entrantData: {
        upsert: {
          update: entrant,
          create: entrant,
        },
      },
      representativeData: {
        upsert: data.representative ? {
          update: data.representative,
          create: data.representative,
        } : undefined,
      },
      CustomerData: {
        upsert: getEnumKeyByValue(StudyTypeEnum, data.meta.studyType) === StudyType.CONTRACT ? {
          update: customer,
          create: customer,
        } : undefined,
      },
    });

    return { message: CONTRACT_IS_CREATED_MSG };
  }

  async sendAllContracts (id: string) {
    const entrant = await this.userRepo.find({ id });
    if (entrant.contracts.length === 0) throw new BadRequestException(DATA_NOT_FOUND_MSG);

    const studyContracts: StudyContractDto[] = entrant.contracts.map((contract) => {
      return {
        meta: {
          degree: EducationalDegreeEnum[contract.degree],
          educationalProgram: contract.educationalProgram,
          programType: EducationalProgramTypeEnum[contract.programType],
          specialty: contract.specialty,
          studyType: StudyTypeEnum[contract.studyType],
          studyForm: StudyFormEnum[contract.studyForm],
          paymentType: PaymentTypeEnum[contract.paymentType],
          isToAdmission: true,
        },
        entrant: {
          firstName: entrant.firstName,
          middleName: entrant.middleName,
          lastName: entrant.lastName,
          email: entrant.email,
          ...entrant.entrantData,
        },
        representative: entrant.representativeData,
        customer: entrant.CustomerData,
      };
    });

    await this.sendContracts(studyContracts, true);

    return { message: CONTRACTS_ARE_SENT_MSG };
  }

  async sendAllPriorities (id: string) {
    const entrant = await this.userRepo.find({ id });
    if (entrant.entrantPriorities.length === 0) throw new BadRequestException(DATA_NOT_FOUND_MSG);

    const priorities: PriorityDto[] = [];
    entrant.entrantPriorities.forEach((entrantPriority) => {
      const priorityList = {};
      entrantPriority.priorities.map(({ number, program }) => {
        priorityList[number] = program;
      });
      const priority: PriorityDto = {
        firstName: entrant.firstName,
        middleName: entrant.middleName,
        lastName: entrant.lastName,
        specialty: entrantPriority.specialty,
        day: entrantPriority.date.split('.')[0],
        isToAdmission: true,
        priorities: priorityList,
        email: entrant.email,
      };
      priorities.push(priority);
    });
    
    await this.sendPriorities(priorities, false);

    return { message: PRIORITIES_ARE_SENT_MSG };
  }

  private validatePrograms ({ specialty, priorities }: PriorityDto) {
    const programs = Object.values(priorities);
    const expected = EducationPrograms[specialty];
    if (expected.length !== programs.length || !expected.every((p) => programs.includes(p))) {
      throw new BadRequestException(EDUCATION_PROGRAMS_INVALID_MSG);
    }
  }

  async generatePriority (data: PriorityDto) {
    this.validatePrograms(data);
    const day = data.day.padStart(2, '0');

    const priorities = [];
    for (const priority in data.priorities) {
      priorities.push({ priority: Number(priority), program: data.priorities[priority] });
    }

    const entrant = await this.userRepo.getOrCreate({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      role: Role.ENTRANT,
    });

    await this.userRepo.updateById(entrant.id, {
      entrantPriorities: {
        create: {
          state: DocumentState.PENDING,
          date: `${day}.08.${new Date().getFullYear()}`,
          specialty: data.specialty,
          priorities: {
            createMany: {
              data: priorities,
            },
          },
        },
      },
    });

    await this.sendPriorities([data], true);

    return { message: PRIORITY_IS_GENERATED_MSG };
  }
}
