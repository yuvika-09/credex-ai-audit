"use client";

import { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AuditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const resolvedParams = use(params);

    const [audit, setAudit] = useState<any>(null);

    useEffect(() => {

        async function fetchAudit() {

            const docRef = doc(
                db,
                "audits",
                resolvedParams.id
            );

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setAudit(docSnap.data());
            }
        }

        fetchAudit();

    }, [resolvedParams.id]);

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
                        (item: any, index: number) => (
                            <div
                                key={index}
                                className="border border-gray-700 rounded-xl p-5"
                            >
                                <h3 className="text-2xl font-semibold">
                                    {item.tool}
                                </h3>

                                <p className="mt-2 text-gray-300">
                                    Current Plan: {item.currentPlan}
                                </p>

                                <p className="text-gray-300">
                                    Recommended Plan: {item.recommendedPlan}
                                </p>

                                <p className="text-green-400 font-semibold mt-3">
                                    Save ${item.savings}/month
                                </p>

                                <p className="text-gray-400 mt-3">
                                    {item.reason}
                                </p>
                            </div>
                        )
                    )}

                </div>

                {audit.result.shouldRecommendCredex && (
                    <div className="bg-blue-600 rounded-2xl p-6 mt-10">

                        <h2 className="text-3xl font-bold">
                            Large Savings Opportunity
                        </h2>

                        <p className="mt-3">
                            Your team may qualify for discounted AI infrastructure credits through Credex.
                        </p>

                    </div>
                )}

            </div>

        </main>
    );
}