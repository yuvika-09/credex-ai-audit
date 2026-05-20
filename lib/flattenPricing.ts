import { currentPricing } from "./currentPricing";

export function flattenPricing(
    pricing = currentPricing
) {
    return {

        // ChatGPT
        chatgpt_plus:
            pricing.chatgpt.plus,

        chatgpt_team:
            pricing.chatgpt.team,

        // Cursor
        cursor_pro:
            pricing.cursor.pro,

        cursor_business:
            pricing.cursor.business,

        // Claude
        claude_pro:
            pricing.claude.pro,

        claude_team:
            pricing.claude.team,

        // GitHub Copilot
        copilot_individual:
            pricing.copilot.individual,

        copilot_business:
            pricing.copilot.business,
    };
}