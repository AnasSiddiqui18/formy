import { ResponseCard } from '@/components/response-card';
import { Form } from '@/db/schema';

export async function ListResponses({ data }: { data: Form[] }) {
    return (
        <>
            {data.map((form) => (
                <ResponseCard
                    key={form.id}
                    responseCardProps={{
                        data: form,
                        href: `/form_responses/${form.id}?page_index=0`,
                    }}
                />
            ))}
        </>
    );
}
