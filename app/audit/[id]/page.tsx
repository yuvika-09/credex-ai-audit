"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AuditPage({
    params,
}: {
    params: { id: string };
}) {

    const [audit, setAudit] = useState<any>(null);

    useEffect(() => {

        async function fetchAudit() {

            const docRef = doc(db, "audits", params.id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setAudit(docSnap.data());
            }
        }

        fetchAudit();

    }, [params.id]);

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

            </div>

        </main>
    );
}