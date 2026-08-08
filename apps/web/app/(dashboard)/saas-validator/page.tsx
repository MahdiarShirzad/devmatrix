import ValidatorHeader from "./_components/ValidatorHeader";
import OverviewStats from "./_components/OverviewStats";
import IdeaSearchToolbar from "./_components/IdeaSearchToolbar";
import IdeasGrid from "./_components/IdeasGrid";
import { Idea } from "./_components/IdeaCard";

// داده‌های غنی‌تر برای نمایش بهتر UI
const IDEAS: Idea[] = [
  {
    id: "idea_1",
    title: "AI-powered changelog generator",
    description:
      "Automatically generate release notes from git commits using LLMs.",
    category: "DevTools",
    score: 78,
    status: "validated",
    time: "2d ago",
  },
  {
    id: "idea_2",
    title: "Async standup bot for remote teams",
    description:
      "Slack integration to replace daily syncs with smart async updates.",
    category: "Productivity",
    score: 54,
    status: "needs review",
    time: "5d ago",
  },
  {
    id: "idea_3",
    title: "Invoice reconciliation for freelancers",
    description:
      "Connect bank accounts to match incoming payments with sent invoices.",
    category: "Fintech",
    score: 31,
    status: "high risk",
    time: "1w ago",
  },
];

export default function SaasValidatorPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      <ValidatorHeader />
      <OverviewStats />
      <IdeaSearchToolbar />
      <IdeasGrid ideas={IDEAS} />
    </div>
  );
}
