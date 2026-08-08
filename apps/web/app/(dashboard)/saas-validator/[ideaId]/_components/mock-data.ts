import { Target, Swords, ShieldAlert } from "lucide-react";
import type { AnalysisSectionData } from "./analysis-types";

export const SECTIONS: AnalysisSectionData[] = [
  {
    title: "Market fit",
    icon: Target,
    score: 82,
    summary:
      "Strong demand signal among small dev teams already paying for similar async tools. Clear willingness to pay in the $10-30/mo range.",
  },
  {
    title: "Competition",
    icon: Swords,
    score: 61,
    summary:
      "A few established players (Geekbot, Standuply) cover the core use case. Differentiation would need to come from AI summarization depth.",
  },
  {
    title: "Risk",
    icon: ShieldAlert,
    score: 45,
    summary:
      "Retention risk is high for standup-style tools once a team's engagement habits change. Consider anchoring to a broader workflow.",
  },
];
