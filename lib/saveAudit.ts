import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function saveAudit(data: any) {

    try {

        const docRef = await addDoc(
            collection(db, "audits"),
            data
        );

        return docRef.id;

    } catch (error) {

        console.error(error);
        return null;
    }
}