import {Badge} from "@/components/ui/badge";

interface AdminStatusBadgeProps {
    status?: 'pending'| 'progress' | 'done';
};

const adminBadgeStyles = {
    pending: {className:"bg-gray-200 whitespace-nowrap text-black hover:bg-gray-200", label:'Чекає'},
    progress: {className:"bg-orange-300 whitespace-nowrap text-black hover:bg-orange-300", label: 'Подає документи'},
    done: {className:"bg-lime-300 whitespace-nowrap text-black hover:bg-lime-300", label: 'Завершив'},
};

export default function AdminStatusBadge({status = 'pending'}: AdminStatusBadgeProps)  {
    const { className, label } = adminBadgeStyles[status];
    return (
        <Badge className={className}>{label}</Badge>
    );
};
