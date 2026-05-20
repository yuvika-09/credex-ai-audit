import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { SavedAudit } from "@/types/audit";

export async function saveAudit(
    data: SavedAudit
) {

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