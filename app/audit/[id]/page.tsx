import { Metadata } from "next";
import AuditClient from "@/components/AuditClient";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {

    const resolvedParams = await params;

    return {
        title: "AI Spend Audit Report",

        description:
            "Discover hidden savings in your AI tooling stack.",

        openGraph: {
            title: "AI Spend Audit Report",

            description:
                "Discover hidden savings in your AI tooling stack.",

            url: `https://yourdomain.com/audit/${resolvedParams.id}`,

            siteName: "AI Spend Audit",

            images: ["/og-image.png"],

            type: "website",
        },

        twitter: {
            card: "summary_large_image",

            title: "AI Spend Audit Report",

            description:
                "Discover hidden savings in your AI tooling stack.",

            images: ["/og-image.png"],
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