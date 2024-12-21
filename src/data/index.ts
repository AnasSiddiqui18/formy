import { TCanvasData, componentsT, supportedFontsT } from '@/types';
import {
    Type,
    FileText,
    Pencil,
    MousePointerClick,
    Layers,
    MessagesSquare,
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
];

export const contentComponents: componentsT[] = [
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

export const formComponents: componentsT[] = [
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

export const supportedFonts: supportedFontsT[] = [
    {
        value: 'Poppins',
        name: 'Poppins',
    },

    {
        value: 'Roboto',
        name: 'Roboto',
    },
];
