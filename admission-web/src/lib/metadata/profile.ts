import {Metadata} from "next";

const title = 'Профіль користувача | ФІОТ 2024 | Подання заяв на вступ';
const description = 'Сторінка перегляду профілю користувача. Тут ти зможеш переглянути усю інформацію з заповнених документів';

export const profileMetadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    }
};