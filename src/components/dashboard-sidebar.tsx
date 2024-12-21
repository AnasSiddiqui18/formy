'use client';

import { dashboardContent } from '@/data';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="bg-white min-h-view min-w-[300px] pt-4 px-3 border-r border-gray-300">
            <div className="flex flex-col gap-4">
                {dashboardContent.map((e, i) => {
                    return (
                        <Button
                            key={i}
                            className={cn(
                                'h-14 flex justify-start items-center px-4 rounded-lg font-medium transition-colors duration-200 bg-white hover:bg-gray-200 text-black shadow-none',
                                {
                                    'bg-violet-500 hover:bg-violet-600 text-white':
                                        e.href === pathname,
                                },
                            )}
                            asChild
                        >
                            <Link href={e.href}>
                                <div className="flex gap-3 items-center">
                                    <e.icon className="w-5 h-5" />
                                    <span className="text-base">
                                        {e.content}
                                    </span>
                                </div>
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
