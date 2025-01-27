'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Undo2Icon } from 'lucide-react';
import Link from 'next/link';

type TFetchResponse = {
    content: Record<string, string>;
    form_id: string;
    response_id: string;
    created_at: Date;
    respondent_name: string | null;
    form_name: string | null;
};

export function FormResponseCard({ result }: { result: TFetchResponse }) {
    return (
        <Card className="w-full max-w-lg shadow-md relative">
            <Button className="absolute top-2 left-2">
                <Link href={`/form_responses/${result.form_id}`}>
                    <Undo2Icon />
                </Link>
            </Button>

            <CardHeader className="mt-9">
                <CardTitle>Form Response Details</CardTitle>
                <CardDescription>
                    Review the detailed response for the form:{' '}
                    <strong>{result.form_name}</strong>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <p>
                        <strong>Response ID:</strong> {result.response_id}
                    </p>
                    <p>
                        <strong>Form ID:</strong> {result.form_id}
                    </p>
                </div>

                <div>
                    <strong>Content:</strong>
                    <div className="mt-2 space-y-2">
                        {Object.entries(result.content).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex justify-between items-center px-4 py-2 bg-violet-500/15 rounded-md"
                            >
                                <span className="font-medium">{key}</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <strong>Respondent:</strong> {result.respondent_name}
                </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    <strong>Created At:</strong>
                    <span>{format(result.created_at, 'dd/MM/yyyy')}</span>
                </p>
            </CardFooter>
        </Card>
    );
}
