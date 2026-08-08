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
  ChevronsUpDown,
  Settings,
  Plus,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/api-playground", label: "API Playground", icon: Terminal },
  { href: "/ai-debug", label: "AI Debugging", icon: Bug },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/saas-validator", label: "Idea Validator", icon: Rocket },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-neutral-border bg-neutral-surface-1 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      {/* هدر سایدبار - لوگو */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-border px-5">
        <Image
          src="/logo.png"
          alt="DevMatrix"
          width={24}
          height={24}
          className="rounded"
        />
        <span className="font-mono text-sm font-bold tracking-tight text-neutral-text-primary">
          DevMatrix
        </span>
      </div>

      {/* انتخابگر پروژه (Project Switcher) */}
      <div className="px-3 pt-4 pb-2">
        <button className="flex w-full items-center justify-between rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2 text-left transition-colors hover:border-brand-primary/50 hover:bg-neutral-surface-2/80">
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-text-secondary">
              Current Project
            </span>
            <span className="truncate text-sm font-semibold text-neutral-text-primary">
              my-trip
            </span>
          </div>
          <ChevronsUpDown size={16} className="text-neutral-text-secondary" />
        </button>
      </div>

      {/* منوی اصلی */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)} // بستن منو در موبایل بعد از کلیک
              className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.75}
                className={
                  isActive
                    ? "text-brand-primary"
                    : "text-neutral-text-secondary group-hover:text-neutral-text-primary"
                }
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* فوتر سایدبار - تنظیمات */}
      <div className="mt-auto border-t border-neutral-border p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
        >
          <Settings size={18} strokeWidth={1.75} />
          Project Settings
        </Link>
      </div>
    </aside>
  );
}
