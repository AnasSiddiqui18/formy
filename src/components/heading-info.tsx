'use client';

import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { useSnapshot } from 'valtio';
import { store } from '@/store';
import { toUpperCase } from '@/lib/utils';
import { supportedFonts } from '@/data';

export function HeadingInfo() {
    const { currentSelectedNode } = useSnapshot(store);
    const selectedNode = store.get(currentSelectedNode, 'heading');
    const [value, setValue] = useState(selectedNode?.content);
    const [selectedFont, setSelectedFont] = useState(selectedNode?.font);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!selectedNode) return;

        setValue(selectedNode.content);
        setSelectedFont(selectedNode.font);
    }, [selectedNode]);

    useEffect(() => {
        inputRef.current?.focus();

        if (!selectedNode) return;

        selectedNode.content = value as string;
    }, [selectedNode, value]);

    useEffect(() => {
        if (!selectedNode) return;

        if (selectedFont !== selectedNode.font) {
            selectedNode.font = selectedFont as string;
        }
    }, [selectedNode, selectedFont]);

    if (!selectedNode) return;

    return (
        <div className="bg-gray-200 h-auto w-full px-4 py-5 rounded-md flex flex-col justify-center mt-4">
            <h3 className="text-gray-400 mb-2">
                {toUpperCase(selectedNode.type as string)}
            </h3>
            <Input
                className="focus:outline-none mb-3 text-gray-500 border border-gray-300"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={inputRef}
            />
            <div className="flex flex-col gap-2">
                <Select
                    value={selectedFont}
                    onValueChange={(e) => setSelectedFont(e)}
                >
                    <SelectTrigger className="text-gray-500 border border-gray-300">
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {supportedFonts.map((font, index) => {
                                return (
                                    <SelectItem key={index} value={font.value}>
                                        {font.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
