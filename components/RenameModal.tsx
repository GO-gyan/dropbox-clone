"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

export function RenameModal() {
    const { user } = useUser();
    const [input, setInput] = useState("");
    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] = useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
    ]);

    const renameFile = async () => {
        if (!user || !fileId || !input) return;

        const toastId = toast.loading("Reanaming file...");

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            filename: input,
        });

        toast.success("Reanamed Successfully!", {
            id: toastId,
        });
        setInput("");
        setIsRenameModalOpen(false);
    };
    return (
        <Dialog open={isRenameModalOpen} onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-2">Rename the file</DialogTitle>
                    <DialogDescription>Please enter a new name for the file.</DialogDescription>
                    <Input
                        id="link"
                        defaultValue={filename}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant={"outline"}
                        className="ml-auto w-36 h-10 mb-5"
                        onClick={() => setIsRenameModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button size="sm" type="submit" className="px-3 flex-1" onClick={() => renameFile()}>
                        <span className="sr-only">Rename</span>
                        <span>Rename</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
