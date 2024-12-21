import { Input } from './ui/input';
import { Button } from './ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { ZodSchema, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TCanvasData } from '@/types';
import { useSnapshot } from 'valtio';
import { store } from '@/store';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export const RenderContent = ({
    data,
    schema,
    fields,
}: {
    data: TCanvasData[];
    schema: ZodSchema;
    fields: Record<string, string>;
}) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: fields,
    });

    const { isOpen } = useSnapshot(store);

    useEffect(() => {
        if (!isOpen) return;
        form.clearErrors();
    }, [isOpen, form]);

    function onSubmit(values: z.infer<typeof schema>) {
        console.log('form submitted successfully 🎉', values);
    }

    return (
        <Form {...form}>
            <form
                className="max-w-[400px] w-full py-2 px-5 rounded-xl bg-black text-white"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-5 mt-4 mb-5">
                    {data.map((field: TCanvasData) => {
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
                                return <p key={field.id}>{field.content}</p>;
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
                                                            {!field.validation
                                                                .required
                                                                ? ' (Optional)'
                                                                : null}
                                                        </p>
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="border border-gray-100/50"
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
                                        className={cn(
                                            'bg-blue-500 hover:bg-blue-600 text-white',
                                            {
                                                roboto: field.font === 'Roboto',
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
    );
};
