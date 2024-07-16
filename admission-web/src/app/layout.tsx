import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {mainMetadata} from "@/lib/metadata/main";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = mainMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
