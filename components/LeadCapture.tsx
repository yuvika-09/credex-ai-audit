"use client";

import { useState } from "react";
import { saveLead } from "@/lib/saveLead";

export default function LeadCapture({
    auditId,
}: {
    auditId: string;
}) {

    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");

    const [submitted, setSubmitted] =
        useState(false);

    async function handleSubmit() {

        if (!email) return;

        if (website) return;

        await saveLead({
            email,
            company,
            role,
            auditId,
            createdAt: new Date(),
        });

        await fetch("/api/send-email", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email,
            }),
        });

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="bg-green-600 rounded-2xl p-6 mt-10">
                <h2 className="text-2xl font-bold">
                    Report Captured
                </h2>

                <p className="mt-2">
                    A confirmation email has been sent.
                </p>
            </div>
        );

        const [website, setWebsite] = useState("");
    }

    return (
        <div className="border border-gray-700 rounded-2xl p-6 mt-10 space-y-4">

            <h2 className="text-2xl font-bold">
                Get Full Report
            </h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700"
            />

            <input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) =>
                    setCompany(e.target.value)
                }
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700"
            />

            <input
                type="text"
                placeholder="Role (optional)"
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)
                }
                className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700"
            />

            <input
    type="text"
    value={website}
    onChange={(e) =>
        setWebsite(e.target.value)
    }
    className="hidden"
/>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
            >
                Capture Report
            </button>

        </div>
    );
}