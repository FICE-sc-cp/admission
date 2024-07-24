import { AdminQueue, columns } from "./columns"

import {DataTable} from "@/app/admin/queue/data-table";

async function getData(): Promise<AdminQueue[]> {
    return [
        {
            number: 1,
            id: '012345',
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing10@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 2,
            id: '912345',
            name: 'Пррореоергр Абітурієнт Абітурієнтович',
            phoneNumber: '+38 096 417 37 11',
            email: 'testing23@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 3,
            id: '192345',
            name: 'Ллоллоллдплдт Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 4,
            id: '3512345',
            name: 'Вааавекіуфук Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 5,
            id: '12689345',
            name: 'Рллрлррделн Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 60,
            id: '7812345',
            name: 'Епрпрпрппрп Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 11,
            id: '5012345',
            name: 'Чвввііввівві Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 10,
            id: '1234005',
            name: 'Ттоортолншшнш Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 100,
            id: '1002345',
            name: 'ЗОООллтлтплтлпи Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 21,
            id: '12345',
            name: 'Дрррвррвррвр Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 101,
            id: '125',
            name: 'АААмммапмпаеае Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
        {
            number: 71,
            id: '145',
            name: 'ДДДДТОтооиоио Абітурієнт Абітурієнтович',
            phoneNumber: '+38 068 417 37 11',
            email: 'testing@gmail.com',
            printed: true,
            specialty: 121,
            accommodation: false,
            status: 'pending',
        },
    ];
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

