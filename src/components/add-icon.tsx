'use client';

import { toUpperCase } from '@/lib/utils';
import { store } from '@/store';
import { TCanvasData } from '@/types';
import { createId } from '@paralleldrive/cuid2';
import { CirclePlus } from 'lucide-react';

export function AddIcon({ nodeType }: { nodeType: TCanvasData['type'] }) {
    function addNodeToCanvas() {
        const nodeID = createId();

        const nodeConfig: Record<TCanvasData['type'], TCanvasData> = {
            heading: {
                content: 'Heading Element',
                font: 'Poppins',
                id: nodeID,
                type: 'heading',
            },

            description: {
                content: 'Description Element',
                font: 'Poppins',
                id: nodeID,
                type: 'description',
            },

            input: {
                fieldName: 'name',
                content: 'john doe',
                font: 'Poppins',
                id: nodeID,
                label: 'Enter your name',
                type: 'input',
                placeHolder: 'placeholder here..',
                validation: {
                    required: false,
                },
            },

            button: {
                content: 'Submit',
                font: 'Poppins',
                id: nodeID,
                type: 'button',
            },
        };

        return store.canvasData.push(nodeConfig[nodeType]);
    }

    return (
        <button
            className="bg-violet-600 absolute top-2 right-2 p-1 text-white rounded-full hover:bg-violet-700 transition-all"
            onClick={addNodeToCanvas}
            title={toUpperCase('add ' + nodeType)}
        >
            <CirclePlus size={18} />
        </button>
    );
}
