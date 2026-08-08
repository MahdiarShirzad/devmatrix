import AnalysisSection from "./AnalysisSection";
import type { AnalysisSectionData } from "./analysis-types";

interface AnalysisGridProps {
  sections: AnalysisSectionData[];
}

export default function AnalysisGrid({ sections }: AnalysisGridProps) {
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
