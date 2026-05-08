import { Metadata } from "next";
import AuditClient from "@/components/AuditClient";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {

    const resolvedParams = await params;

    return {
        title: "AI Spend Audit — Find Hidden AI Tool Savings",

        description:
            "Discover hidden savings in your AI tooling stack.",

        openGraph: {
            title: "AI Spend Audit — Find Hidden AI Tool Savings",

            description:
                "Analyze ChatGPT, Claude, Cursor, Gemini, and other AI subscriptions to uncover overspending and optimization opportunities.",

            url: `credex-ai-audit-flax.vercel.app/audit/${resolvedParams.id}`,

            siteName: "AI Spend Audit",

            images: [
                "https://credex-ai-audit-flax.vercel.app/og-logo.png"
            ],

            type: "website",
        },

        twitter: {
            card: "summary_large_image",

            title: "AI Spend Audit — Find Hidden AI Tool Savings",

            description:
                "Analyze ChatGPT, Claude, Cursor, Gemini, and other AI subscriptions to uncover overspending and optimization opportunities.",

            images: [
                "https://credex-ai-audit-flax.vercel.app/og-logo.png"
            ],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const resolvedParams = await params;

    return (
        <AuditClient id={resolvedParams.id} />
    );
}