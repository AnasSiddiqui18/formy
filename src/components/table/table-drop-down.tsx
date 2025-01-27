'use client';

import { deleteResponse } from '@/actions/form-response';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function TableDropDown({ response_id }: { response_id: string }) {
    const router = useRouter();

    async function deleteFormResponse() {
        const result = await deleteResponse({
            response_id,
        });

        if (!result.success) return;
        return router.refresh();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus-visible:ring-0">
                <Button variant="outline">
                    <EllipsisVertical size={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
                <DropdownMenuCheckboxItem>
                    <Link href={`/response/${response_id}`} className="w-full">
                        View
                    </Link>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="cursor-pointer"
                    onClick={deleteFormResponse}
                >
                    Delete
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="cursor-pointer">
                    Export
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
