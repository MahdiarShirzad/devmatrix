import IdeaCard from "./IdeaCard";
import type { Idea } from "@/types/ideaValidator.types";

interface IdeasGridProps {
  ideas: Idea[];
}

export default function IdeasGrid({ ideas }: IdeasGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea._id} idea={idea} />
      ))}
    </div>
  );
}
