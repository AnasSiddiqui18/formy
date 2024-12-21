'use client';

import { cn, createZodSchema, generateDefaultValues } from '@/lib/utils';
import { TCanvasData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTransition } from 'react';

export function SurveyForm({ formRes }: { formRes: TCanvasData[] }) {
    const [isPending, startTransition] = useTransition();

    const schema = createZodSchema(formRes);
    const defaultFields = generateDefaultValues(formRes);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultFields,
    });

    async function onSubmit(values: z.infer<typeof schema>) {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('form submitted by user', values);
            form.reset();
        });
    }

    return (
        <div className="h-full flex-1 flex items-center justify-center">
            <Form {...form}>
                <form
                    className="max-w-[400px] w-full dark:border border-2 py-7 px-5 flex flex-col rounded-xl"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-5 mt-4 mb-5">
                        {formRes.map((field) => {
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
