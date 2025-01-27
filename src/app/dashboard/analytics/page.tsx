import { RenderSkeleton } from '@/components/render-skeleton';
import { ResponseCard } from '@/components/response-card';
import { db } from '@/db';
import { forms } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

export default function Page() {
    return (
        <div className="px-section_padding py-5">
            <div className="mb-10 w-full">
                <div className="font-bold text-black text-2xl">
                    <h2>Analytics Page</h2>
                </div>
            </div>

            <Suspense fallback={<RenderSkeleton />}>
                <PublishedForms />
            </Suspense>
        </div>
    );
}

async function PublishedForms() {
    const published_forms = await db.query.forms.findMany({
        where: eq(forms.status, 'PUBLISHED'),
    });

    return published_forms.map((form) => {
        return (
            <ResponseCard
                key={form.id}
                responseCardProps={{
                    href: `/form_analytics/${form.id}`,
                    data: form,
                }}
            />
        );
    });
}
