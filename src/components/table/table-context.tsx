'use client';

import { useQueryParams } from '@/hooks/use-query-params';
import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    PaginationState,
    Table,
    useReactTable,
} from '@tanstack/react-table';
import { createContext, ReactNode, useContext, useState } from 'react';

type TContext = {
    table: Table<unknown>;
};

export const TableContext = createContext<TContext | undefined>(undefined);

export function useTable() {
    const table = useContext(TableContext);
    if (!table) throw new Error('useTable must be used with in TableProvider');
    return table;
}

type DataTableProviderProps = {
    children: ReactNode;
    dynamicCols: ColumnDef<any, any>[];
    data: unknown[];
    rowCount: number;
};

export function DataTableProvider({
    children,
    data,
    dynamicCols,
    rowCount,
}: DataTableProviderProps) {
    const { setQueryParams } = useQueryParams();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        columns: dynamicCols,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (val) => {
            if (typeof val === 'function') {
                const paginationState = val(pagination);

                setQueryParams({
                    page_index: paginationState.pageIndex.toString(),
                });
            }

            return setPagination(val);
        },
        manualPagination: true,
        rowCount,
        state: {
            pagination,
        },
    });

    return (
        <TableContext.Provider value={{ table }}>
            {children}
        </TableContext.Provider>
    );
}
