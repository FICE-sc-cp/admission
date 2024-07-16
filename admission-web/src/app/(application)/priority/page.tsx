import type {Metadata} from "next";
import {prioritiesMetadata} from "@/lib/metadata/priorities";

export const metadata: Metadata = prioritiesMetadata;

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      Пріоритетка
    </main>
  );
}
