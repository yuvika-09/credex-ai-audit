import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
    process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

    try {

        const body = await req.json();

        await resend.emails.send({

            from: "onboarding@resend.dev",

            to: body.email,

            subject: "Your AI Spend Audit Report",

            html: `
                <h1>AI Spend Audit</h1>

                <p>
                    Thanks for using AI Spend Audit.
                </p>

                <p>
                    Your audit has been generated successfully.
                </p>

                <p>
                    Credex may reach out if your stack qualifies for significant savings opportunities.
                </p>
            `,
        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json({
            success: false,
        });
    }
}