'use client';

import { AnalyticsChart } from '@/components/analytics/analytics-chart';
import { BackButton } from '@/components/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TCanvasData } from '@/types';

type AnalyticsCardProps = {
    id: string;
    title: string;
    status: 'PUBLISHED' | 'DRAFT';
    user_id: string | null;
    created_at: Date;
    updated_at: Date;
    schema: TCanvasData[];
    responsesCount: string;
};

export function AnalyticsCard({ form }: { form: AnalyticsCardProps }) {
    return (
        <div className="px-section_padding py-5 space-y-8 border-2 border-gray-300 rounded-2xl h-full">
            <BackButton href="/dashboard" />
            <div className="text-2xl font-medium capitalize">{form.title}</div>
            <div className="grid grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Responses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">
                            {form.responsesCount}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <AnalyticsChart />
        </div>
    );
}
