import Link from "next/link";
import { Plus, Bug, Clock } from "lucide-react";

const SESSIONS = [
  {
    id: "sess_1",
    title: "Null pointer in auth middleware",
    language: "TypeScript",
    status: "resolved",
    time: "2h ago",
  },
  {
    id: "sess_2",
    title: "Infinite loop in pagination hook",
    language: "React",
    status: "in progress",
    time: "1d ago",
  },
  {
    id: "sess_3",
    title: "Race condition on session refresh",
    language: "Node.js",
    status: "resolved",
    time: "3d ago",
  },
];

export default function AiDebugPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-neutral-text-primary">
            AI debugging assistant
          </h1>
          <p className="mt-1 text-sm text-neutral-text-secondary">
            Paste code, describe the issue, and get an explained fix.
          </p>
        </div>
        <Link
          href="/ai-debug/new"
          className="flex items-center gap-2 rounded-lg bg-brand-highlight px-4 py-2 text-sm font-medium text-neutral-bg transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          New session
        </Link>
      </div>

      <div className="divide-y divide-neutral-border rounded-xl border border-neutral-border bg-neutral-surface-1">
        {SESSIONS.map((session) => (
          <Link
            key={session.id}
            href={`/ai-debug/${session.id}`}
            className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-neutral-surface-2"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-primary/10 p-2 text-brand-primary">
                <Bug size={16} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm text-neutral-text-primary">
                  {session.title}
                </p>
                <p className="text-xs text-neutral-text-secondary">
                  {session.language}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-2.5 py-1 text-xs ${
                  session.status === "resolved"
                    ? "bg-success-bg text-success"
                    : "bg-warning-bg text-warning"
                }`}
              >
                {session.status}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-text-secondary">
                <Clock size={12} />
                {session.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
