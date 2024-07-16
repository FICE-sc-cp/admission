import {Metadata} from "next";

const title = 'ФІОТ 2024 | Подання заяв на вступ';
const description = 'Сайт, створений для спрощення життя абітурієнта. На цьому сайті вступника ФІОТ КПІ зможуть подавати документи на вступ';

export const mainMetadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        images: '/university.png',
    }
};