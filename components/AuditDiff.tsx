"use client";

import { useEffect, useState } from "react";

import {
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AuditDiff({
    id,
}: {
    id: string;
}) {

    const [audit, setAudit] =
        useState<{
            previousAudit?: {
                totalSavings: number;
            };

            updatedAudit?: {
                totalSavings: number;

                recommendations: {
                    tool: string;
                    recommendedPlan: string;
                    savings: number;
                }[];
            };
        } | null>(null);

    useEffect(() => {

        async function fetchAudit() {

            const ref = doc(
                db,
                "audits",
                id
            );

            const snap =
                await getDoc(ref);

            if (snap.exists()) {
                setAudit(snap.data());
            }
        }

        fetchAudit();

    }, [id]);

    if (!audit) {
        return (
            <div className="min-h-screen bg-black text-white p-10">
                Loading diff...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white p-10">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold">
                    Re-Audit Results
                </h1>

                <p className="text-gray-400 mt-4">
                    Pricing updates were detected for one or more AI tools,
                    and your audit was automatically recalculated using the latest pricing data.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    <div className="border border-gray-700 rounded-2xl p-6">

                        <h2 className="text-2xl font-bold">
                            Previous Audit
                        </h2>

                        <p className="mt-4 text-green-400 text-4xl font-bold">
                            $
                            {
                                audit.previousAudit
                                    ?.totalSavings
                            }
                            /mo
                        </p>

                    </div>

                    <div className="border border-gray-700 rounded-2xl p-6">

                        <h2 className="text-2xl font-bold">
                            Updated Audit
                        </h2>

                        <p className="mt-4 text-green-400 text-4xl font-bold">
                            $
                            {
                                audit.updatedAudit
                                    ?.totalSavings
                            }
                            /mo
                        </p>

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-3xl font-bold">
                        Recommendation Changes
                    </h2>

                    <div className="space-y-4 mt-6">

                        {audit.updatedAudit?.recommendations.map(
                            (
                                item: {
                                    tool: string;
                                    recommendedPlan: string;
                                    savings: number;
                                },
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
                                        New Recommended Plan:
                                        {" "}
                                        {item.recommendedPlan}
                                    </p>

                                    <p className="text-green-400 font-semibold mt-3">
                                        Updated Savings:
                                        {" "}
                                        ${item.savings}/month
                                    </p>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>

        </main>
    );
}