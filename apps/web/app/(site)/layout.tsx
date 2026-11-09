import type { ReactNode } from "react";
import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";

/**
 * Shell for standalone marketing and legal pages (terms, privacy, about, …).
 * Uses the same public header and footer as the landing page so navigation
 * stays consistent outside the dashboard.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-bg font-sans text-neutral-text-primary selection:bg-brand-primary/30 selection:text-button-text">
      <Header />
      <main className="pt-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
