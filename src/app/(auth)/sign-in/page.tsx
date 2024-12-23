'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { z } from 'zod';
import { signInAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { signInValidation } from '@/app/validation';

export default function SignIn() {
    const [isPending, startTransition] = useTransition();
    const [serverSideError, setServerSideError] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof signInValidation>>({
        resolver: zodResolver(signInValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof signInValidation>) {
        startTransition(async () => {
            const response = await signInAction(values);

            if (!response.success) {
                setServerSideError(response.message as string);
                return;
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="johndoe@mail.ai"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                        >
                            {isPending ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                'Submit'
                            )}
                        </Button>

                        <Link
                            href="/sign-up"
                            className="text-sm dark:text-blue-500 mx-auto mt-2"
                        >
                            {`Doesn't have an account?`}
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
}
