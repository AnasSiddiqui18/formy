'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toUpperCase } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from 'lucide-react';

type TableHeaderProps = {
    column: Column<Record<string, any>>;
    fieldName: string;
};

export function TableHeader({ column, fieldName }: TableHeaderProps) {
    const isSorted = column.getIsSorted();

    const Icon =
        isSorted === 'asc'
            ? ArrowUpIcon
            : isSorted === 'desc'
              ? ArrowDownIcon
              : ArrowUpDown;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-2 items-center cursor-pointer w-fit">
                    {toUpperCase(fieldName)}
                    <Icon size={15} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    Asc
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    Desc
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => column.clearSorting()}>
                    Clear
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
