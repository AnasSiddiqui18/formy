'use client';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/db/schema';
import { toUpperCase } from '@/lib/utils';
import Link from 'next/link';

export function ResponseCard({
    responseCardProps: { data, href },
}: {
    responseCardProps: {
        data: Form;
        href: string;
    };
}) {
    return (
        <Card
            className="w-[320px] h-[150px] shadow-md rounded-lg bg-white border border-gray-200 duration-200"
            key={data.id}
        >
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold text-gray-800 mb-1">
                    {toUpperCase(data.title)}
                </CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-end items-center p-4">
                <Button
                    className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
                    asChild
                >
                    <Link href={href}>
                        <span>View</span>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
