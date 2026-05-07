"use client";

import { useState, useEffect } from "react";

export default function SpendForm() {
    const [tools, setTools] = useState([
        {
            tool: "Cursor",
            plan: "Pro",
            monthlySpend: 20,
            seats: 1,
        },
    ]);

    const [teamSize, setTeamSize] = useState(1);
    const [useCase, setUseCase] = useState("coding");

    useEffect(() => {
        const saved = localStorage.getItem("audit-form");

        if (saved) {
            const parsed = JSON.parse(saved);

            setTeamSize(parsed.teamSize || 1);
            setUseCase(parsed.useCase || "coding");

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
            <div>
                <label className="block mb-2 font-medium">
                    Team Size
                </label>

                <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Primary Use Case
                </label>

                <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                >
                    <option value="coding">Coding</option>
                    <option value="writing">Writing</option>
                    <option value="research">Research</option>
                    <option value="data">Data</option>
                    <option value="mixed">Mixed</option>
                </select>
            </div>

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
                                updated[index].tool = e.target.value;
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
                                updated[index].plan = e.target.value;
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
                                updated[index].monthlySpend = Number(e.target.value);
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
                                updated[index].seats = Number(e.target.value);
                                setTools(updated);
                            }}
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white"
                            placeholder="Seats"
                        />

                    </div>
                ))}
            </div>
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
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
            >
                Generate Audit
            </button>
        </div>
    );
}