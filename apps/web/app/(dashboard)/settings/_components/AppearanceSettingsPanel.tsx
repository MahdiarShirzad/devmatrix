"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { AVAILABLE_THEMES } from "../theme-config";

const THEME_STORAGE_KEY = "devmatrix-theme";
const FONT_STORAGE_KEY = "devmatrix-font";
const DEFAULT_THEME = "obsidian";

// Font configuration matching layout.tsx
const AVAILABLE_FONTS = [
  { id: "inter", name: "Inter", variable: "--font-inter" },
  { id: "geist", name: "Geist", variable: "--font-geist" },
  { id: "manrope", name: "Manrope", variable: "--font-manrope" },
  {
    id: "plus-jakarta-sans",
    name: "Plus Jakarta Sans",
    variable: "--font-plus-jakarta-sans",
  },
  {
    id: "ibm-plex-sans",
    name: "IBM Plex Sans",
    variable: "--font-ibm-plex-sans",
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    variable: "--font-space-grotesk",
  },
  { id: "dm-sans", name: "DM Sans", variable: "--font-dm-sans" },
  { id: "roboto", name: "Roboto", variable: "--font-roboto" },
] as const;

type FontId = (typeof AVAILABLE_FONTS)[number]["id"];

// Theme subscription
function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): string {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme && AVAILABLE_THEMES.some((t) => t.id === savedTheme)) {
    return savedTheme;
  }
  return DEFAULT_THEME;
}

function getServerThemeSnapshot(): string {
  return DEFAULT_THEME;
}

// Font subscription
function subscribeToFont(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getFontSnapshot(): FontId {
  const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontId | null;
  const validFontIds = AVAILABLE_FONTS.map((f) => f.id);
  if (savedFont && validFontIds.includes(savedFont)) {
    return savedFont;
  }
  return "inter";
}

function getServerFontSnapshot(): FontId {
  return "inter";
}

export default function AppearanceSettingsPanel() {
  // Theme state
  const currentTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  // Font state
  const currentFont = useSyncExternalStore(
    subscribeToFont,
    getFontSnapshot,
    getServerFontSnapshot,
  );

  const handleThemeSelect = (themeId: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    const isLightTheme = themeId === "verdant" || themeId === "alabaster";
    document.documentElement.style.setProperty(
      "color-scheme",
      isLightTheme ? "light" : "dark",
    );
    window.dispatchEvent(new Event("storage"));
  };

  const handleFontSelect = (fontId: FontId) => {
    localStorage.setItem(FONT_STORAGE_KEY, fontId);
    const font = AVAILABLE_FONTS.find((f) => f.id === fontId);
    if (font) {
      document.documentElement.style.setProperty(
        "--font-sans",
        `var(${font.variable})`,
      );
    }
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

      {/* Theme Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-text-primary">Theme</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AVAILABLE_THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const [bg, surface, primary, accent, text] = theme.colors;

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
                <div
                  className="w-full h-32 border-b flex overflow-hidden"
                  style={{ backgroundColor: bg, borderColor: surface }}
                >
                  {/* Mock Sidebar */}
                  <div
                    className="w-1/4 h-full border-r flex flex-col p-2 gap-2"
                    style={{ backgroundColor: surface, borderColor: surface }}
                  >
                    <div
                      className="w-full h-2 rounded opacity-80"
                      style={{ backgroundColor: primary }}
                    ></div>
                    <div
                      className="w-2/3 h-2 rounded opacity-30"
                      style={{ backgroundColor: text }}
                    ></div>
                    <div
                      className="w-3/4 h-2 rounded opacity-30"
                      style={{ backgroundColor: text }}
                    ></div>
                  </div>
                  {/* Mock Editor */}
                  <div className="flex-1 flex flex-col p-3 gap-3">
                    <div
                      className="flex items-center gap-2 border-b pb-2"
                      style={{ borderColor: surface }}
                    >
                      <div
                        className="w-12 h-1.5 rounded opacity-80"
                        style={{ backgroundColor: accent }}
                      ></div>
                      <div
                        className="w-8 h-1.5 rounded opacity-30"
                        style={{ backgroundColor: text }}
                      ></div>
                    </div>
                    <div className="space-y-2 mt-1">
                      <div
                        className="w-3/4 h-1.5 rounded"
                        style={{ backgroundColor: primary }}
                      ></div>
                      <div
                        className="w-1/2 h-1.5 rounded ml-4"
                        style={{ backgroundColor: accent }}
                      ></div>
                      <div
                        className="w-2/3 h-1.5 rounded ml-4"
                        style={{ backgroundColor: primary }}
                      ></div>
                      <div
                        className="w-1/3 h-1.5 rounded opacity-60"
                        style={{ backgroundColor: text }}
                      ></div>
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

      {/* Font Section */}
      <div className="space-y-4 pt-4 border-t border-neutral-border">
        <div>
          <h3 className="text-sm font-medium text-neutral-text-primary">
            Font
          </h3>
          <p className="text-xs text-neutral-text-secondary mt-0.5">
            Choose the font used throughout the DevMatrix interface.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AVAILABLE_FONTS.map((font) => {
            const isSelected = currentFont === font.id;
            return (
              <button
                key={font.id}
                onClick={() => handleFontSelect(font.id)}
                className={`group flex flex-col text-left rounded-xl border bg-neutral-surface-1 transition-all duration-200 p-4 ${
                  isSelected
                    ? "border-brand-primary ring-1 ring-brand-primary shadow-lg shadow-brand-primary/10"
                    : "border-neutral-border hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-2"
                }`}
                style={{
                  fontFamily: `var(${font.variable})`,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? "text-brand-primary"
                        : "text-neutral-text-primary"
                    }`}
                  >
                    {font.name}
                  </span>
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
                <div className="mt-3 space-y-1">
                  <p className="text-base font-medium text-neutral-text-primary">
                    Build better software.
                  </p>
                  <p className="text-xs text-neutral-text-secondary">
                    Aa Bb Cc 123
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
