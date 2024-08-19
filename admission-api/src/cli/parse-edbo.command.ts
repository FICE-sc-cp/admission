import { Command, CommandRunner } from 'nest-commander';
import { PrismaService } from '../database/prisma.service';
import axios from 'axios';
import xlsx from 'node-xlsx';
import { first } from 'rxjs';

const id = '1298104';
const speciality = '123';
const studyForm = 'FULL_TIME';

@Command({
  name: 'parse-edbo',
})
export class ParseEdboCommand extends CommandRunner {
  constructor (
    private readonly prisma: PrismaService,
  ) {
    super();
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }

  async run () {
    const nakaz = xlsx.parse('126.xlsx');

    const users = await this.prisma.user.findMany({
      where: {
        contracts: {
          some: {
            specialty: '126',
            fundingSource: 'CONTRACT',
            studyForm: 'FULL_TIME',
          },
        },
      },
      include: {
        contracts: {
          include: {
            priorities: true,
          },
        },
      },
      orderBy: {
        competitivePoint: 'desc',
      },
    });

    const nakazUsers = [...nakaz[0].data, ...nakaz[1].data].map(([speciality, _, name]) => ({
      lastName: name.split(/\s+/g)[0],
      firstName: name.split(/\s+/g)[1],
      middleName: name.split(/\s+/g)[2],
    }));

    const result = users.filter((u) => nakazUsers.some((nu) => nu.firstName === u.firstName && nu.lastName === u.lastName && nu.middleName === u.middleName));

    console.log(result.length);

    for (const u of result) {
      const c = u.contracts.find((c) => c.number && c.specialty === '126' && c.fundingSource === 'CONTRACT');
      if (!c) {
        console.log(`user ${u.lastName} ${u.firstName} has no registered contract, create one`);
        await this.prisma.contract.updateMany({
          where: {
            userId: u.id,
            specialty: '126',
            fundingSource: 'CONTRACT',
          },
          data: {
            number: 'c',
          },
        });
      }
    }

    return;

    // for (const e of users) {
    //   const edboE = res.find((edboE) => edboE.lastName === e.lastName && e.firstName.startsWith(edboE.firstName) && e.middleName.startsWith(edboE.middleName));
    //   if (edboE) {
    //     await this.prisma.user.update({
    //       where: {
    //         id: e.id,
    //       },
    //       data: {
    //         competitivePoint: edboE.score,
    //         benefit: edboE.benefit,
    //       },
    //     });
    //     console.log(`Updated ${e.lastName} ${e.firstName} ${e.middleName}: ${edboE.benefit} and ${edboE.score}`);
    //   } else {
    //     const edboEB = res.find((edboE) => edboE.lastName.startsWith('174') && e.firstName.startsWith(edboE.firstName) && e.middleName.startsWith(edboE.middleName));
    //     if (edboEB) {
    //       await this.prisma.user.update({
    //         where: {
    //           id: e.id,
    //         },
    //         data: {
    //           competitivePoint: edboEB.score,
    //           benefit: edboEB.benefit,
    //         },
    //       });
    //       console.log(`Updated benefit ${e.lastName} ${e.firstName} ${e.middleName}: ${edboEB.benefit} and ${edboEB.score}`);
    //     } else {
    //       console.log(`User ${e.lastName} not found`);
    //     }
    //   }
    // }
  }

  async getNext (last: number) {
    const { data } = await axios.post('https://vstup.edbo.gov.ua/offer-requests/', `id=${id}&last=${last}`, {
      headers: {
        'Host': 'vstup.edbo.gov.ua',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': `https://vstup.edbo.gov.ua/offer/${id}/`,
      },
    });

    return data.requests;
  }
}
