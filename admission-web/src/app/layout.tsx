import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `ФІОТ ${new Date().getFullYear()} | Подання заяв на вступ`,
  description:
    'Сайт, створений для спрощення життя абітурієнта. На цьому сайті вступника ФІОТ КПІ зможуть подавати документи на вступ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk' suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
