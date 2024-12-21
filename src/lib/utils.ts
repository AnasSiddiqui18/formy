'use client';

import { TCanvasData } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

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
    if (!str.trim().length) return;

    return str
        .trim()
        .split(' ')
        .map((e) => `${e[0]?.toUpperCase() + e.slice(1)}`)
        .join(' ');
}

export function ExtractFormID() {
    const response = usePathname();
    const formID = response.split('/')[2];
    return formID;
}

export function createZodSchema(canvasData: Readonly<TCanvasData[]>) {
    const validatedSchema = canvasData.reduce(
        (schema, field) => {
            if (field.type === 'input' && field.validation.required) {
                schema[field.fieldName] = z
                    .string()
                    .min(1, `${field.fieldName} is required`);
            }

            return schema;
        },
        {} as Record<string, z.ZodString>,
    );

    return z.object(validatedSchema);
}

export function generateDefaultValues(canvasData: Readonly<TCanvasData[]>) {
    const object: Record<string, string> = {};

    canvasData.map((e) => {
        if (e.type === 'input') {
            object[e.fieldName] = '';
        }
    });

    return object;
}
