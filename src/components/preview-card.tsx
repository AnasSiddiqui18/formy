'use client';

import { cn, createZodSchema, generateDefaultValues } from '@/lib/utils';
import { store } from '@/store';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { RenderContent } from './render-content';

export function PreviewCard() {
    const { isOpen, canvasData } = useSnapshot(store);

    useEffect(() => {
        if (!isOpen) return;

        function updateStore() {
            store.isOpen = false;
            document.body.removeChild(grayDiv);
        }

        const grayDiv = document.createElement('div');
        grayDiv.style.backgroundColor = 'black';
        grayDiv.style.opacity = '0.3';
        grayDiv.style.border = '1px solid black';
        grayDiv.style.position = 'fixed';
        grayDiv.style.top = '0';
        grayDiv.style.left = '0';
        grayDiv.style.height = '100%';
        grayDiv.style.width = '100%';
        grayDiv.style.zIndex = '10';
        document.body.appendChild(grayDiv);
        grayDiv.addEventListener('click', updateStore);

        return () => {
            grayDiv.removeEventListener('click', updateStore);
        };
    }, [isOpen]);

    const zodSchema = createZodSchema(canvasData);
    const defaultValues = generateDefaultValues(canvasData);
    const isResultPresent = Object.keys(defaultValues).length > 0;

    return (
        <div
            className={cn(
                'h-[calc(100%-50px)] bg-slate-900 w-[800px] rounded-xl absolute top-2/4 -translate-y-2/4 left-10 z-20 transition-transform duration-500 ease-in-out',
                {
                    'translate-x-0': isOpen,
                    'translate-x-[-150%]': !isOpen,
                },
            )}
        >
            <div className="flex items-center justify-center h-full">
                {isResultPresent && (
                    <RenderContent
                        data={[...canvasData]}
                        schema={zodSchema}
                        fields={defaultValues}
                    />
                )}
            </div>
        </div>
    );
}
