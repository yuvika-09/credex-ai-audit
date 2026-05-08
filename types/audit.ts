export interface ToolEntry {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditFormData {
  tools: ToolEntry[];
  teamSize: number;
  useCase: string;
}

export interface ToolInput {
    tool: string;
    plan: string;
    monthlySpend: number;
    seats: number;
}

export interface Recommendation {
    tool: string;
    currentPlan: string;
    recommendedPlan: string;
    savings: number;
    reason: string;
}

export interface AuditResult {
    recommendations: Recommendation[];
    totalSavings: number;
    annualSavings: number;
    shouldRecommendCredex: boolean;
}