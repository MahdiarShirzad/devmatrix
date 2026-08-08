import IdeaCard, { Idea } from "./IdeaCard";

interface IdeasGridProps {
  ideas: Idea[];
}

export default function IdeasGrid({ ideas }: IdeasGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
