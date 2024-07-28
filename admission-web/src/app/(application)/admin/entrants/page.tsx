'use client';
import { useEffect, useState } from 'react';
import { AdminEntrantDataTable } from '@/app/(application)/admin/entrants/data-table';
import { columns } from '@/app/(application)/admin/entrants/columns';
import AdminEntrantsApi from '@/app/api/admin-entrants/admin-entrants-api';
import {User} from "@/app/api/admin-entrants/admin-entrants-api.types";

export default function AdminEntrantsPage() {
    const [data, setData] = useState<User[]>([]);

    const fetchData = async () => {
        try {
            const users = await AdminEntrantsApi.getUsers();
            setData(users);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [data]);

    return (
        <div className='container mx-auto py-4'>
            <AdminEntrantDataTable columns={columns} data={data} />
        </div>
    );
}

