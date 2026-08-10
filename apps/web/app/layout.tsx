import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
      <body className="flex min-h-full flex-col bg-neutral-bg text-neutral-text-primary">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
