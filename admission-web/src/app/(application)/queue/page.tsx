import type {Metadata} from "next";
import {queueMetadata} from "@/lib/metadata/queue";

export const metadata: Metadata = queueMetadata;

export default function page() {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      Черга єбана
    </main>
  );
}
