'use client';

import { cn, createZodSchema, generateDefaultValues } from '@/lib/utils';
import { store } from '@/store';
import { useSnapshot } from 'valtio';
import { RenderContent } from './render-content';

export function PreviewCard() {
    const { isOpen, canvasData } = useSnapshot(store);

    const zodSchema = createZodSchema(canvasData);
    const defaultValues = generateDefaultValues(canvasData);
    const isResultPresent = Object.keys(defaultValues).length > 0;

    return (
        <div>
            {isOpen && (
                <div
                    onClick={() => (store.isOpen = false)}
                    className="fixed top-0 left-0 w-full h-full bg-black/30 z-10"
                ></div>
            )}
            <div
                className={cn(
                    'h-[calc(100%-50px)] bg-slate-900 w-[800px] rounded-xl fixed top-2/4 -translate-y-2/4 left-10 z-20 transition-transform duration-500 ease-in-out',
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
        </div>
    );
}
