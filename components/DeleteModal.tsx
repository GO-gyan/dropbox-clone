"use client";

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
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/firebase";
import toast from "react-hot-toast";

export function DeleteModal() {
    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ]);

    async function deleteFile() {
        if (!user || !fileId) return;

        const toastId = toast.loading("Deleting file...");
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        await deleteObject(fileRef);
        await deleteDoc(doc(db, "users", user.id, "files", fileId));
        setIsDeleteModalOpen(false);
        toast.success("File deleted successfully!", {
            id: toastId,
        });
    }
    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="px-3 flex-1"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        type="submit"
                        className="px-3 flex-1"
                        onClick={() => deleteFile()}
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
