'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next-nprogress-bar';

export function FormNotExist() {
    const router = useRouter();

    return (
        <div className="flex w-full justify-center py-3">
            <Card className="w-[320px] md:w-[380px] h-60 shadow-lg rounded-xl bg-white border border-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <CardHeader className="p-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span>⚠️</span> Form Unavailable
                    </CardTitle>

                    <CardDescription className="text-gray-600 text-sm">
                        It looks like the form is no longer available or
                        doesn&apos;t contain any field. You can navigate to the
                        dashboard and continue safely.
                    </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-end items-center p-6">
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-5 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                        onClick={() => router.replace('/dashboard')}
                    >
                        <span>🏠</span> Navigate
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
