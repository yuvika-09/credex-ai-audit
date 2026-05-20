"use client";

import { useState, useEffect } from "react";
import { generateAudit } from "@/lib/auditEngine";
import { saveAudit } from "@/lib/saveAudit";
import { useRouter } from "next/navigation";
import { AuditResult, Recommendation, ToolInput } from "@/types/audit";
import { currentPricing } from "@/lib/currentPricing";
import { flattenPricing } from "@/lib/flattenPricing";


export default function SpendForm() {
    const router = useRouter();

    const [auditResult, setAuditResult] =
        useState<AuditResult | null>(null);

    const [tools, setTools] = useState<ToolInput[]>([
        {
            tool: "Cursor",
            plan: "Pro",
            monthlySpend: 20,
            seats: 1,
        },
    ]);

    const [teamSize, setTeamSize] = useState(1);
    const [useCase, setUseCase] = useState("coding");

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const saved = localStorage.getItem("audit-form");

        if (saved) {
            const parsed = JSON.parse(saved);

            setTeamSize(parsed.teamSize || 1);

            setUseCase(
                parsed.useCase || "coding"
            );

            setTools(
                parsed.tools || [
                    {
                        tool: "Cursor",
                        plan: "Pro",
                        monthlySpend: 20,
                        seats: 1,
                    },
                ]
            );
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "audit-form",
            JSON.stringify({
                teamSize,
                useCase,
                tools,
            })
        );
    }, [teamSize, useCase, tools]);

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">

            {/* Team Size */}
            <div>
                <label className="block mb-2 font-medium">
                    Team Size
                </label>

                <input
                    type="number"
                    value={teamSize}
                    onChange={(e) =>
                        setTeamSize(
                            Number(e.target.value)
                        )
                    }
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                />
            </div>

            {/* Use Case */}
            <div>
                <label className="block mb-2 font-medium">
                    Primary Use Case
                </label>

                <select
                    value={useCase}
                    onChange={(e) =>
                        setUseCase(e.target.value)
                    }
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                >
                    <option value="coding">
                        Coding
                    </option>

                    <option value="writing">
                        Writing
                    </option>

                    <option value="research">
                        Research
                    </option>

                    <option value="data">
                        Data
                    </option>

                    <option value="mixed">
                        Mixed
                    </option>
                </select>
            </div>

            {/* Tool Inputs */}
            <div className="space-y-4">

                {tools.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-700 rounded-xl p-4 space-y-3"
                    >

                        <input
                            type="text"
                            value={item.tool}
                            onChange={(e) => {
                                const updated = [...tools];

                                updated[index].tool =
                                    e.target.value;

                                setTools(updated);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                            placeholder="Tool Name"
                        />

                        <input
                            type="text"
                            value={item.plan}
                            onChange={(e) => {
                                const updated = [...tools];

                                updated[index].plan =
                                    e.target.value;

                                setTools(updated);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                            placeholder="Plan"
                        />

                        <input
                            type="number"
                            value={item.monthlySpend}
                            onChange={(e) => {
                                const updated = [...tools];

                                updated[index].monthlySpend =
                                    Number(
                                        e.target.value
                                    );

                                setTools(updated);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                            placeholder="Monthly Spend"
                        />

                        <input
                            type="number"
                            value={item.seats}
                            onChange={(e) => {
                                const updated = [...tools];

                                updated[index].seats =
                                    Number(
                                        e.target.value
                                    );

                                setTools(updated);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                            placeholder="Seats"
                        />

                    </div>
                ))}
            </div>

            {/* Add Tool */}
            <button
                onClick={() =>
                    setTools([
                        ...tools,
                        {
                            tool: "",
                            plan: "",
                            monthlySpend: 0,
                            seats: 1,
                        },
                    ])
                }
                className="bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
            >
                Add Tool
            </button>

            {/* Generate Audit */}
            <button
                onClick={async () => {

                    const result =
                        generateAudit(tools);

                    setAuditResult(result);

                    const response =
                        await fetch(
                            "/api/generate-summary",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                },

                                body: JSON.stringify(
                                    result
                                ),
                            }
                        );

                    const data =
                        await response.json();

                    const auditId =
                        await saveAudit({
                            tools,
                            teamSize,
                            useCase,
                            result,
                            summary: data.summary,
                            createdAt:
                                new Date(),
                            pricingSnapshot: flattenPricing(currentPricing),
                        });

                    if (auditId) {
                        router.push(
                            `/audit/${auditId}`
                        );
                    }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
            >
                Generate Audit
            </button>

            {/* Audit Results */}
            {auditResult && (
                <div className="mt-10 border border-gray-700 rounded-2xl p-6 space-y-6">

                    {/* Savings */}
                    <div>

                        <h2 className="text-3xl font-bold">
                            Potential Savings
                        </h2>

                        <p className="text-5xl font-bold mt-4 text-green-400">
                            $
                            {auditResult.totalSavings}
                            /mo
                        </p>

                        {auditResult.totalSavings === 0 && (
                            <p className="text-green-300 mt-3">
                                Your current stack already looks cost efficient.
                            </p>
                        )}

                        <p className="text-gray-400 mt-2">
                            $
                            {
                                auditResult.annualSavings
                            }
                            /year
                        </p>

                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">

                        {auditResult.recommendations.map(
                            (
                                item: Recommendation,
                                index: number
                            ) => (
                                <div
                                    key={index}
                                    className="border border-gray-700 rounded-xl p-4"
                                >

                                    <h3 className="text-xl font-semibold">
                                        {item.tool}
                                    </h3>

                                    <p className="mt-2 text-gray-300">
                                        Current Plan:{" "}
                                        {
                                            item.currentPlan
                                        }
                                    </p>

                                    <p className="text-gray-300">
                                        Recommended Plan:{" "}
                                        {
                                            item.recommendedPlan
                                        }
                                    </p>

                                    <p className="text-green-400 font-semibold mt-2">
                                        Save $
                                        {item.savings}
                                        /month
                                    </p>

                                    {item.savings === 0 && (
                                        <p className="text-blue-300 mt-2 text-sm">
                                            No optimization needed.
                                        </p>
                                    )}

                                    <p className="text-gray-400 mt-2 text-sm">
                                        {item.reason}
                                    </p>

                                </div>
                            )
                        )}

                    </div>

                    {/* Credex CTA */}
                    {auditResult.shouldRecommendCredex && (
                        <div className="bg-blue-600 rounded-xl p-5">

                            <h3 className="text-2xl font-bold">
                                High Savings Opportunity
                            </h3>

                            <p className="mt-2">
                                Your stack may qualify for discounted AI infrastructure credits through Credex.
                            </p>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}