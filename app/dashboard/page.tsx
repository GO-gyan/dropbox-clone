import React from "react";
import { auth } from "@clerk/nextjs";
import Dropzone from "@/components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";
async function Dashboard() {
    const { userId } = auth();

    const docsResult = await getDocs(collection(db, "users", userId!, "files"));
    const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        type: doc.data().type,
        size: doc.data().size,
        downloadURL: doc.data().downloadURL,
    }));
    return (
        <div>
            <Dropzone />

            <section className="container space-y-5">
                <h2 className="font-bold">All Files</h2>
                <TableWrapper skeletonFiles={skeletonFiles} />
            </section>
        </div>
    );
}

export default Dashboard;
