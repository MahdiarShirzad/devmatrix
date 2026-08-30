import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: { name: string; href: string }[];
  current: string;
}

export default function Breadcrumb({ items, current }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-text-secondary/50 mb-8 font-medium flex-wrap">
      {items.map((item, index) => (
        <span key={`${item.href}-${index}`} className="flex items-center gap-2">
          <Link
            href={item.href}
            className="hover:text-neutral-text-primary transition-colors"
          >
            {item.name}
          </Link>
          <ChevronRight size={14} />
        </span>
      ))}
      <span className="text-brand-primary">{current}</span>
    </div>
  );
}
