import { fetchResponse } from '@/actions/form-response';
import { FormResponseCard } from '@/components/form-response-card';

export default async function FormResponse({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: response_id } = await params;
    const response = await fetchResponse({ response_id });
    if (!response.success) return;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <FormResponseCard result={response.data[0]} />
        </div>
    );
}
