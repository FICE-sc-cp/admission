import type {Metadata} from "next";
import {contractMetadata} from "@/lib/metadata/contract";

export const metadata: Metadata = contractMetadata;

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      Контракт
    </main>
  );
}
