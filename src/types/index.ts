import { store } from '@/store';
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

export type TsupportedFonts = { value: string; name: string };

export type Tcomponents = {
    content: string;
    icon: LucideIcon;
    type: TCanvasData['type'];
};

export type TStatus = 'PUBLISHED' | 'DRAFT';

export type TStore = typeof store;

export type Product = {
    name: string;
    supplier: string;
    sku: string;
    category:
        | 'Electronics'
        | 'Furniture'
        | 'Clothing'
        | 'Books'
        | 'Toys'
        | 'Beauty'
        | 'Sports'
        | 'Home Decor'
        | 'Home Appliances'
        | 'Others';
    status: 'Published' | 'Inactive' | 'Draft';
    quantityInStock: number;
    price: number;
};
