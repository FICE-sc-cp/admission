import ProfileHeader from "@/app/(application)/_components/ProfileHeader";

export default function StudentPersonalDataBlock() {
    return (
        <div className="flex flex-col m-5">
            <ProfileHeader label="Особисті дані" />
            <h2 className="mt-3">ПІБ</h2>
            <div className="flex flex-col gap-3 mt-3 font-light text-sm">
                <h6>Освітній рівень:</h6>
                <h6>Спеціальність:</h6>
                <h6>Форма навчання:</h6>
                <h6>Номер телефону:</h6>
                <h6>Електронна пошта:</h6>
                <h6>Номер паспорту:</h6>
                <h6>Дата видачі:</h6>
                <h6>Орган видачі:</h6>
                <h6>Ідентифікаційний код:</h6>
                <h6>Місце реєстрації:</h6>
            </div>
        </div>
    );
}