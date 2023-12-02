"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileType } from "@/typings";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "@/constant";

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension: string = type.split("/")[1];
            return (
                <div className="w-8 h-8">
                    <FileIcon
                        extension={extension}
                        labelColor={COLOR_EXTENSION_MAP[extension]}
                        {...defaultStyles[extension]}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "filename",
        header: "Filename",
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "timestamp",
        header: "Date added",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>;
        },
    },
    {
        accessorKey: "downloadURL",
        header: "Download",
        cell: ({ renderValue, ...props }) => {
            return (
                <a
                    href={renderValue() as string}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-500 hover:text-blue-600"
                >
                    Download
                </a>
            );
        },
    },
];
