import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { gabarito, libreFranklin } from '@/utils/fonts';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bruno Guerra - Portfolio',
  description: 'Code by Bruno Guerra',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={(inter.className, gabarito, libreFranklin)}>{children}</body>
    </html>
  );
}
