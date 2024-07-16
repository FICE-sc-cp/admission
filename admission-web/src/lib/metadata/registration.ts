import {Metadata} from "next";

const title = 'Реєстрація | ФІОТ 2024 | Подання заяв на вступ';
const description = 'Сторінка авторизації абітурієнтів на сайті вступника ФІОТ для подання документів на вступ';

export const registrationMetadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: '/university.png',
    }
};