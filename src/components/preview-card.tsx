'use client';

import { CodeBox } from '@/components/codebox/code-box';
import { createZodSchema } from '@/components/codebox/create-zod-schema';
import { generateDefaultValues } from '@/components/codebox/generate-default-values';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSnapshot } from '@/hooks/use-snapshot';
import { cn } from '@/lib/utils';
import { store } from '@/store';
import { RenderContent } from './render-content';

export function PreviewCard() {
    const { isPreviewCardOpen, canvasData } = useSnapshot(store);
    const zodSchema = createZodSchema(canvasData);
    const defaultValues = generateDefaultValues(canvasData);
    const isDefaultValuePresent = !!Object.values(defaultValues).length;

    return (
        <div>
            <div
                className={cn(
                    'fixed top-0 right-0 left-0 bottom-0 bg-black/30 hidden',
                    {
                        block: isPreviewCardOpen,
                    },
                )}
                onClick={() => (store.isPreviewCardOpen = false)}
            ></div>
            <div
                className={cn(
                    'h-[calc(100%-20px)] bg-slate-900 w-[800px] rounded-xl absolute top-2/4 -translate-y-2/4 left-10 z-20 transition-transform duration-500 ease-in-out translate-x-[-150%] pt-5 pb-10 overflow-hidden',
                    {
                        'translate-x-0': isPreviewCardOpen,
                    },
                )}
            >
                <div className="h-full flex flex-col">
                    <Tabs defaultValue="preview" className="w-full dark h-full">
                        <TabsList className="flex justify-center w-fit mx-auto">
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>

                        <TabsContent value="preview" className="flex-1">
                            <div className="flex items-center justify-center h-full p-4">
                                {(isDefaultValuePresent ||
                                    canvasData.find(
                                        (e) =>
                                            e.type === 'heading' ||
                                            e.type === 'description' ||
                                            e.type === 'button',
                                    )) && (
                                    <RenderContent
                                        data={canvasData}
                                        schema={zodSchema}
                                        fields={defaultValues}
                                    />
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="code" className="flex-1 p-4 h-full">
                            <CodeBox />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
