import { describe, it, expect } from "vitest";

import { generateAudit } from "../lib/auditEngine";

describe("Audit Engine", () => {

    it("downgrades ChatGPT Team for small teams", () => {

        const result = generateAudit([
            {
                tool: "ChatGPT",
                plan: "Team",
                monthlySpend: 60,
                seats: 2,
            },
        ]);

        expect(
            result.recommendations[0]
                .recommendedPlan
        ).toBe("Plus");
    });

    it("downgrades Cursor Business for small teams", () => {

        const result = generateAudit([
            {
                tool: "Cursor",
                plan: "Business",
                monthlySpend: 80,
                seats: 2,
            },
        ]);

        expect(
            result.recommendations[0]
                .recommendedPlan
        ).toBe("Pro");
    });

    it("calculates annual savings correctly", () => {

        const result = generateAudit([
            {
                tool: "Cursor",
                plan: "Business",
                monthlySpend: 80,
                seats: 2,
            },
        ]);

        expect(result.annualSavings)
            .toBe(result.totalSavings * 12);
    });

    it("recommends Credex for large savings", () => {

        const result = generateAudit([
            {
                tool: "Cursor",
                plan: "Business",
                monthlySpend: 1000,
                seats: 2,
            },
        ]);

        expect(
            result.shouldRecommendCredex
        ).toBe(true);
    });

    it("returns zero savings for optimal plans", () => {

        const result = generateAudit([
            {
                tool: "ChatGPT",
                plan: "Plus",
                monthlySpend: 20,
                seats: 1,
            },
        ]);

        expect(result.totalSavings)
            .toBe(0);
    });
});