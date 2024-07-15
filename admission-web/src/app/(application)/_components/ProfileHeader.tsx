import {cn} from "@/lib/cn";

interface ProfileHeaderProps {
    label: string;
    className?: string;
}
export default function ProfileHeader({ label, className=""}: ProfileHeaderProps) {
    return (
        <div className={cn("flex flex-row justify-between items-center", className)}>
            <h6 className="font-light text-sm whitespace-nowrap text-violet-500">{label}</h6>
            <div className="w-11/12 h-[1px] ml-3 bg-violet-500"></div>
        </div>
    );
}