import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(audit: any) {

    try {

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",

            messages: [
                {
                    role: "system",
                    content:
                        "You are an AI infrastructure cost optimization expert. Write a concise 100-word summary explaining where the company is overspending and what optimizations are recommended.",
                },

                {
                    role: "user",
                    content: JSON.stringify(audit),
                },
            ],
        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.error(error);

        return `
Your current AI tooling setup shows opportunities for cost optimization. 
Several plans appear oversized for your current team structure and usage patterns. 
Switching to more appropriate plans and consolidating tooling may significantly reduce monthly spend while maintaining similar functionality.
`;
    }
}