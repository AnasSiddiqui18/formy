import { ResponsesTable } from '@/components/table/responses-table';
import { fetchFormById } from '@/features/form';
import { fetchFormResponses } from '@/features/form-responses';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type SearchParams = { [key: string]: string };

export default async function ResponsePage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { id: formId } = await params;
    if (!formId) redirect('/dashboard');
    const { page_index } = await searchParams;
    const limit = 10;
    const offset = parseInt(page_index) * limit;

    const validateFormId = z.string().uuid(formId).safeParse(formId);
    if (!validateFormId.success) redirect('/dashboard');

    const form = await fetchFormById({ formId });

    if (!form.success) redirect('/dashboard');

    const responses = await fetchFormResponses({ formId, limit, offset });

    const columns: { fieldName: string }[] = [];

    form.data.schema.map((node) => {
        if (node.type === 'input') {
            return columns.push({ fieldName: node.fieldName });
        }
    });

    return (
        <div className="h-full px-section_padding flex flex-col gap-3 py-4">
            <ResponsesTable
                responseTableProps={{
                    columns,
                    data: responses,
                    rowCount: parseInt(form.data.responsesCount),
                }}
            />
        </div>
    );
}
