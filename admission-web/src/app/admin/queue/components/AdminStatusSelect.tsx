import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import AdminStatusBadge from "@/app/admin/queue/components/AdminStatusBadge";
import * as React from "react";

export default function AdminStatusSelect() {
    return (
        <Select>
            <SelectTrigger className="border-transparent rounded-none w-[180px] focus:outline-none focus:ring-0 hover:outline-none">
                <SelectValue placeholder={<AdminStatusBadge status='pending'/>} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pending"><AdminStatusBadge status='pending'/></SelectItem>
                <SelectItem value="progress"><AdminStatusBadge status='progress'/></SelectItem>
                <SelectItem value="done"><AdminStatusBadge status='done'/></SelectItem>
            </SelectContent>
        </Select>
    );
};
