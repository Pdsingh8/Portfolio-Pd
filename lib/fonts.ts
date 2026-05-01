import { Cormorant_Garamond, Geist } from 'next/font/google';

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-geist',
  display: 'swap',
});
