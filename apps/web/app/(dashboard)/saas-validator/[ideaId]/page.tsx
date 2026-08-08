import BackButton from "./_components/BackButton";
import IdeaHeader from "./_components/IdeaHeader";
import ScoreCard from "./_components/ScoreCard";
import IdeaEditor from "./_components/IdeaEditor";
import AnalysisGrid from "./_components/AnalysisGrid";
import { SECTIONS } from "./_components/mock-data";

export default function ValidatorIdeaPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      <BackButton />

      <IdeaHeader
        title="Async standup bot for remote teams"
        status="Needs Review"
        submittedAgo="5 days ago"
        category="Productivity"
      />

      <ScoreCard
        score={54}
        description="This idea has potential but faces significant retention risks and strong existing competition. Consider pivoting the core value proposition before investing heavy development time."
      />

      <IdeaEditor initialPitch="An async standup bot that collects updates via Slack and summarizes team progress daily using AI, so remote teams can skip live meetings." />

      <AnalysisGrid sections={SECTIONS} />
    </div>
  );
}
