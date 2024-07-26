import {AdminEntrantDataTable} from "@/app/admin/entrants/data-table";
import {columns} from "@/app/admin/entrants/columns";
import instance from "@/lib/api/instance";
import axios from "axios";
import {User} from "@/constants/admin-entrants-table";
import {revalidatePath} from "next/cache";
import {NextRequest} from "next/server";
import {router} from "next/client";
import {useRouter} from "next/navigation";

async function getUsers(): Promise<User[]> {
    const { data } = await axios.get('http://localhost:4455/users');
    return data;
}

export async function deleteEntrant(id: string | undefined) {
    await axios.delete(`http://localhost:4455/users/${id}`);
    // revalidatePath('/admin/entrants/${id}', 'page');
}

export default async function AdminEntrantsPage() {
    const data = await getUsers();
    return (
        <div className="container mx-auto py-4">
            <AdminEntrantDataTable columns={columns} data={data}/>
        </div>
    );
}
