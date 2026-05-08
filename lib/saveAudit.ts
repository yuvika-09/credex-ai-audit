import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { AuditResult, ToolInput } from "@/types/audit";

export async function saveAudit(data: {
    tools: ToolInput[];
    teamSize: number;
    useCase: string;
    result: AuditResult;
    summary: string;
    createdAt: Date;
}) {

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