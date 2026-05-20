"use client";

import { useEffect, useState } from "react";

import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useRouter } from "next/navigation";

import LeadCapture from "./LeadCapture";

import {
    Recommendation,
    SavedAudit,
} from "@/types/audit";

import { checkPricingChanges } from "@/lib/checkPricingChanges";

import { reRunAudit } from "@/lib/reRunAudit";

import { sendReauditEmail }
    from "@/lib/sendReauditEmail";

export default function AuditClient({
    id,
}: {
    id: string;
}) {

    const router = useRouter();

    const [audit, setAudit] =
        useState<SavedAudit | null>(
            null
        );

    useEffect(() => {

        async function fetchAudit() {

            const docRef = doc(
                db,
                "audits",
                id
            );

            const docSnap =
                await getDoc(docRef);

            if (docSnap.exists()) {

                setAudit(
                    docSnap.data() as SavedAudit
                );
            }
        }

        fetchAudit();

    }, [id]);

    if (!audit) {
        return (
            <div className="min-h-screen bg-black text-white p-10">
                Loading audit...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-5xl font-bold">
                    AI Spend Audit
                </h1>

                <div className="mt-10 border border-gray-700 rounded-2xl p-6">

                    <h2 className="text-3xl font-bold">
                        Potential Savings
                    </h2>

                    <p className="text-5xl font-bold mt-4 text-green-400">
                        ${audit.result.totalSavings}/mo
                    </p>

                    <p className="text-gray-400 mt-2">
                        ${audit.result.annualSavings}/year
                    </p>

                </div>

                <div className="mt-10 border border-gray-700 rounded-2xl p-6">

                    <h2 className="text-2xl font-bold">
                        AI Summary
                    </h2>

                    <p className="text-gray-300 mt-4 leading-7">
                        {audit.summary}
                    </p>

                </div>

                <div className="space-y-5 mt-8">

                    {audit.result.recommendations.map(
                        (
                            item: Recommendation,
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="border border-gray-700 rounded-xl p-5"
                            >

                                <h3 className="text-2xl font-semibold">
                                    {item.tool}
                                </h3>

                                <p className="mt-2 text-gray-300">
                                    Current Plan:
                                    {" "}
                                    {item.currentPlan}
                                </p>

                                <p className="text-gray-300">
                                    Recommended Plan:
                                    {" "}
                                    {item.recommendedPlan}
                                </p>

                                <p className="text-green-400 font-semibold mt-3">
                                    Save $
                                    {item.savings}
                                    /month
                                </p>

                                <p className="text-gray-400 mt-3">
                                    {item.reason}
                                </p>

                            </div>
                        )
                    )}

                </div>

                <LeadCapture auditId={id} />

                <button
                    onClick={async () => {

                        const pricingCheck =
                            checkPricingChanges(
                                audit.pricingSnapshot
                            );

                        if (
                            !pricingCheck.hasChanges
                        ) {

                            alert(
                                "No pricing changes detected."
                            );

                            return;
                        }

                        const updatedAudit =
                            reRunAudit(
                                audit.tools
                            );

                        const ref = doc(
                            db,
                            "audits",
                            id
                        );

                        await updateDoc(ref, {

                            previousAudit:
                                audit.result,

                            updatedAudit,

                            lastReauditAt:
                                new Date(),
                        });

                        if (audit.email) {

                            await sendReauditEmail(
                                audit.email,

                                audit.result.totalSavings,

                                updatedAudit.totalSavings,

                                id
                            );
                        }

                        router.push(
                            `/diff/${id}`
                        );
                    }}
                    className="mt-10 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-semibold"
                >
                    Re-check Pricing
                </button>

            </div>

        </main>
    );
}