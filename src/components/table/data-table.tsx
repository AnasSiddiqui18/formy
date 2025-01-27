'use client';

import { ErrorWrapper } from '@/components/error-components';
import { useTable } from '@/components/table/table-context';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { flexRender } from '@tanstack/react-table';
import { FolderX } from 'lucide-react';
import { ReactNode } from 'react';

export function DataTable({ error }: { error: ReactNode }) {
    const { table } = useTable();

    return (
        <div className="border-2 border-violet-500 rounded-md mt-5">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    className="h-12 whitespace-nowrap px-4 text-accent-foreground"
                                    key={cell.id}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {error && <ErrorWrapper error={error} />}

            {!error &&
                (table.getRowCount() === 0 ||
                    !table.getRowModel().rows.length) && (
                    <div className="flex flex-col items-center py-2 gap-2 h-48 justify-center">
                        <FolderX size={50} className="text-primary w-full" />
                        <span className="text-base font-normal">
                            No Records
                        </span>
                    </div>
                )}
        </div>
    );
}
