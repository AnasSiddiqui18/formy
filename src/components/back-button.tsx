'use client';

import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';

export function BackButton({ href }: { href: string }) {
    return (
        <Button className="w-fit" asChild>
            <Link href={href}>
                <Undo2 />
                Back
            </Link>
        </Button>
    );
}
