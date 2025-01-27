'use client';

import { useTable } from '@/components/table/table-context';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

export function PaginationButtons() {
    const { table } = useTable();

    return (
        <div className="flex justify-end gap-2">
            <Button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <ChevronsLeft />
            </Button>

            <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
            >
                <ChevronLeft />
            </Button>

            <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
            >
                <ChevronRight />
            </Button>

            <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
                <ChevronsRight />
            </Button>
        </div>
    );
}
