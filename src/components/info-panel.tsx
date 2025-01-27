'use client';

import { saveCanvasToDB, updateFormStatus } from '@/actions/form';
import { Form } from '@/db/schema';
import { actionWithToast } from '@/helpers/action-with-toast';
import { useSnapshot } from '@/hooks/use-snapshot';
import { showToast } from '@/lib/utils';
import { store } from '@/store';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { DeactivateDialog } from './deactivate-dialog';
import { HeadingInfo } from './heading-info';
import { InputInfo } from './input-info';
import { Button } from './ui/button';

export function InfoPanel({ form }: { form: Form }) {
    const { currentSelectedNode, canvasData } = useSnapshot(store);
    const selectedNode = canvasData?.find((e) => e.id === currentSelectedNode);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    async function updateStatus() {
        startTransition(async () => {
            const response = await actionWithToast(
                updateFormStatus({
                    formId: form.id,
                    status: 'PUBLISHED',
                }),
            );

            if (!response.success) return;
            return router.replace(`/publish/${form.id}`);
        });
    }

    async function save() {
        const response = await saveCanvasToDB({
            canvasData: store.canvasData,
            formId: form.id,
        });

        if (!response.success) return;
        const { data } = response;
        store.canvasData = data;
        store.currentSelectedNode = data[0].id;
        router.refresh();
        return showToast({ variant: 'success', message: 'Canvas saved!' });
    }

    return (
        <div className="min-h-view py-6 w-[350px] bg-gray-300 border-l border-gray-400">
            <div className="flex gap-2 items-center justify-center pb-3 relative px-5">
                <div className="absolute bottom-0 right-0 left-0 border-b border-gray-400"></div>
                <Button
                    className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                    disabled={!canvasData.length}
                    onClick={() => (store.isPreviewCardOpen = true)}
                    title="Preview form"
                >
                    Preview
                </Button>

                <Button
                    variant={'default'}
                    className="text-white"
                    onClick={save}
                    title="Save form"
                    disabled={!canvasData.length}
                >
                    Save
                </Button>

                {form.status === 'DRAFT' ? (
                    <Button
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={updateStatus}
                        disabled={!canvasData.length || isPending}
                    >
                        Publish
                    </Button>
                ) : (
                    <DeactivateDialog />
                )}
            </div>

            <div className="px-5">
                {(selectedNode?.type === 'heading' ||
                    selectedNode?.type === 'description' ||
                    selectedNode?.type === 'button') && <HeadingInfo />}
                {selectedNode?.type === 'input' && <InputInfo />}
            </div>
        </div>
    );
}
