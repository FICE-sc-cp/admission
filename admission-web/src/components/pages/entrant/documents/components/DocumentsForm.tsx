'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { getCurrentDate } from '@/lib/utils/getCurrentDate';
import { useEffect } from 'react';
import DocumentsApi from '@/app/api/documents/documents-api';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  TDocumentsSchema,
  DocumentsSchema,
} from '@/lib/schemas/documents.schemas';
import PriorityForm from './PriorityForm';
import {
  PROFESSIONAL,
  SCIENTIFIC,
  IPeduPrograms,
  ISTeduPrograms,
  PROGRAM_TO_ABBREVIATION,
} from '@/lib/constants/educational-programs';
import { EducationalProgramType } from '$/utils/src/enums/EducationalProgramTypeEnum';
import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { useCommonToast } from '@/components/ui/toast/use-common-toast';
import { isUniquePriorities } from '@/lib/utils/isUnique';
import { EducationalDegree } from '$/utils/src/enums/EducationalDegreeEnum';
import { StudyForm } from '$/utils/src/enums/StudyFormEnum';
import { Specialty } from '$/utils/src/enums/SpecialtyEnum';
import { PaymentType } from '$/utils/src/enums/PaymentTypeEnum';

export const DocumentsForm = () => {
  const { toastError, toastSuccess } = useCommonToast();

  const form = useForm<TDocumentsSchema>({
    resolver: zodResolver(DocumentsSchema),
    defaultValues: {
      priorityDate: getCurrentDate(),
      priorities: [],
    },
    mode: 'onChange',
  });

  const educationalProgram = form.watch('educationalProgram');
  const specialty = form.watch('specialty');
  const degree = form.watch('degree');
  const fundingSource = form.watch('fundingSource');
  const priorities = form.watch('priorities');
  const programType = form.watch('programType');
  const studyForm = form.watch('studyForm');

  const { push } = useRouter();

  const { user } = useAuth();

  const onSubmit = async (data: TDocumentsSchema) => {
    if (!isUniquePriorities(priorities)) {
      for (let i = 0; i < priorities.length; i++) {
        form.setError(`priorities.${i}`, {
          type: 'required',
          message: 'Пріоритети мають бути унікальними!',
        });
      }
      return;
    } else {
      try {
        await DocumentsApi.createDocument({
          ...data,
          userId: user!.id,
          priorities,
          educationalProgram:
            data.degree === EducationalDegree.MASTER
              ? (PROGRAM_TO_ABBREVIATION[
                  data.educationalProgram as string
                ] as string)
              : null,
        });
        push('/');
        toastSuccess(
          'Договір успішно створений!',
          'Ви можете переглянути його в профілі'
        );
      } catch {
        toastError('Щось пішло не так!');
      }
    }
  };

  useEffect(() => {
    if (
      specialty === Specialty.F7 ||
      degree === EducationalDegree.MASTER ||
      (specialty === Specialty.F2 && studyForm === StudyForm.PART_TIME)
    ) {
      form.setValue('priorities', []);
    }
    if (degree === EducationalDegree.MASTER) {
      if (educationalProgram) {
        form.setValue(
          'specialty',
          educationalProgram.split(' ')[0] as Specialty
        );
      }
    }
    if (fundingSource === FundingSource.BUDGET) {
      form.setValue('paymentType', null);
    }
    if (degree === EducationalDegree.BACHELOR) {
      form.setValue('educationalProgram', null);
      form.setValue('programType', EducationalProgramType.PROFESSIONAL);
    }
  }, [specialty, degree, fundingSource, studyForm, educationalProgram]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='degree'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Освітній рівень(бакалавр/магістр)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={EducationalDegree.BACHELOR} />
                    </FormControl>
                    <FormLabel>Бакалавр</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={EducationalDegree.MASTER} />
                    </FormControl>
                    <FormLabel>Магістр</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fundingSource'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Джерело фінансування</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FundingSource.BUDGET} />
                    </FormControl>
                    <FormLabel>Бюджет</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FundingSource.CONTRACT} />
                    </FormControl>
                    <FormLabel>Контракт</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='studyForm'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Форма навчання (денна/заочна/дистанційна)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={StudyForm.FULL_TIME} />
                    </FormControl>
                    <FormLabel>Денна</FormLabel>
                  </FormItem>
                  {
                    specialty !== Specialty.F2G &&
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={StudyForm.PART_TIME} />
                      </FormControl>
                      <FormLabel>Заочна</FormLabel>
                    </FormItem>
                  }
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={StudyForm.REMOTE} />
                    </FormControl>
                    <FormLabel>Дистанційна</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fundingSource === FundingSource.CONTRACT && (
          <FormField
            control={form.control}
            name='paymentType'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Тип оплати</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={PaymentType.ANNUALLY} />
                      </FormControl>
                      <FormLabel>Щорічно</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={PaymentType.SEMESTERLY} />
                      </FormControl>
                      <FormLabel>Щосеместрово</FormLabel>
                    </FormItem>
                    <FormItem
                      className={`${studyForm === StudyForm.PART_TIME ? 'hidden' : 'flex'} items-center space-x-3 space-y-0`}
                    >
                      <FormControl>
                        <RadioGroupItem value={PaymentType.MONTHLY} />
                      </FormControl>
                      <FormLabel>Щомісячно</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {degree === EducationalDegree.MASTER && (
          <>
            <FormField
              control={form.control}
              name='programType'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Тип освітньої програми</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value as string}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value={EducationalProgramType.PROFESSIONAL}
                          />
                        </FormControl>
                        <FormLabel>Професійна</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem
                            value={EducationalProgramType.SCIENTIFIC}
                          />
                        </FormControl>
                        <FormLabel>Наукова</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {programType && (
              <FormField
                control={form.control}
                name='educationalProgram'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Освітня програма</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        className='flex flex-col space-y-1'
                      >
                        {programType === EducationalProgramType.PROFESSIONAL &&
                          PROFESSIONAL.map((program) => (
                            <FormItem
                              key={program}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem value={program} />
                              </FormControl>
                              <FormLabel>{program}</FormLabel>
                            </FormItem>
                          ))}
                        {programType === EducationalProgramType.SCIENTIFIC &&
                          SCIENTIFIC.map((program) => (
                            <FormItem
                              key={program}
                              className='flex items-center space-x-3 space-y-0'
                            >
                              <FormControl>
                                <RadioGroupItem value={program} />
                              </FormControl>
                              <FormLabel>{program}</FormLabel>
                            </FormItem>
                          ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        )}
        {degree !== EducationalDegree.MASTER && (
          <FormField
            control={form.control}
            name='specialty'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Спеціальність</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Specialty.F2} />
                      </FormControl>
                      <FormLabel>
                        F2 Інженерія програмного забезпечення
                      </FormLabel>
                    </FormItem>
                    {
                      studyForm !== StudyForm.PART_TIME &&
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={Specialty.F2G} />
                        </FormControl>
                        <FormLabel>
                          F2 Інженерія програмного забезпечення (Програмування комп'ютерних ігор)
                        </FormLabel>
                      </FormItem>
                    }
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Specialty.F7} />
                      </FormControl>
                      <FormLabel>F7 Комп’ютерна інженерія</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Specialty.F6} />
                      </FormControl>
                      <FormLabel>
                        F6 Інформаційні системи та технології
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {specialty === Specialty.F2 &&
          degree !== EducationalDegree.MASTER &&
          studyForm !== StudyForm.PART_TIME && (
            <PriorityForm educationalPrograms={IPeduPrograms} form={form} />
          )}
        {specialty === Specialty.F6 && degree !== EducationalDegree.MASTER && (
          <PriorityForm educationalPrograms={ISTeduPrograms} form={form} />
        )}
        <Button type='submit' className='w-full md:w-[185px]'>
          Надіслати договір
        </Button>
      </form>
    </Form>
  );
};
