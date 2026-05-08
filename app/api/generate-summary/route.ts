import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const completion =
            await openai.chat.completions.create({

                model: "gpt-4o-mini",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an AI infrastructure cost optimization expert. Write a concise 100-word summary explaining where the company is overspending and what optimizations are recommended.",
                    },

                    {
                        role: "user",
                        content: JSON.stringify(body),
                    },
                ],
            });

        return NextResponse.json({
            summary:
                completion.choices[0].message.content,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json({
            summary:
                "Your current AI tooling setup shows opportunities for optimization and potential savings across multiple subscriptions.",
        });
    }
}