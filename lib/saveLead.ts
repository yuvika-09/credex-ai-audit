import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function saveLead(data: any) {

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