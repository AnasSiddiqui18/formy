'use client';

import { toUpperCase } from '@/lib/utils';
import { useSnapshot } from 'valtio';
import { store } from '@/store';
import { useEffect, useRef, useState } from 'react';
import { FormField } from './form-field';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

type ContentState = {
    content: string;
    label: string;
    placeholder: string;
    isChecked: boolean;
    fieldName: string;
};

export function InputInfo() {
    const { currentSelectedNode } = useSnapshot(store);
    const selectedNode = store.get(currentSelectedNode, 'input');
    const [content, setContent] = useState<ContentState>({
        content: selectedNode?.content || '',
        label: selectedNode?.label || '',
        placeholder: selectedNode?.placeHolder || '',
        isChecked: selectedNode?.validation?.required || false,
        fieldName: selectedNode?.fieldName || '',
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!selectedNode) return;
        selectedNode.content = content.content as string;
        selectedNode.label = content.label as string;
        selectedNode.placeHolder = content.placeholder as string;
        selectedNode.validation.required = content.isChecked as boolean;
        selectedNode.fieldName = content.fieldName as string;
    }, [content, selectedNode]);

    useEffect(() => {
        if (!selectedNode || !selectedNode.validation) return;
        inputRef.current?.focus();

        setContent({
            content: selectedNode.content,
            fieldName: selectedNode.fieldName,
            placeholder: selectedNode.placeHolder,
            isChecked: selectedNode.validation.required,
            label: selectedNode.label,
        });
    }, [selectedNode]);

    const inputFields = [
        {
            label: 'Field name',
            value: content.fieldName,
            placeholder: 'name',
            onChange: (value: string) =>
                setContent((prev) => ({ ...prev, fieldName: value })),
        },
        {
            label: 'Label field',
            value: content.label,
            placeholder: 'Label here',
            onChange: (value: string) =>
                setContent((prev) => ({ ...prev, label: value })),
        },
        {
            label: 'Input field',
            value: content.content,
            placeholder: 'Content here',
            onChange: (value: string) =>
                setContent((prev) => ({ ...prev, content: value })),
        },
        {
            label: 'Placeholder field',
            value: content.placeholder,
            placeholder: 'Placeholder here',
            onChange: (value: string) =>
                setContent((prev) => ({ ...prev, placeholder: value })),
        },
    ];

    return (
        <div className="bg-gray-200 h-auto w-full px-4 py-5 rounded-md flex flex-col justify-center mt-4">
            <h3 className="text-gray-400 mb-2">
                {toUpperCase(selectedNode?.type as string)}
            </h3>

            {inputFields.map((field, index) => (
                <FormField
                    key={index}
                    label={field.label}
                    fn={field.onChange}
                    value={field.value || ''}
                    placeholder={field.placeholder}
                />
            ))}

            <div className="flex justify-between mt-4">
                <Label className="text-gray-500">Required</Label>
                <Switch
                    className="checked:!bg-blue-500"
                    checked={content.isChecked}
                    onCheckedChange={(e) =>
                        setContent((prev) => ({ ...prev, isChecked: e }))
                    }
                />
            </div>
        </div>
    );
}
