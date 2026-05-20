import { generateAudit } from "./auditEngine";
import { ToolInput } from "@/types/audit";

export function reRunAudit(
    tools: ToolInput[]
) {
    return generateAudit(tools);
}