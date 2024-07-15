import ProfileHeader from "@/app/(application)/_components/ProfileHeader";

export default function StudentPrioritiesBlock() {
    return (
            <div className="flex flex-col m-5">
                <ProfileHeader label="Пріоритети освітніх програм"/>
                <div className="flex flex-col gap-3 mt-3 font-light text-sm">
                    <h6>1. Перший пріоритет</h6>
                    <h6>2. Другий пріоритет</h6>
                </div>
            </div>
    );
}