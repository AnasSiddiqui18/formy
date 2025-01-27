'use client';

import { Button } from '@/components/ui/button';
import { dashboardContent } from '@/data';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="min-h-view min-w-[300px] pt-4 px-3 border-r border-gray-300">
            <div className="flex flex-col gap-4">
                {dashboardContent.map((e, i) => {
                    return (
                        <Button
                            key={i}
                            variant={
                                pathname === e.href ? 'default' : 'secondary'
                            }
                            className="h-14 flex justify-start items-center px-4 rounded-lg font-medium transition-colors duration-200 shadow-none"
                            onClick={() => router.push(e.href)}
                        >
                            <div className="flex gap-3 items-center">
                                <e.icon className="w-5 h-5" />
                                <span className="text-base">{e.content}</span>
                            </div>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
