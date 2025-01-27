'use client';

import { sendAccountVerificationEmail } from '@/email/email';
import { sendError, sendSuccess } from '@/lib/response';
import { clsx, type ClassValue } from 'clsx';
import { NonUndefined } from 'react-hook-form';
import { toast, TToast as ToastProps } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(str: string) {
    if (!str.length) return;

    return str
        .split(' ')
        .splice(0, 2)
        .map((e) => e[0].toUpperCase())
        .join('');
}

export function toUpperCase(str: string) {
    if (!str || !str.trim().length) return;

    return str
        .trim()
        .split(' ')
        .map((e) => `${e[0]?.toUpperCase() + e.slice(1)}`)
        .join(' ');
}

export function showToast({
    variant,
    message,
    props,
}: {
    variant: NonUndefined<ToastProps['type']>;
    message: string;
    props?: ToastProps;
}) {
    const toast_id = toast[variant](message, {
        ...props,
        duration: 1500,
        cancel: {
            label: 'X',
            onClick: () => toast.dismiss(toast_id),
        },
    });

    if (variant === 'loading') return toast_id;

    return null;
}

export async function handleUserAccountVerificationByEmail({
    queryParams,
    data,
}: {
    queryParams: {
        [key: string]: string | undefined;
    };
    data: string;
}) {
    const link = queryParams.redirect
        ? `http://localhost:${window.location.port}/verify-email?redirect=${queryParams.redirect}`
        : undefined;

    const email = await sendAccountVerificationEmail(data, link);
    if (!email.success) return sendError('Error sending email');
    return sendSuccess('Please check your mail');
}
