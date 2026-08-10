import SessionRow from "./SessionRow";
import { DebugSession } from "@/types/aiDebug.types";

interface SessionsListProps {
  sessions: DebugSession[];
}

export default function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      {sessions.map((session, index) => (
        <SessionRow
          key={session._id}
          session={session}
          isLast={index === sessions.length - 1}
        />
      ))}
    </div>
  );
}
