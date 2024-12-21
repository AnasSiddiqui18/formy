'use client';

import { GripVertical, Trash } from 'lucide-react';
import { Separator } from './ui/separator';
import { store } from '@/store';
import { ExtractFormID, cn, toUpperCase } from '@/lib/utils';
import { deleteCanvasEl, isNodePresentInDB } from '@/actions/form';
import { useSnapshot } from 'valtio';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { TButton, TDescription, THeading } from '@/types';

export function TextElement({
    data,
    listeners,
}: {
    data: THeading | TDescription | TButton;
    listeners?: SyntheticListenerMap | undefined;
}) {
    const { currentSelectedNode, canvasData } = useSnapshot(store);
    const formID = ExtractFormID();

    const selectedNode = store.get(currentSelectedNode, 'heading');

    function updateNodeSelection(nodeID: string) {
        if (store.currentSelectedNode === nodeID) return;

        store.currentSelectedNode = null;

        setTimeout(() => {
            store.currentSelectedNode = nodeID;
        }, 0);
    }

    async function deleteEl() {
        const nodePresent = await isNodePresentInDB({
            formId: formID,
            nodeId: data.id,
        });

        if (nodePresent.success) {
            const response = await deleteCanvasEl({
                formId: formID,
                nodeId: data.id,
            });

            if (!response?.success) {
                console.error('error while deleting the node', response);
                return;
            }
        }

        if (selectedNode?.id === data.id) {
            store.currentSelectedNode = null;
            store.canvasData = store.canvasData.filter((e) => e.id !== data.id);
        }
    }

    return (
        <div
            className={cn(
                'flex items-center gap-2 bg-gray-200 py-3 rounded-lg px-2 h-[100px]',
                {
                    'border-2 border-violet-500': selectedNode?.id === data.id,
                },
            )}
            onClick={() => {
                updateNodeSelection(data.id);
            }}
        >
            <div {...listeners}>
                <GripVertical className="text-gray-500/50 w-fit" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-600">
                        {toUpperCase(data.type)}
                    </h3>
                    <Trash
                        className="text-orange-500 hover:text-orange-600"
                        onClick={deleteEl}
                    />
                </div>
                <Separator className="w-full bg-gray-400" />
                <h2
                    className={cn('text-black font-semibold text-xl', {
                        roboto:
                            canvasData.find((e) => e?.id === data.id)?.font ===
                            'Roboto',
                    })}
                >
                    {toUpperCase(data.content)}
                </h2>
            </div>
        </div>
    );
}
