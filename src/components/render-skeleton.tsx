'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function RenderSkeleton() {
    return (
        <div className="flex gap-3">
            {Array.from({ length: 3 })
                .fill(0)
                .map((_, index) => {
                    return (
                        <Skeleton
                            key={index}
                            className="h-[200px] w-[300px] rounded-xl"
                        />
                    );
                })}
        </div>
    );
}
