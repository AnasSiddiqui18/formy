'use client';

import { BackButton } from '@/components/back-button';
import { contentComponents, formComponents } from '@/data';
import React from 'react';
import { NodeBox } from './node-box';

export function NodeSiderbar() {
    return (
        <div className="bg-gray-200 px-section_padding py-6 text-black min-h-view pt-10 relative">
            <BackButton href="/dashboard" />
            <div className="mt-10 flex flex-col gap-6">
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
