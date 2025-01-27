import { TCanvasData } from '@/types';
import { generateFormFieldsCode } from './generate-form-fields-code';
import { generateImportsCode } from './generate-imports-code';
import { generateSchemaCode } from './generate-schema-code';
import { mergeCode } from './merge-codes';

export function generateCodeFromCanvasData(canvasData: TCanvasData[]) {
    const doesInputExist = canvasData.some((el) => el.type === 'input');
    const imports = generateImportsCode(canvasData);
    const schemaCode = generateSchemaCode(canvasData);
    const formFields = generateFormFieldsCode(canvasData);

    return mergeCode({
        doesInputExist,
        imports,
        schemaCode,
        formFields,
    });
}
