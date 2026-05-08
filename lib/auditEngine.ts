import {
    ToolInput,
    AuditResult,
} from "@/types/audit";

export function generateAudit(
    tools: ToolInput[]
): AuditResult {

    let totalSavings = 0;

    const recommendations = tools.map((tool: ToolInput) => {

        let recommendedPlan = tool.plan;
        let savings = 0;
        let reason = "Current plan looks reasonable.";

        // ChatGPT Team downgrade logic
        if (
            tool.tool.toLowerCase().includes("chatgpt") &&
            tool.plan.toLowerCase() === "team" &&
            tool.seats <= 2
        ) {
            recommendedPlan = "Plus";
            savings = tool.monthlySpend - 20 * tool.seats;

            reason =
                "ChatGPT Team is usually unnecessary for teams with fewer than 3 active collaborators.";
        }

        // Cursor Business downgrade logic
        if (
            tool.tool.toLowerCase().includes("cursor") &&
            tool.plan.toLowerCase() === "business" &&
            tool.seats <= 2
        ) {
            recommendedPlan = "Pro";
            savings = tool.monthlySpend - 20 * tool.seats;

            reason =
                "Cursor Business becomes inefficient for smaller engineering teams.";
        }

        // Claude Team downgrade
        if (
            tool.tool.toLowerCase().includes("claude") &&
            tool.plan.toLowerCase() === "team" &&
            tool.seats <= 2
        ) {
            recommendedPlan = "Pro";
            savings = tool.monthlySpend - 20 * tool.seats;

            reason =
                "Claude Team pricing only becomes cost effective with larger collaborative usage.";
        }

        totalSavings += Math.max(0, savings);

        return {
            tool: tool.tool,
            currentPlan: tool.plan,
            recommendedPlan,
            currentSpend: tool.monthlySpend,
            savings,
            annualSavings: savings * 12,
            reason,
        };
    });

    return {
        recommendations,
        totalSavings,
        annualSavings: totalSavings * 12,
        shouldRecommendCredex: totalSavings >= 500,
    };
}