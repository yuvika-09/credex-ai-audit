import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function saveLead(data: {
    email: string;
    company: string;
    role: string;
    auditId: string;
    createdAt: Date;
}) {

    try {

        const docRef = await addDoc(
            collection(db, "leads"),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error(error);
        return null;
    }
}