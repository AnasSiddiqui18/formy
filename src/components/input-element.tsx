import { ExtractFormID, cn, toUpperCase } from '@/lib/utils';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { GripVertical, Trash } from 'lucide-react';
import { Separator } from './ui/separator';
import { store } from '@/store';
import { useSnapshot } from 'valtio';
import { deleteCanvasEl } from '@/actions/form';
import { TInput } from '@/types';
import { Input } from './ui/input';

export function InputElement({
    listeners,
    data,
}: {
    data: TInput;
    listeners: SyntheticListenerMap | undefined;
}) {
    const { currentSelectedNode } = useSnapshot(store);
    const formID = ExtractFormID();

    const selectedNode = store.get(currentSelectedNode, 'input');

    function updateNodeSelection(nodeId: string) {
        if (store.currentSelectedNode === nodeId) return;

        store.currentSelectedNode = null;

        setTimeout(() => {
            store.currentSelectedNode = nodeId;
        }, 0);
    }

    async function deleteEl() {
        const response = await deleteCanvasEl({
            formId: formID,
            nodeId: data.id,
        });

        if (!response?.success) {
            console.error('error while deleting the node', response);
            return;
        }

        if (store.currentSelectedNode === data.id) {
            store.currentSelectedNode = null;
            store.canvasData = store.canvasData.filter((e) => e.id !== data.id);
        }
    }

    return (
        <div
            className={cn(
                'flex items-center gap-2 bg-gray-200 py-3 rounded-lg px-2 h-auto cursor-pointer',
                {
                    'border-2 border-violet-500': selectedNode?.id === data.id,
                },
            )}
            onClick={() => updateNodeSelection(data.id)}
        >
            <div {...listeners} className="cursor-grab">
                <GripVertical className="text-gray-500/50 w-fit" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-600">
                        {toUpperCase(data.type)}
                    </h3>
                    <Trash
                        className="text-orange-500 hover:text-orange-600 cursor-pointer"
                        onClick={deleteEl}
                    />
                </div>
                <Separator className="w-full bg-gray-400" />

                <div className="flex flex-col gap-3">
                    <label className="text-gray-500">{data.label}</label>

                    <Input
                        className="focus-visible:ring-0 mb-3 text-gray-500 border border-gray-300"
                        placeholder={data.placeHolder}
                        value={data.content}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}
