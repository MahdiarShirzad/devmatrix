import BackToAnalyticsLink from "./_components/BackToAnalyticsLink";
import ProjectHeaderBar from "./_components/ProjectHeaderBar";
import StatsGrid from "./_components/StatsGrid";
import CommitsLineChart from "./_components/CommitsLineChart";
import ActivityHeatmap from "./_components/ActivityHeatmap";
import ContributorsTable, {
  Contributor,
} from "./_components/ContributorsTable";

const COMMIT_DATA = [
  { day: "Mon", commits: 4 },
  { day: "Tue", commits: 7 },
  { day: "Wed", commits: 3 },
  { day: "Thu", commits: 9 },
  { day: "Fri", commits: 5 },
  { day: "Sat", commits: 1 },
  { day: "Sun", commits: 2 },
];

const CONTRIBUTORS: Contributor[] = [
  {
    name: "Mahdyar Shirzad",
    role: "Lead Developer",
    commits: 24,
    prsMerged: 6,
    linesChanged: 1840,
  },
  {
    name: "Sara Kazemi",
    role: "Frontend Dev",
    commits: 15,
    prsMerged: 4,
    linesChanged: 920,
  },
  {
    name: "Amir Rostami",
    role: "Backend Dev",
    commits: 9,
    prsMerged: 2,
    linesChanged: 410,
  },
];

// 24x7 grid for a more realistic GitHub-style heatmap (approx 6 months)
const HEATMAP = Array.from({ length: 24 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
);

export default function AnalyticsProjectPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      <BackToAnalyticsLink />

      <ProjectHeaderBar />

      <StatsGrid />

      {/* بخش چارت‌ها (گرید دوتایی) */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* نمودار خطی */}
        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <h2 className="mb-6 text-sm font-semibold text-neutral-text-primary">
            Commits Over Time (This Week)
          </h2>
          <CommitsLineChart data={COMMIT_DATA} />
        </div>

        {/* هیت‌مپ فعالیت */}
        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm overflow-x-auto">
          <h2 className="mb-6 text-sm font-semibold text-neutral-text-primary">
            Activity Heatmap
          </h2>
          <ActivityHeatmap data={HEATMAP} />
        </div>
      </div>

      <ContributorsTable contributors={CONTRIBUTORS} />
    </div>
  );
}
