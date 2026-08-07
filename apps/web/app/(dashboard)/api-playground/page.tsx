import Link from "next/link";
import { Plus, Folder } from "lucide-react";

const COLLECTIONS = [
  {
    id: "coll_1",
    name: "Payments",
    requestCount: 8,
    lastUsed: "2h ago",
  },
  {
    id: "coll_2",
    name: "Auth",
    requestCount: 5,
    lastUsed: "1d ago",
  },
  {
    id: "coll_3",
    name: "Analytics API",
    requestCount: 12,
    lastUsed: "4d ago",
  },
];

export default function ApiPlaygroundPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-neutral-text-primary">
            API playground
          </h1>
          <p className="mt-1 text-sm text-neutral-text-secondary">
            Send requests and inspect responses, organized by collection.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-brand-highlight px-4 py-2 text-sm font-medium text-neutral-bg transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          New collection
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.id}
            href={`/api-playground/${collection.id}`}
            className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-brand-primary"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand-primary/10 p-2 text-brand-primary">
                <Folder size={16} strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-medium text-neutral-text-primary">
                {collection.name}
              </h3>
            </div>
            <p className="mt-3 text-xs text-neutral-text-secondary">
              {collection.requestCount} requests · used {collection.lastUsed}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
