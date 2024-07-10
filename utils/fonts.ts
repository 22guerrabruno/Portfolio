import { Libre_Franklin } from 'next/font/google';
import { Gabarito } from 'next/font/google';

const libre_franklin_init = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libreFranklin',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const gabarito_init = Gabarito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gabarito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const gabarito = gabarito_init.variable;
export const libreFranklin = libre_franklin_init.variable;
