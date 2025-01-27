import { getFormsAction } from '@/actions/form';
import { CreateForm } from '@/components/create-form';
import { ListForms } from '@/components/list-forms';
import { RenderSkeleton } from '@/components/render-skeleton';
import { Suspense } from 'react';

export default async function Dashboard() {
    return (
        <div className="px-section_padding w-full">
            <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-black text-2xl">
                    <h2>Forms</h2>
                </div>
                <CreateForm />
            </div>

            <Suspense fallback={<RenderSkeleton />}>
                <FormsWraper />
            </Suspense>
        </div>
    );
}

async function FormsWraper() {
    const forms = await getFormsAction();

    if (forms.success === false) return;
    return <ListForms formList={forms.data} />;
}
