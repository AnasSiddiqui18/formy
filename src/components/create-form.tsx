'use client';

import { formCreateValidation } from '@/app/validation';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { SetStateAction, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

export function CreateForm({
    onSubmit,
    open,
    setOpen,
    isPending,
}: {
    onSubmit: ({ formName }: z.infer<typeof formCreateValidation>) => void;
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    isPending: boolean;
}) {
    const form = useForm<z.infer<typeof formCreateValidation>>({
        resolver: zodResolver(formCreateValidation),
        defaultValues: {
            formName: '',
        },
    });

    useEffect(() => {
        if (!open) {
            form.reset({ formName: '' });
        }
    }, [open]);

    return (
        <div className="flex justify-end py-5">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="!text-white bg-violet-500 hover:bg-violet-600 focus-visible:ring-0"
                    >
                        Create new form
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex gap-4">
                        <DialogTitle className="text-2xl font-bold">
                            Create New Form
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
