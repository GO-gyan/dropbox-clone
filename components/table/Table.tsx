"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon, PencilIcon } from "lucide-react";
import { FileType } from "@/typings";
import { useAppStore } from "@/store/store";
import { DeleteModal } from "@/components/DeleteModal";
import { RenameModal } from "@/components/RenameModal";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [setFileId, setFilename, setIsDeleteModalOpen, setIsRenameModalOpen] = useAppStore((state) => [
        state.setFileId,
        state.setFilename,
        state.setIsDeleteModalOpen,
        state.setIsRenameModalOpen,
    ]);

    // const [fileId, setFileId] = useAppStore((state) => [state.fileId, state.setFileId]);
    // const [filename, setFilename] = useAppStore((state) => [state.filename, state.setFilename]);
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore((state) => [state.isDeleteModalOpen, state.setIsDeleteModalOpen]);
    // const [isRenameModalOpen, setIsRenameModalOpen] = useAppStore((state) => [state.isRenameModalOpen, state.setIsRenameModalOpen]);

    const openDeleteModal = (fieldId: string) => {
        setFileId(fieldId);
        setIsDeleteModalOpen(true);
    };

    const openRenameModal = (fieldId: string, filename: string) => {
        console.log("xsdxsdxswxsxsxsx");
        setFileId(fieldId);
        setFilename(filename);
        setIsRenameModalOpen(true);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                <DeleteModal />
                                <RenameModal />
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {cell.column.id === "timestamp" ? (
                                            <div>
                                                <span className="text-sm">
                                                    {cell.getValue<Date>().toLocaleDateString()}
                                                </span>
                                                <br />
                                                <span className="text-xs text-muted-foreground">
                                                    {cell.getValue<Date>().toLocaleTimeString()}
                                                </span>
                                            </div>
                                        ) : cell.column.id === "filename" ? (
                                            <p
                                                onClick={() => {
                                                    openRenameModal(
                                                        (row.original as FileType).id,
                                                        (row.original as FileType).filename
                                                    );
                                                }}
                                                className="underline flex items-center text-blue-500 hover:cursor-pointer"
                                            >
                                                {cell.getValue() as string} <PencilIcon size={15} className="ml-2" />
                                            </p>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                ))}

                                <TableCell key={(row.original as FileType).id}>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            openDeleteModal((row.original as FileType).id);
                                        }}
                                    >
                                        <TrashIcon size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
