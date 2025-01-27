'use server';

import { VerificationEmail } from '@/email/verification-email';
import { env } from '@/lib/env';
import { sendError, sendSuccess } from '@/lib/response';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';

export async function sendAccountVerificationEmail(
    email: string,
    link?: string,
) {
    const { renderToString } = await import('react-dom/server');
    const jwtToken = jwt.sign({ email }, env.JWT_SECRET, {
        expiresIn: '24h',
    });

    const verificationLink = link
        ? link.concat(`&token=${jwtToken}`)
        : `http://localhost:3000/verify-email?token=${jwtToken}`;

    const html = renderToString(VerificationEmail({ link: verificationLink }));

    const transporter = createTransport({
        service: 'Gmail',
        host: 'smtp.ethereal.email',
        port: 465,
        secure: false,
        auth: {
            user: env.SENDER_EMAIL,
            pass: env.APP_SECRET,
        },
    });

    const mailOptions = {
        from: env.SENDER_EMAIL,
        to: email,
        subject: 'Account Verification 👤',
        text: 'verify account',
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        return sendSuccess('email send successfully');
    } catch (error) {
        return sendError('error sending mail');
    }
}
