'use client';

import { Form } from '@/db/schema';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CreateForm } from './create-form';
import { useState, useTransition } from 'react';
import { formCreateValidation } from '@/app/validation';
import {
    createFormAction,
    deleteFormAction,
    getFormsAction,
} from '@/actions/form';
import { z } from 'zod';
import { toUpperCase } from '@/lib/utils';
import { Badge } from './ui/badge';
import { LoaderCircle, Pencil, Share, Trash } from 'lucide-react';
import { actionWithToast } from '@/helpers/action-with-toast';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function ListForms({ formList }: { formList: Form[] }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [forms, setForms] = useState<Form[]>(formList);
    const router = useRouter();

    function onSubmit({ formName }: z.infer<typeof formCreateValidation>) {
        startTransition(async () => {
            await createFormAction({ title: formName });
            setOpen(false);
            const formResponse = await getFormsAction();
            if (formResponse.success === false) return console.error(forms);
            const { data } = formResponse;
            setForms(data!);
        });
    }

    async function handleFormDeletion(formId: string) {
        startTransition(async () => {
            const response = await actionWithToast(
                deleteFormAction({ formId }),
            );

            if (response.success)
                setForms((prevForms) =>
                    prevForms.filter((form) => form.id !== formId),
                );
        });
    }

    function navigateToPlayground(formId: string) {
        startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            return router.replace(`/playground/${formId}`);
        });
    }

    return (
        <div className="px-12 w-full">
            <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-black text-2xl">
                    <h2>Dashboard</h2>
                </div>

                <CreateForm
                    onSubmit={onSubmit}
                    isPending={isPending}
                    open={open}
                    setOpen={setOpen}
                />
            </div>

            <div className="flex gap-5 flex-wrap">
                {forms.map((e) => {
                    return (
                        <Card
                            className="w-[320px] h-[220px] shadow-md rounded-lg bg-white border border-gray-200  duration-200"
                            key={e.id}
                        >
                            <div className="flex justify-between p-4 items-center border-b border-gray-200">
                                <Badge variant={e.status}>{e.status}</Badge>
                                <Button
                                    disabled={isPending}
                                    variant="secondary"
                                    onClick={() => handleFormDeletion(e.id)}
                                    title="Delete Form"
                                >
                                    <Trash
                                        className="text-red-500 hover:text-red-600 cursor-pointer"
                                        size={20}
                                    />
                                </Button>
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
                                    {toUpperCase(e.title)}
                                </CardTitle>
                                <Separator
                                    orientation="horizontal"
                                    className="my-2 border-gray-300"
                                />
                            </CardHeader>
                            <CardFooter className="flex justify-between items-center p-4">
                                <Button
                                    variant="secondary"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400"
                                    disabled={
                                        e.status === 'DRAFT' ||
                                        e.status === 'INACTIVE'
                                    }
                                >
                                    <Share size={16} />
                                    <span>Share</span>
                                </Button>

                                <Button
                                    variant="secondary"
                                    className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg"
                                    onClick={() => navigateToPlayground(e.id)}
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <LoaderCircle className="animate-spin-slow" />
                                    ) : (
                                        <>
                                            <Pencil size={16} />
                                            <span>Edit</span>
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
