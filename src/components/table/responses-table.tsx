'use client';

import { PaginationButtons } from '@/components/pagination-buttons';
import { DataTable } from '@/components/table/data-table';
import { DataTableProvider } from '@/components/table/table-context';
import { TableDropDown } from '@/components/table/table-drop-down';
import { TableHeader } from '@/components/table/table-header';
import { Button } from '@/components/ui/button';
import { FormResponses } from '@/db/schema';
import { ResponseType } from '@/lib/response';
import cuid2 from '@paralleldrive/cuid2';
import { ColumnDef } from '@tanstack/react-table';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';

export function ResponsesTable({
    responseTableProps: { columns, data, rowCount },
}: {
    responseTableProps: {
        columns: {
            fieldName: string;
        }[];
        data: ResponseType<FormResponses[]>;
        rowCount: number;
    };
}) {
    //

    const dynamicCols: ColumnDef<any, any>[] = [
        ...columns.map(
            (col): ColumnDef<any, any> => ({
                accessorKey: col.fieldName,
                accessorFn: (row) => row[col.fieldName].toLowerCase(),
                header: ({ column }) => (
                    <TableHeader column={column} fieldName={col.fieldName} />
                ),
                cell: ({ row }) => row.original[col.fieldName],
            }),
        ),

        {
            accessorKey: cuid2.createId(),
            header: 'Action',
            cell: ({ row }) => {
                return <TableDropDown response_id={row.original.id} />;
            },
        },
    ];

    const tableData = data.data?.map((e) => ({
        id: e.id,
        ...e.content,
    }));

    return (
        <DataTableProvider
            data={tableData ?? []}
            dynamicCols={dynamicCols}
            rowCount={rowCount}
        >
            <Button className="w-fit" asChild>
                <Link href={'/dashboard/responses'}>
                    <Undo2 />
                    Back
                </Link>
            </Button>
            <PaginationButtons />
            <DataTable error={data.message} />
        </DataTableProvider>
    );
}
