import Link from "next/link";
import { Folder } from "lucide-react";
import CollectionMenu from "./CollectionMenu";

export interface Collection {
  id: string;
  name: string;
  requestCount: number;
  lastUsed: string;
  env: string;
  envColor: string;
}

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 transition-colors hover:border-neutral-text-secondary/30 hover:bg-neutral-surface-2/40">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-surface-2 text-neutral-text-secondary transition-colors group-hover:text-brand-primary">
            <Folder size={16} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <Link
              href={`/api-playground/${collection.id}`}
              className="block truncate text-sm font-semibold text-neutral-text-primary before:absolute before:inset-0 focus:outline-none"
              title={collection.name}
            >
              {collection.name}
            </Link>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-text-secondary">
              <span>
                {collection.requestCount}{" "}
                {collection.requestCount === 1 ? "request" : "requests"}
              </span>
              <span className="text-neutral-border">•</span>
              <span>Updated {collection.lastUsed}</span>
            </div>
          </div>
        </div>

        <CollectionMenu collectionId={collection.id} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-border pt-3">
        <span
          className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${collection.envColor}`}
        >
          {collection.env}
        </span>
      </div>
    </div>
  );
}
