import { Poppins, Roboto } from 'next/font/google';

export const poppinsFont = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['400', '500', '600', '700', '800'],
});

export const robotoFont = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['400', '500', '700'],
});
