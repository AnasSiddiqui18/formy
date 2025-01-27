import { z } from 'zod';

export function convertZodSchemaToString(schema: z.ZodTypeAny) {
    let response = `z.string()`;

    if (schema instanceof z.ZodString) {
        schema._def.checks.map((check) => {
            if (check.kind === 'min') {
                return (response = response.concat(
                    `.min(${check.value}, "${check.message}")`,
                ));
            }
        });
    }

    return response;
}
