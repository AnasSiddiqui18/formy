'use client';

import { signUpAction } from '@/actions/auth';
import { signUpValidation } from '@/app/validation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpData } from '@/data';
import { useQueryParams } from '@/hooks/use-query-params';
import { handleUserAccountVerificationByEmail, showToast } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUp() {
    const [isPending, startTransition] = useTransition();
    const [serverSideError, setServerSideError] = useState('');
    const { queryParams } = useQueryParams();

    const form = useForm<z.infer<typeof signUpValidation>>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            email: '',
            full_name: '',
            password: '',
        },
    });

    function onSubmit(data: typeof signUpValidation._input) {
        startTransition(async () => {
            const response = await signUpAction(data);

            if (!response.success) {
                setServerSideError(response.message as string);
                return;
            }

            const result = await handleUserAccountVerificationByEmail({
                queryParams,
                data: response.data,
            });

            if (!result.success) {
                showToast({ variant: 'error', message: result.message });
                return;
            }

            showToast({ variant: 'error', message: result.data });
            return form.reset();
        });
    }

    return (
        <div className="flex items-center justify-center h-view">
            <div className="h-full flex-1 auth-img relative">
                <div className="h-full bg-black absolute top-0 right-0 left-0 bottom-0 opacity-30"></div>
            </div>

            <div className="h-full flex-1 flex items-center justify-center">
                <Form {...form}>
                    <form
                        className="max-w-[400px] w-full dark:border border-2 py-7 px-5 flex flex-col rounded-xl"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex justify-center">
                            <h1 className="font-semibold text-2xl">Sign Up</h1>
                        </div>

                        <div className="flex flex-col gap-3 mt-10 mb-5">
                            {signUpData.map((data) => (
                                <FormField
                                    key={data.field_name}
                                    control={form.control}
                                    name={data.field_name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{data.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        data.placeholder
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>

                        {serverSideError && (
                            <div className="mb-3 flex justify-center">
                                <p className="text-base text-red-500 ">
                                    {serverSideError.concat('!')}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className={`${
                                isPending && 'pointer-events-none opacity-40'
                            }`}
                        >
                            {isPending ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                'Submit'
                            )}
                        </Button>

                        <Link
                            href={`/sign-in${queryParams.redirect ? `?redirect=${queryParams.redirect}` : ''}`}
                            className="text-sm dark:text-blue-500 mx-auto mt-2"
                        >
                            Already have an account?
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
}
