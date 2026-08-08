import AiDebugHeader from "./_components/AiDebugHeader";
import SessionSearchToolbar from "./_components/SessionSearchToolbar";
import SessionsList from "./_components/SessionsList";
import { Session } from "./_components/SessionRow";

const SESSIONS: Session[] = [
  {
    id: "sess_1",
    title: "TypeScript casing compile error in GitHub OAuth",
    project: "devmatrix",
    language: "TypeScript",
    status: "resolved",
    time: "Just now",
  },
  {
    id: "sess_2",
    title: "MongoDB connection timeout in flight search API",
    project: "my-trip-full",
    language: "Node.js",
    status: "in progress",
    time: "2h ago",
  },
  {
    id: "sess_3",
    title: "Unhandled Promise Rejection in Express error middleware",
    project: "deep-coding-backend",
    language: "Express",
    status: "resolved",
    time: "1d ago",
  },
];

export default function AiDebugPage() {
  return (
    <div className="flex h-full flex-col">
      <AiDebugHeader />
      <SessionSearchToolbar sessionCount={SESSIONS.length} />
      <SessionsList sessions={SESSIONS} />
    </div>
  );
}
