"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { AVAILABLE_THEMES } from "../theme-config";

const THEME_STORAGE_KEY = "devmatrix-theme";
const DEFAULT_THEME = "obsidian";

// 1. Subscribe function to listen for storage updates across tabs/windows
function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// 2. Client snapshot reader from localStorage
function getThemeSnapshot(): string {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && AVAILABLE_THEMES.some((t) => t.id === savedTheme)) {
    return savedTheme;
  }
  return DEFAULT_THEME;
}

// 3. Server snapshot for SSR initial pass
function getServerThemeSnapshot(): string {
  return DEFAULT_THEME;
}

export default function AppearanceSettingsPanel() {
  // Sync state directly with localStorage safely during render
  const currentTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const handleThemeSelect = (themeId: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    document.documentElement.setAttribute("data-theme", themeId);

    const isLightTheme = themeId === "verdant" || themeId === "alabaster";
    document.documentElement.style.setProperty(
      "color-scheme",
      isLightTheme ? "light" : "dark",
    );

    // Trigger a window storage event so useSyncExternalStore updates locally immediately
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-semibold text-neutral-text-primary mb-1">
          Appearance
        </h2>
        <p className="text-sm text-neutral-text-secondary">
          Customize the look and feel of your DevMatrix workspace.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-text-primary">Theme</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AVAILABLE_THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`group flex flex-col text-left rounded-xl border bg-neutral-surface-1 transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "border-brand-primary ring-1 ring-brand-primary shadow-lg shadow-brand-primary/10"
                    : "border-neutral-border hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-2"
                }`}
              >
                {/* IDE Mockup Preview */}
                <div
                  className={`theme-preview-${theme.id} w-full h-32 bg-brand-bg border-b border-neutral-border flex overflow-hidden`}
                >
                  {/* Mock Sidebar */}
                  <div className="w-1/4 h-full bg-neutral-surface-1 border-r border-neutral-border flex flex-col p-2 gap-2">
                    <div className="w-full h-2 rounded bg-brand-primary/80"></div>
                    <div className="w-2/3 h-2 rounded bg-neutral-text-secondary/30"></div>
                    <div className="w-3/4 h-2 rounded bg-neutral-text-secondary/30"></div>
                  </div>
                  {/* Mock Editor */}
                  <div className="flex-1 flex flex-col p-3 gap-3">
                    <div className="flex items-center gap-2 border-b border-neutral-border pb-2">
                      <div className="w-12 h-1.5 rounded bg-brand-accent/80"></div>
                      <div className="w-8 h-1.5 rounded bg-neutral-text-secondary/30"></div>
                    </div>
                    <div className="space-y-2 mt-1">
                      <div className="w-3/4 h-1.5 rounded bg-brand-primary"></div>
                      <div className="w-1/2 h-1.5 rounded bg-brand-highlight ml-4"></div>
                      <div className="w-2/3 h-1.5 rounded bg-brand-accent ml-4"></div>
                      <div className="w-1/3 h-1.5 rounded bg-neutral-text-secondary/60"></div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 flex items-center justify-between w-full">
                  <div>
                    <span
                      className={`block text-sm font-medium ${
                        isSelected
                          ? "text-brand-primary"
                          : "text-neutral-text-primary"
                      }`}
                    >
                      {theme.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-2">
                      {theme.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                      isSelected
                        ? "bg-brand-primary text-brand-bg"
                        : "bg-neutral-border text-transparent group-hover:bg-neutral-surface-2"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
