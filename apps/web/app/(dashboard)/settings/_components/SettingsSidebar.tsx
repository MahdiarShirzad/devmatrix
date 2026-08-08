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
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
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
                        ? "bg-purple-500/10 text-purple-400"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-purple-400" : "text-slate-500"}
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
