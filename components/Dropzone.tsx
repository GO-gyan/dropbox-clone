"use client";
import DropzoneComponent from "react-dropzone";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function Dropzone() {
    const [loading, setLoading] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const maxSize = 20971520;
    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async () => {
                // Do whatever you want with the file contents
                await uploadPost(file);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;
        setLoading(true);
        const toastId = toast.loading("Uploading...");
        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
            userId: user.id,
            fullName: user.fullName,
            filename: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            timestamp: serverTimestamp(),
            profileImage: user.imageUrl,
        });
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL,
            });
        });
        toast.success("File uploaded successfully!", {
            id: toastId,
        });
        setLoading(false);
    };
    return (
        <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
                return (
                    <section className="m-4">
                        <div
                            {...getRootProps()}
                            className={cn(
                                "w-full h-52 flex justify-center items-center p-5 border-2 border-dashed rounded-lg text-center",
                                {
                                    "border-red-500": isDragReject,
                                    "bg-[#035FFE] text-white animate-pulse": isDragActive,
                                    "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400": !isDragActive,
                                }
                            )}
                        >
                            <input {...getInputProps()} />
                            {!isDragActive && "Click here or drop files here"}
                            {isDragActive && !isDragReject && "Drop it like it's hot"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && <div className="text-danger mt-2">File is too large, sorry!</div>}
                        </div>
                    </section>
                );
            }}
        </DropzoneComponent>
    );
}

export default Dropzone;
