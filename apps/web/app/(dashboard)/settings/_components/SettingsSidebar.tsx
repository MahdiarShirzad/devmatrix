"use client";

import { SIDEBAR_GROUPS } from "./sidebar-config";

interface SettingsSidebarProps {
  activeTab: string;
  isMobileMenuOpen: boolean;
  onSelectTab: (id: string) => void;
}

export default function SettingsSidebar({
  activeTab,
  isMobileMenuOpen,
  onSelectTab,
}: SettingsSidebarProps) {
  return (
    <aside
      className={`md:w-64 shrink-0 md:block ${
        isMobileMenuOpen ? "block mb-8" : "hidden"
      }`}
    >
      <div className="sticky top-8 space-y-8">
        {SIDEBAR_GROUPS.map((group, idx) => (
          <div key={idx}>
            {/* Replaced hardcoded #e5e5e5/40 */}
            <h4 className="text-xs font-semibold text-neutral-text-secondary/50 uppercase tracking-wider mb-3 px-3">
              {group.label}
            </h4>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={
                        isActive
                          ? "text-brand-primary"
                          : "text-neutral-text-secondary/60"
                      }
                      {...(item.iconProps || {})}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
