import emailjs from "@emailjs/browser";

export async function sendReauditEmail(
    email: string,
    oldSavings: number,
    newSavings: number,
    auditId: string
) {

    try {

        const response =
            await emailjs.send(

                process.env
                    .NEXT_PUBLIC_EMAILJS_SERVICE_ID!,

                process.env
                    .NEXT_PUBLIC_EMAILJS_REAUDIT_TEMPLATE_ID!,

                {
                    to_email: email,

                    old_savings:
                        `$${oldSavings}/mo`,

                    new_savings:
                        `$${newSavings}/mo`,

                    diff_link:
                        `https://credex-ai-audit-flax.vercel.app/diff/${auditId}`,
                },

                process.env
                    .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

        console.log(
            "RE-AUDIT EMAIL SUCCESS:",
            response
        );

    } catch (error) {

        console.error(
            "RE-AUDIT EMAIL ERROR:",
            error
        );
    }
}