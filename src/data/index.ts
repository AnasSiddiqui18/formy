import { TCanvasData, Tcomponents, TsupportedFonts } from '@/types';
import {
    FileText,
    Layers,
    MessagesSquare,
    MousePointerClick,
    Pencil,
    TrendingUpDown,
    Type,
} from 'lucide-react';

export const dashboardContent = [
    {
        content: 'My Forms',
        icon: Layers,
        href: '/dashboard',
    },

    {
        content: 'Responses',
        icon: MessagesSquare,
        href: '/dashboard/responses',
    },

    {
        content: 'Analytics',
        icon: TrendingUpDown,
        href: '/dashboard/analytics',
    },
];

export const contentComponents: Tcomponents[] = [
    {
        content: 'heading',
        type: 'heading',
        icon: Type,
    },

    {
        content: 'description',
        type: 'description',
        icon: FileText,
    },
];

export const formComponents: Tcomponents[] = [
    {
        content: 'input',
        type: 'input',
        icon: Pencil,
    },

    {
        content: 'button',
        type: 'button',
        icon: MousePointerClick,
    },
];

export const canvasData: TCanvasData[] = [];

export const supportedFonts: TsupportedFonts[] = [
    {
        value: 'Poppins',
        name: 'Poppins',
    },

    {
        value: 'Roboto',
        name: 'Roboto',
    },
];

export const signInData = [
    {
        label: 'Email Address',
        placeholder: 'johndoe@mail.ai',
        field_name: 'email' as const,
        type: 'email',
    },

    {
        label: 'Password',
        placeholder: '********',
        field_name: 'password' as const,
        type: 'password',
    },
];

export const signUpData = [
    {
        label: 'Full Name',
        placeholder: 'john doe',
        field_name: 'full_name' as const,
    },

    {
        label: 'Email Address',
        placeholder: 'johndoe@mail.ai',
        field_name: 'email' as const,
    },

    {
        label: 'Password',
        placeholder: '********',
        field_name: 'password' as const,
    },
];
