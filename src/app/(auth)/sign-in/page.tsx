'use client';

import { signInAction } from '@/actions/auth';
import { signInValidation } from '@/app/validation';
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
import { signInData } from '@/data';
import { useQueryParams } from '@/hooks/use-query-params';
import { handleUserAccountVerificationByEmail, showToast } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export default function SignIn() {
    const [isPending, startTransition] = useTransition();
    const [serverSideError, setServerSideError] = useState('');
    const router = useRouter();
    const { queryParams } = useQueryParams();

    const form = useForm({
        resolver: zodResolver(signInValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: typeof signInValidation._input) {
        startTransition(async () => {
            const response = await signInAction(values);

            if (!response.success) {
                setServerSideError(response.message as string);
                return;
            }

            if (!response.data.email_verified) {
                const result = await handleUserAccountVerificationByEmail({
                    queryParams,
                    data: response.data.email,
                });

                if (!result.success) {
                    showToast({
                        variant: 'error',
                        message: result.message,
                    });

                    return;
                }

                showToast({
                    variant: 'success',
                    message: result.data,
                });

                return;
            }

            if (queryParams.redirect) {
                return router.replace(queryParams.redirect);
            }

            return router.replace('/dashboard');
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
                            <h1 className="font-semibold text-2xl">Sign In</h1>
                        </div>

                        <div className="flex flex-col gap-3 mt-10 mb-5">
                            {signInData.map((data) => (
                                <FormField
                                    key={data.field_name}
                                    control={form.control}
                                    name={data.field_name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">
                                                {data.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={
                                                        data.placeholder
                                                    }
                                                    {...field}
                                                    type={data.type}
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
                            disabled={isPending}
                            loading={isPending}
                        >
                            Submit
                        </Button>

                        <Link
                            href={`/sign-up${queryParams.redirect ? `?redirect=${queryParams.redirect}` : ''} `}
                            className="text-sm dark:text-blue-500 mx-auto mt-2"
                        >
                            Doesn&apos;t have an account?
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
}
