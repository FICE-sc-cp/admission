import {Metadata} from "next";

const title = 'Черга вступників | ФІОТ 2024 | Подання заяв на вступ';
const description = 'Сторінка перегляду черги абітурієнтів. Тут ти зможеш доєднатись до черги на підписання документів на вступ';

export const queueMetadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    }
};