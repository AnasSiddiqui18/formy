import { TCanvasData } from '@/types';

export function generateDefaultValues(canvasData: TCanvasData[]) {
    const object: Record<string, string> = {};

    canvasData.map((e) => {
        if (e.type === 'input') {
            object[`${e.fieldName}`] = '';
        }
    });

    return object;
}
