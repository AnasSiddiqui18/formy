'use client';

import { ArrowDownToLine, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { HeadingInfo } from './heading-info';
import { useSnapshot } from 'valtio';
import { store } from '@/store';
import { useState, useTransition } from 'react';
import { saveCanvasToDB, toggleFormStatus } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { InputInfo } from './input-info';
import { actionWithToast } from '@/helpers/action-with-toast';
import { StatusDropdown } from './status-dropdown';
import { Form } from '@/db/schema';
import { TStatus } from '@/types';

export function InfoPanel({ form }: { form: Form }) {
    const { currentSelectedNode, canvasData } = useSnapshot(store);
    const selectedNode = canvasData?.find((e) => e.id === currentSelectedNode);
    const [isDraft, setIsDraft] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const router = useRouter();

    async function toggleStatus(status: TStatus) {
        startTransition(async () => {
            setOpen(true);

            const response = await actionWithToast(
                toggleFormStatus({
                    formId: form.id,
                    status: status,
                }),
            );

            setOpen(false);

            if (!response.success) {
                console.log(response);
                return;
            }

            if (status === 'PUBLISHED')
                return router.replace(`/publish/${form.id}`);

            return router.refresh();
        });
    }

    async function save() {
        const response = await actionWithToast(
            saveCanvasToDB({
                canvasData: store.canvasData,
                formId: form.id,
            }),
        );

        if (!response.success) return;

        if (!isDraft) {
            console.log('draft condition runs');

            await toggleStatus('DRAFT');
            return setIsDraft(true);
        }

        router.refresh();
    }

    return (
        <div className="min-h-view py-6 w-[350px] bg-gray-300 border-l border-gray-400">
            <div className="flex gap-2 items-center justify-center pb-3 relative px-5">
                <div className="absolute bottom-0 right-0 left-0 border-b border-gray-400"></div>
                <Button
                    className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                    onClick={() => (store.isOpen = true)}
                    disabled={!canvasData.length || isPending}
                    title="Preview form"
                >
                    <Eye />
                </Button>

                <Button
                    className="bg-violet-600 text-white hover:bg-violet-700"
                    onClick={save}
                    disabled={!canvasData.length || isPending}
                    title="Save form"
                >
                    <ArrowDownToLine />
                </Button>

                {form.status === 'INACTIVE' || form.status === 'DRAFT' ? (
                    <Button
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => toggleStatus('PUBLISHED')}
                        disabled={!canvasData.length || isPending}
                    >
                        Publish
                    </Button>
                ) : (
                    <StatusDropdown
                        toggleStatus={toggleStatus}
                        isPending={isPending}
                        open={open}
                        setOpen={setOpen}
                    />
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
