import { convertZodSchemaToString } from '@/components/codebox/convert-schema-to-string';
import { createZodSchema } from '@/components/codebox/create-zod-schema';
import { generateDefaultValues } from '@/components/codebox/generate-default-values';
import { TCanvasData } from '@/types';

export function generateSchemaCode(canvasData: TCanvasData[]) {
    const isInputPresent = canvasData.find((node) => node.type === 'input');

    if (!isInputPresent) return '';

    const _defValues = generateDefaultValues(canvasData);
    const zodSchema = createZodSchema(canvasData);
    const schemaCode = Object.entries(zodSchema.shape)
        .map(([key, value]) => `${key}: ${convertZodSchemaToString(value)}`)
        .join(', \n');

    return `const schema = z.object({${schemaCode}
});
const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: ${JSON.stringify(_defValues)},
});

function onSubmit(values: z.infer<typeof schema>) {
    console.log("form submitted successfully");
}
`;
}
