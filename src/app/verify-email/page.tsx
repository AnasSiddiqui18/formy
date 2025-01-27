'use client';

import { verifyToken } from '@/actions/auth';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { actionWithToast } from '@/helpers/action-with-toast';
import { useQueryParams } from '@/hooks/use-query-params';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyEmail() {
    const { queryParams } = useQueryParams();
    const router = useRouter();

    useEffect(() => {
        if (!queryParams.token) return;

        async function handleVerify() {
            const response = await actionWithToast(
                verifyToken(queryParams.token),
            );

            if (!response.success) return;

            if (queryParams.redirect && queryParams.token) {
                return router.replace(`${queryParams.redirect}`);
            }

            return router.replace('/dashboard');
        }

        handleVerify();
    }, [queryParams, router]);

    return (
        <div className="h-view flex justify-center">
            <Card className="w-[320px] h-52 shadow-md rounded-lg bg-white border border-gray-200  duration-200">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl font-semibold text-gray-800 mb-1">
                        Account verification
                    </CardTitle>

                    <CardDescription>
                        We are verifying your account. Then you&apos;ll be
                        redirect.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
