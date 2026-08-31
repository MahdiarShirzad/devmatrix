import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Geist,
  Manrope,
  Plus_Jakarta_Sans,
  IBM_Plex_Sans,
  Space_Grotesk,
  DM_Sans,
  Roboto,
} from "next/font/google";
import Script from "next/script";
import QueryProvider from "./_components/providers/QueryProvider";
import "./globals.css";

// Font definitions
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevMatrix | Developer Productivity Suite",
  description:
    "A centralized platform for developers to manage, analyze, and debug projects.",
  icons: {
    icon: "/logo.png",
  },
};

// Font configuration
const AVAILABLE_FONTS = [
  "inter",
  "geist",
  "manrope",
  "plus-jakarta-sans",
  "ibm-plex-sans",
  "space-grotesk",
  "dm-sans",
  "roboto",
] as const;

type FontId = (typeof AVAILABLE_FONTS)[number];

const FONT_VARIABLE_MAP: Record<FontId, string> = {
  inter: "--font-inter",
  geist: "--font-geist",
  manrope: "--font-manrope",
  "plus-jakarta-sans": "--font-plus-jakarta-sans",
  "ibm-plex-sans": "--font-ibm-plex-sans",
  "space-grotesk": "--font-space-grotesk",
  "dm-sans": "--font-dm-sans",
  roboto: "--font-roboto",
};

const DEFAULT_FONT: FontId = "inter";

// Theme initialization script
const themeInitScript = `
(function() {
  const key = 'devmatrix-theme';
  const validThemes = ['obsidian','deep-blue','terminal','arctic','amethyst','verdant','monochrome','alabaster'];
  const defaultTheme = 'obsidian';
  let theme = defaultTheme;
  try {
    const saved = localStorage.getItem(key);
    if (saved && validThemes.includes(saved)) {
      theme = saved;
    }
  } catch(e) {}
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = (theme === 'verdant' || theme === 'alabaster') ? 'light' : 'dark';
})();
`;

// Font initialization script
const fontInitScript = `
(function() {
  const key = 'devmatrix-font';
  const validFonts = ${JSON.stringify(AVAILABLE_FONTS)};
  const defaultFont = '${DEFAULT_FONT}';
  const fontVariableMap = ${JSON.stringify(FONT_VARIABLE_MAP)};
  
  let selectedFont = defaultFont;
  try {
    const saved = localStorage.getItem(key);
    if (saved && validFonts.includes(saved)) {
      selectedFont = saved;
    }
  } catch(e) {}
  
  const fontVariable = fontVariableMap[selectedFont];
  if (fontVariable) {
    document.documentElement.style.setProperty('--font-sans', 'var(' + fontVariable + ')');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${manrope.variable} ${plusJakartaSans.variable} ${ibmPlexSans.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${roboto.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {/* Font initialization */}
        <Script
          id="font-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: fontInitScript }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-bg text-neutral-text-primary">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
