const submitFunction = 'onSubmit={form.handleSubmit(onSubmit)}';

export function mergeCode({
    imports,
    formFields,
    doesInputExist,
    schemaCode,
}: {
    imports: string;
    formFields: string;
    doesInputExist: boolean;
    schemaCode: string;
}) {
    return `
"use client";
${imports}

${schemaCode}
export const MyForm = () => {
return (
        <Form ${doesInputExist ? '{...form}' : ''}>
            <form className="max-w-[400px] w-full py-2 px-5 rounded-xl bg-black text-white" ${doesInputExist ? submitFunction : ''}>
            ${
                !formFields.length
                    ? `<div className="mt-4 mb-5"></div>`
                    : `<div className="mt-4 mb-5">${formFields}
                       </div>`
            }
            </form>
        </Form>
    );
};
`;
}
