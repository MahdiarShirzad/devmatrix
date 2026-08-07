"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bug,
  BarChart3,
  Terminal,
  Rocket,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-debug", label: "AI debugging", icon: Bug },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/api-playground", label: "API playground", icon: Terminal },
  { href: "/saas-validator", label: "Idea validator", icon: Rocket },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-border bg-neutral-surface-1 md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-neutral-border px-4">
        <Image src="/logo.png" alt="DevMatrix" width={24} height={24} />
        <span className="text-sm font-medium text-neutral-text-primary">
          DevMatrix
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-transparent text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
