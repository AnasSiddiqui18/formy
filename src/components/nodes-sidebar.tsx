'use client';

import { contentComponents, formComponents } from '@/data';
import { SearchBar } from './search-bar';
import { NodeBox } from './node-box';
import React, { useTransition } from 'react';
import { LoaderCircle, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function NodeSiderbar() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function navigateToDashboard() {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return router.replace('/dashboard');
        });
    }

    return (
        <div className="bg-gray-200 px-12 py-6 text-black min-h-view pt-10 relative">
            <Button
                className="flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white px-3 absolute top-2 left-1 rounded-full ml-2 size-10 cursor-pointer"
                onClick={navigateToDashboard}
                title="Back to Home"
                disabled={isPending}
            >
                {isPending ? (
                    <LoaderCircle className="animate-spin-slow" />
                ) : (
                    <Undo2 />
                )}
            </Button>

            <div className="mt-10 flex flex-col gap-6">
                <SearchBar />
                <div className="flex flex-col gap-y-3">
                    <h2 className="text-sm text-gray-400 font-semibold">
                        Content Components
                    </h2>

                    <div className="flex gap-5">
                        {contentComponents.map((component, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <NodeBox data={component} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-y-3 mt-3">
                    <h2 className="text-sm text-gray-400 font-semibold">
                        Form Components
                    </h2>

                    <div className="flex gap-5">
                        {formComponents.map((e, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <NodeBox data={e} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
