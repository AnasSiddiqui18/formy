import { LucideIcon } from 'lucide-react';

export type THeading = {
    id: string;
    content: string;
    font: string;
    type: 'heading';
};

export type TDescription = {
    id: string;
    content: string;
    font: string;
    type: 'description';
};

export type TInput = {
    id: string;
    content: string;
    font: string;
    type: 'input';
    label: string;
    placeHolder: string;
    fieldName: string;
    validation: {
        required: boolean;
    };
};

export type TButton = {
    id: string;
    content: string;
    font: string;
    type: 'button';
};

export type TCanvasData = THeading | TDescription | TInput | TButton;

export type supportedFontsT = { value: string; name: string };

export type componentsT = {
    content: string;
    icon: LucideIcon;
    type: TCanvasData['type'];
};

export type TStatus = 'INACTIVE' | 'PUBLISHED' | 'DRAFT';
