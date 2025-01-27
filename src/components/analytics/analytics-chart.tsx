'use client';

import { fetchFormResponses } from '@/actions/form-response';
import { ErrorWrapper } from '@/components/error-components';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useFormId } from '@/hooks/use-form-id';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

const chartConfig = {
    views: {
        label: 'Submissions',
    },
    submissions: {
        label: 'Submissions',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

const TIME_RANGES = {
    sevenDays: '7 Days',
    oneMonth: '30 Days',
};

export function AnalyticsChart() {
    const [activeChart] = useState<keyof typeof chartConfig>('submissions');
    const [chartData, setChartData] = useState<
        { date: string; submissions: number }[]
    >([]);
    const [selectedRange, setSelectedRange] =
        useState<keyof typeof TIME_RANGES>('sevenDays');
    const [serverSideError, setServerSideError] = useState('');

    const formId = useFormId();

    useEffect(() => {
        async function fetchResponses() {
            const result = await fetchFormResponses({
                formId,
                range: parseInt(TIME_RANGES[selectedRange]),
            });

            if (!result.success) return setServerSideError(result.message);
            setChartData(result.data);
        }

        fetchResponses();
    }, [formId, selectedRange]);

    const total = useMemo(
        () => ({
            submissions: chartData.reduce(
                (acc, curr) => acc + curr.submissions,
                0,
            ),
        }),
        [chartData],
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex space-x-6">
                {Object.entries(TIME_RANGES).map(([key, label]) => {
                    return (
                        <div
                            key={label}
                            className={cn(
                                'flex gap-2 items-center text-primary cursor-pointer',
                                {
                                    'text-gray-500/40': selectedRange !== key,
                                },
                            )}
                            onClick={() =>
                                setSelectedRange(
                                    key as keyof typeof TIME_RANGES,
                                )
                            }
                        >
                            <div
                                className={cn(
                                    'border-2 border-l border-primary/25 h-7',
                                )}
                            ></div>
                            {label}
                        </div>
                    );
                })}
            </div>
            <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Line Chart - Interactive</CardTitle>
                        <CardDescription>
                            Showing total submissions for the selected time
                            range.
                        </CardDescription>
                    </div>
                    <div className="flex">
                        {['submissions'].map((key) => {
                            const chart = key as keyof typeof chartConfig;
                            return (
                                <div
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 cursor-pointer"
                                >
                                    <span className="text-xs text-muted-foreground capitalize">
                                        {key}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {!serverSideError.length
                                            ? total[
                                                  key as keyof typeof total
                                              ].toLocaleString()
                                            : 0}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    {!serverSideError.length ? (
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                            },
                                        );
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[150px]"
                                            nameKey="views"
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value,
                                                ).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                });
                                            }}
                                        />
                                    }
                                />
                                <Line
                                    dataKey={activeChart}
                                    type="bumpX"
                                    stroke={`var(--color-${activeChart})`}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    ) : (
                        <ErrorWrapper error={serverSideError} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
