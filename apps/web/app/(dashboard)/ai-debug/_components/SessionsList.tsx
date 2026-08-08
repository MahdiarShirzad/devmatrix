import SessionRow, { Session } from "./SessionRow";

interface SessionsListProps {
  sessions: Session[];
}

export default function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      {sessions.map((session, index) => (
        <SessionRow
          key={session.id}
          session={session}
          isLast={index === sessions.length - 1}
        />
      ))}
    </div>
  );
}
