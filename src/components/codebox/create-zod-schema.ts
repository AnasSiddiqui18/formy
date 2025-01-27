import { TCanvasData } from '@/types';
import { z } from 'zod';

export function createZodSchema<T extends TCanvasData[]>(canvasData: T) {
    const schemaObject: Record<string, z.ZodSchema> = {};
    const initialSchema = z.string();
    canvasData.forEach((field) => {
        if (field.type === 'input' && !field.validation.required) {
            return (schemaObject[field.fieldName] = z.string().optional());
        }

        if (field.type === 'input' && field.validation.required) {
            schemaObject[field.fieldName] = initialSchema.min(
                1,
                `${field.fieldName} is required`,
            );
        }
    });

    return z.object(schemaObject);
}
