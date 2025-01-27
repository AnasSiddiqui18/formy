'use client';

import { useSnapshot } from '@/hooks/use-snapshot';
import { cn, toUpperCase } from '@/lib/utils';
import { store } from '@/store';
import { TButton, TDescription, THeading } from '@/types';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical, Trash } from 'lucide-react';
import { Separator } from './ui/separator';

export function TextElement({
    data,
    listeners,
}: {
    data: THeading | TDescription | TButton;
    listeners?: SyntheticListenerMap | undefined;
}) {
    const { currentSelectedNode, canvasData } = useSnapshot(store);
    const selectedNode = store.get(currentSelectedNode, 'heading');

    function updateNodeSelection(nodeId: string) {
        if (store.currentSelectedNode === nodeId) return;

        store.currentSelectedNode = null;

        setTimeout(() => {
            store.currentSelectedNode = nodeId;
        }, 0);
    }

    async function deleteEl() {
        if (store.currentSelectedNode === data.id) {
            store.currentSelectedNode = null;
        }

        store.canvasData = store.canvasData.filter((e) => e.id !== data.id);
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
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteEl();
                        }}
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
