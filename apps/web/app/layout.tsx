import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import QueryProvider from "./_components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Use Script component to avoid React warning */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-bg text-neutral-text-primary">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
