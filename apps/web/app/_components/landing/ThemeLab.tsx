"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { AVAILABLE_THEMES } from "@/app/(dashboard)/settings/theme-config";

/* Mirrors the font registry in app/layout.tsx. */
const AVAILABLE_FONTS = [
  { id: "inter", name: "Inter", variable: "--font-inter" },
  { id: "geist", name: "Geist", variable: "--font-geist" },
  { id: "manrope", name: "Manrope", variable: "--font-manrope" },
  { id: "plus-jakarta-sans", name: "Plus Jakarta Sans", variable: "--font-plus-jakarta-sans" },
  { id: "ibm-plex-sans", name: "IBM Plex Sans", variable: "--font-ibm-plex-sans" },
  { id: "space-grotesk", name: "Space Grotesk", variable: "--font-space-grotesk" },
  { id: "dm-sans", name: "DM Sans", variable: "--font-dm-sans" },
  { id: "roboto", name: "Roboto", variable: "--font-roboto" },
] as const;

type FontId = (typeof AVAILABLE_FONTS)[number]["id"];

const THEME_KEY = "devmatrix-theme";
const FONT_KEY = "devmatrix-font";
const LIGHT_THEMES = new Set(["verdant", "alabaster"]);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): string {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved && AVAILABLE_THEMES.some((t) => t.id === saved)) return saved;
  return "obsidian";
}

function getServerThemeSnapshot(): string {
  return "obsidian";
}

function getFontSnapshot(): FontId {
  const saved = localStorage.getItem(FONT_KEY) as FontId | null;
  if (saved && AVAILABLE_FONTS.some((f) => f.id === saved)) return saved;
  return "inter";
}

function getServerFontSnapshot(): FontId {
  return "inter";
}

/**
 * Live demo of the product's appearance system: the same design tokens,
 * storage keys, and font variables the app uses in Settings → Appearance.
 */
export default function ThemeLab() {
  const currentTheme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const currentFont = useSyncExternalStore(subscribe, getFontSnapshot, getServerFontSnapshot);

  const selectTheme = (themeId: string) => {
    localStorage.setItem(THEME_KEY, themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    document.documentElement.style.setProperty(
      "color-scheme",
      LIGHT_THEMES.has(themeId) ? "light" : "dark",
    );
    window.dispatchEvent(new Event("storage"));
  };

  const selectFont = (fontId: FontId) => {
    localStorage.setItem(FONT_KEY, fontId);
    const font = AVAILABLE_FONTS.find((f) => f.id === fontId);
    if (font) {
      document.documentElement.style.setProperty("--font-sans", `var(${font.variable})`);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <section id="appearance" className="scroll-mt-20 border-b border-neutral-border">
      <div className="dm-shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="dm-mono-label text-neutral-text-secondary">appearance</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] text-neutral-text-primary md:text-[2.35rem]">
              The interface is part of the developer experience.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-text-secondary">
              Eight themes and eight typefaces, driven by one set of design
              tokens. You are wearing that system right now — this page runs on
              the same variables as the app.
            </p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-neutral-text-secondary/80">
              selections persist to your workspace · settings → appearance
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-baseline justify-between border-b border-neutral-border pb-3">
              <span className="dm-mono-label text-neutral-text-secondary">theme</span>
              <span className="font-mono text-[11px] text-neutral-text-secondary/70">
                {AVAILABLE_THEMES.length} available
              </span>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {AVAILABLE_THEMES.map((theme) => {
                const [bg, surface, primary, accent] = theme.colors;
                const selected = currentTheme === theme.id;
                return (
                  <li key={theme.id}>
                    <button
                      type="button"
                      onClick={() => selectTheme(theme.id)}
                      aria-pressed={selected}
                      className={`group w-full overflow-hidden rounded-md border text-left transition-colors ${
                        selected
                          ? "border-brand-primary ring-1 ring-brand-primary"
                          : "border-neutral-border hover:border-neutral-text-secondary/50"
                      }`}
                    >
                      <span className="flex h-14 w-full" style={{ backgroundColor: bg }}>
                        <span
                          className="h-full w-1/3 border-r border-white/5"
                          style={{ backgroundColor: surface }}
                        />
                        <span className="flex flex-1 flex-col justify-center gap-1 p-2">
                          <span
                            className="block h-1.5 w-3/4 rounded-full"
                            style={{ backgroundColor: primary }}
                          />
                          <span
                            className="block h-1.5 w-1/2 rounded-full opacity-60"
                            style={{ backgroundColor: accent }}
                          />
                        </span>
                      </span>
                      <span className="flex items-center justify-between gap-1 px-2.5 py-2">
                        <span className="truncate text-[12px] font-medium text-neutral-text-primary">
                          {theme.name}
                        </span>
                        {selected && (
                          <Check size={13} className="shrink-0 text-brand-primary" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex items-baseline justify-between border-b border-neutral-border pb-3">
              <span className="dm-mono-label text-neutral-text-secondary">typeface</span>
              <span className="font-mono text-[11px] text-neutral-text-secondary/70">
                {AVAILABLE_FONTS.length} available
              </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {AVAILABLE_FONTS.map((font) => {
                const selected = currentFont === font.id;
                return (
                  <li key={font.id}>
                    <button
                      type="button"
                      onClick={() => selectFont(font.id)}
                      aria-pressed={selected}
                      style={{ fontFamily: `var(${font.variable})` }}
                      className={`rounded-md border px-3.5 py-2 text-[13px] transition-colors ${
                        selected
                          ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                          : "border-neutral-border text-neutral-text-secondary hover:border-neutral-text-secondary/50 hover:text-neutral-text-primary"
                      }`}
                    >
                      {font.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
