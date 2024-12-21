import { getForm } from '@/actions/form';
import { Canvas } from '@/components/canvas';
import { InfoPanel } from '@/components/info-panel';
import { NodeSiderbar } from '@/components/nodes-sidebar';
import { PreviewCard } from '@/components/preview-card';

import { redirect } from 'next/navigation';

export default async function PlaygroundPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: formId } = await params;
    const form = await getForm({ formId });

    if ('success' in form) return redirect('/sign-in');

    return (
        <div className="flex h-full overflow-hidden">
            <NodeSiderbar />
            <Canvas draftRes={form.schema} formId={formId} />
            <InfoPanel form={form} />
            <PreviewCard />
        </div>
    );
}
