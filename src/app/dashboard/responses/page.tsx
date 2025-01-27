import { ListResponses } from '@/components/list-responses';
import { RenderSkeleton } from '@/components/render-skeleton';
import { db } from '@/db';
import { forms } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

export default async function ResponsesPage() {
    return (
        <div className="px-section_padding py-5">
            <div className="mb-10 w-full">
                <div className="font-bold text-black text-2xl">
                    <h2>Published Forms</h2>
                </div>
            </div>

            <Suspense fallback={<RenderSkeleton />}>
                <PublishedForms />
            </Suspense>
        </div>
    );
}

async function PublishedForms() {
    const response = await db.query.forms.findMany({
        where: eq(forms.status, 'PUBLISHED'),
    });

    return <ListResponses data={response} />;
}
