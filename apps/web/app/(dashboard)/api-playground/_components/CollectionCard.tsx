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
    <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
            <Folder size={20} strokeWidth={2} />
          </div>
          <div>
            <Link
              href={`/api-playground/${collection.id}`}
              className="text-base font-semibold text-neutral-text-primary before:absolute before:inset-0 focus:outline-none"
            >
              {collection.name}
            </Link>
            <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-neutral-text-secondary">
              <span>{collection.requestCount} requests</span>
              <span>•</span>
              <span>{collection.lastUsed}</span>
            </div>
          </div>
        </div>

        <CollectionMenu collectionId={collection.id} />
      </div>

      <div className="mt-5 flex items-center border-t border-neutral-border pt-4">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${collection.envColor}`}
        >
          {collection.env}
        </span>
      </div>
    </div>
  );
}
