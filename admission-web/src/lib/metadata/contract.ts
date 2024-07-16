import {Metadata} from "next";

const title = 'Договір про навчання | ФІОТ 2024 | Подання заяв на вступ';
const description = 'Сторінка заповнення договору про навчання та надання повної особистої інформації абітурієнта';

export const contractMetadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    }
};