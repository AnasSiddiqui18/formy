'use client';

import { deleteFormAction } from '@/actions/form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Form } from '@/db/schema';
import { actionWithToast } from '@/helpers/action-with-toast';
import { toUpperCase } from '@/lib/utils';

import { Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

export function ListForms({ formList }: { formList: Form[] }) {
    const [isPending, startTransition] = useTransition();
    const [forms, setForms] = useState<Form[]>(formList);

    useEffect(() => {
        setForms(formList);
    }, [formList]);

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

    return (
        <div className="flex gap-5 flex-wrap">
            {forms.map((form) => {
                return (
                    <Card
                        className="w-[320px] h-[220px] shadow-md rounded-lg bg-white border border-gray-200  duration-200"
                        key={form.id}
                    >
                        <div
                            className={'flex justify-between p-4 items-center'}
                        >
                            <>
                                <Badge variant={form.status}>
                                    {form.status}
                                </Badge>
                                <Button
                                    variant="secondary"
                                    title="Delete Form"
                                    onClick={() => handleFormDeletion(form.id)}
                                    disabled={isPending}
                                >
                                    <Trash
                                        className="text-red-500 hover:text-red-600 cursor-pointer"
                                        size={20}
                                    />
                                </Button>
                            </>
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="text-xl font-semibold text-gray-800 mb-1">
                                {toUpperCase(form.title)}
                            </CardTitle>
                            <Separator
                                orientation="horizontal"
                                className="my-2 border-gray-300"
                            />
                        </CardHeader>
                        <CardFooter className="flex justify-end items-center p-4">
                            <Button
                                className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
                                asChild
                                disabled={isPending}
                            >
                                <Link href={`/playground/${form.id}`}>
                                    <span>Edit </span>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
