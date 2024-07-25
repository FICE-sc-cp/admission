import {AdminEntrantDataTable} from "@/app/admin/entrants/data-table";
import {AdminEntrants, columns} from "@/app/admin/entrants/columns";

async function getEntrantsData(): Promise<AdminEntrants[]> {
    return [
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
        {
            name: 'Абітурієнтівний Абітурієнт Абітурієнтович',
            degree: 'бакалавр',
            specialty: '121, 126',
            status: 'НЕ ПОДАНО',
        },
    ]
}

export default async function AdminEntrantsPage() {
    const data = await getEntrantsData();
    return (
        <div className="container mx-auto py-4">
            <AdminEntrantDataTable columns={columns} data={data}/>
        </div>
    );
}
