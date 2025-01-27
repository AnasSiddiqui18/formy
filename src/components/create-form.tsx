'use client';

import { formCreateValidation } from '@/app/validation';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { LoaderCircle } from 'lucide-react';
import { createFormAction } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { toUpperCase } from '@/lib/utils';

export function CreateForm() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formCreateValidation>>({
        resolver: zodResolver(formCreateValidation),
        defaultValues: {
            formName: '',
        },
    });

    const router = useRouter();

    useEffect(() => {
        if (!open) {
            form.reset({ formName: '' });
        }
    }, [open, form]);

    function onSubmit({ formName }: z.infer<typeof formCreateValidation>) {
        startTransition(async () => {
            await createFormAction({ title: formName });
            setOpen(false);
            return router.refresh();
        });
    }

    const createFormText = 'create new form';

    return (
        <div className="flex justify-end py-5">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="!text-white focus-visible:ring-0"
                    >
                        {createFormText}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex gap-4">
                        <DialogTitle className="text-2xl font-bold">
                            {toUpperCase(createFormText)}
                        </DialogTitle>
                        <DialogDescription className="leading-loose">
                            {
                                "Start building your form 📋 from scratch. Customize it ✨ by adding fields 📝, text ✍️, images 🖼️, and more to suit your needs. Once you're done ✅, save it as a draft 🗂️ or publish it 🌟 for others to use. Let's get started 🚀!"
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex items-center space-x-2 my-2">
                                <div className="grid flex-1 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="formName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm">
                                                    Form Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Registration form..."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex mt-5 justify-end gap-3">
                                <DialogClose
                                    className="disabled:pointer-events-none
                  disabled:opacity-20"
                                    disabled={isPending}
                                    asChild
                                >
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    className="bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-20 disabled:pointer-events-none"
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
