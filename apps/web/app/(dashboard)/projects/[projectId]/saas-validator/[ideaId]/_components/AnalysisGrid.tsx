import { TrendingUp, Swords, ShieldAlert } from "lucide-react";
import AnalysisSection from "./AnalysisSection";
import type { Idea } from "@/types/ideaValidator.types";

interface AnalysisGridProps {
  idea: Idea;
}

export default function AnalysisGrid({ idea }: AnalysisGridProps) {
  const sections = [
    {
      title: "Market Fit",
      icon: TrendingUp,
      score: idea.marketFitScore ?? 0,
      summary: idea.marketFitSummary ?? "No data available yet.",
    },
    {
      title: "Competition",
      icon: Swords,
      score: idea.competitionScore ?? 0,
      summary: idea.competitionSummary ?? "No data available yet.",
    },
    {
      title: "Risk",
      icon: ShieldAlert,
      score: idea.riskScore ?? 0,
      summary: idea.riskSummary ?? "No data available yet.",
    },
  ];

  return (
    <>
      <h3 className="mb-4 text-sm font-semibold text-neutral-text-primary">
        Detailed Analysis
      </h3>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {sections.map((section) => (
          <AnalysisSection key={section.title} {...section} />
        ))}
      </div>
    </>
  );
}
