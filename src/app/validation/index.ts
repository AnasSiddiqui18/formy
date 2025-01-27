import { z } from 'zod';

const email = z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(128, 'Email cannot exceed 127 characters.');

const password = z
    .string()
    .min(6, { message: 'Password must be at least of 6 characters.' })
    .max(128, 'Password cannot exceed 128 characters.');

export const signUpValidation = z.object({
    full_name: z
        .string()
        .min(1, 'fullName is required')
        .max(30, 'FullName cannot exceed 30 characters'),

    email,
    password,
});

export const signInValidation = z.object({
    email,
    password,
});

export const formCreateValidation = z.object({
    formName: z
        .string()
        .min(3, 'formName must be at least of 3 characters')
        .max(60, 'formName cannot exceed 60 characters'),
});

export const headingSchema = z.object({
    id: z.string(),
    type: z.literal('heading'),
    content: z.string(),
    font: z.string(),
});

export const descriptionSchema = z.object({
    id: z.string(),
    type: z.literal('description'),
    content: z.string(),
    font: z.string(),
});

export const inputSchema = z.object({
    id: z.string(),
    type: z.literal('input'),
    content: z.string(),
    font: z.string(),
    label: z.string(),
});

export const buttonSchema = z.object({
    id: z.string(),
    type: z.literal('button'),
    content: z.string(),
    font: z.string(),
});
