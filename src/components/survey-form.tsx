'use client';

import { createFormResponse } from '@/actions/form-response';
import { createZodSchema } from '@/components/codebox/create-zod-schema';
import { generateDefaultValues } from '@/components/codebox/generate-default-values';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { actionWithToast } from '@/helpers/action-with-toast';
import { useFormId } from '@/hooks/use-form-id';
import { cn } from '@/lib/utils';
import { TCanvasData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';

export function SurveyForm({ data }: { data: TCanvasData[] }) {
    const [isPending, startTransition] = useTransition();
    const formId = useFormId();
    const schema = createZodSchema(data);
    const defaultFields = generateDefaultValues(data);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultFields,
    });

    async function onSubmit(values: Record<string, string>) {
        startTransition(async () => {
            const response = await actionWithToast(
                createFormResponse({ values, data, form_id: formId }),
            );

            if (!response.success) {
                return form.reset();
            }

            form.reset();
        });
    }

    return (
        <div className="flex justify-center py-4">
            <Form {...form}>
                <form
                    className="max-w-[400px] w-full border-2 py-7 px-5 flex flex-col rounded-xl"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-5 mt-4 mb-5">
                        {data.map((field) => {
                            switch (field.type) {
                                case 'heading':
                                    return (
                                        <div
                                            className="flex justify-center mb-4"
                                            key={field.id}
                                        >
                                            <h1 className="font-semibold text-2xl">
                                                {field.content}
                                            </h1>
                                        </div>
                                    );
                                case 'description':
                                    return (
                                        <p key={field.id}>{field.content}</p>
                                    );
                                case 'input':
                                    return (
                                        <FormField
                                            control={form.control}
                                            name={field.fieldName}
                                            key={field.id}
                                            render={({ field: inputField }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm">
                                                        <div className="flex gap-2 items-center">
                                                            {field.label}
                                                            <p className="text-xs text-gray-400">
                                                                {!field
                                                                    .validation
                                                                    .required
                                                                    ? ' (Optional)'
                                                                    : null}
                                                            </p>
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border border-gray-200 focus-visible:ring-0"
                                                            placeholder={
                                                                field.placeHolder
                                                            }
                                                            {...inputField}
                                                            onChange={(e) => {
                                                                inputField.onChange(
                                                                    e,
                                                                );
                                                            }}
                                                            type={
                                                                field.fieldName.toLowerCase() ===
                                                                'password'
                                                                    ? 'password'
                                                                    : 'text'
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    );

                                case 'button':
                                    return (
                                        <Button
                                            key={field.id}
                                            disabled={isPending}
                                            className={cn(
                                                'bg-blue-500 hover:bg-blue-600 text-white focus-visible:ring-0',
                                                {
                                                    roboto:
                                                        field.font === 'Roboto',
                                                },
                                            )}
                                            type="submit"
                                        >
                                            {field.content}
                                        </Button>
                                    );
                            }
                        })}
                    </div>
                </form>
            </Form>
        </div>
    );
}
