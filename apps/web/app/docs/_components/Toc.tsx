import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Toc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <aside className="hidden xl:block w-56 shrink-0 py-10">
      <div className="sticky top-28">
        <h4 className="font-semibold text-neutral-text-primary text-xs uppercase tracking-wider mb-4">
          On this page
        </h4>
        <ul className="space-y-3 text-sm">
          {items.map((item, idx) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={
                  idx === 0
                    ? "text-brand-primary font-medium transition-colors hover:text-brand-primary/80"
                    : "text-neutral-text-secondary/70 transition-colors hover:text-neutral-text-primary"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-8 border-t border-neutral-border space-y-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-xs text-neutral-text-secondary/60 hover:text-neutral-text-primary transition-colors"
          >
            <AlertTriangle size={14} /> Report an issue
          </Link>
        </div>
      </div>
    </aside>
  );
}
