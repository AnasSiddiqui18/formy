'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { signUpAction } from '@/actions/auth';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpValidation } from '@/app/validation';

export default function SignUp() {
    const [isPending, startTransition] = useTransition();
    const [serverSideError, setServerSideError] = useState('');

    const form = useForm<z.infer<typeof signUpValidation>>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
        },
    });
    const router = useRouter();

    function onSubmit(data: z.infer<typeof signUpValidation>) {
        startTransition(async () => {
            const response = await signUpAction(data);

            if (!response.success) {
                setServerSideError(response.message as string);
                return;
            }

            return router.replace('/sign-in');
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
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="john doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                isPending ||
                                (serverSideError &&
                                    'pointer-events-none opacity-40')
                            }`}
                        >
                            {isPending ? (
                                <LoaderCircle className="animate-spin" />
                            ) : (
                                'Submit'
                            )}
                        </Button>

                        <Link
                            href="/sign-in"
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
