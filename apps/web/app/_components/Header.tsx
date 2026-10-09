"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";

import { useMe } from "@/hooks/useMe";
import { useLogout } from "@/hooks/useAuth";

const NAV_LINKS = [
  { label: "Modules", href: "#modules" },
  { label: "Docs", href: "/docs/introduction" },
  { label: "GitHub", href: "https://github.com/MahdiarShirzad/devmatrix" },
];

const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  const { data: user, isLoading } = useMe();
  const logoutMutation = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const lightThemes = ["alabaster", "verdant"];
      setIsLightTheme(lightThemes.includes(theme || ""));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "border-b border-neutral-border bg-neutral-bg/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="dm-shell">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="shrink-0" aria-label="DevMatrix home">
            <Image
              src={isLightTheme ? "/logo-dark.png" : "/logo2.png"}
              alt="DevMatrix"
              width={132}
              height={48}
              priority
              className="h-auto w-[118px] sm:w-[132px]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("http") ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isLoading ? (
              <div className="h-8 w-28 animate-pulse rounded-md bg-neutral-surface-2" aria-hidden />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-border px-3.5 py-2 text-[13px] font-medium text-neutral-text-secondary transition-colors hover:border-neutral-text-secondary/50 hover:text-neutral-text-primary disabled:opacity-60"
                >
                  <LogOut size={14} />
                  {logoutMutation.isPending ? "Logging out…" : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-[13px] font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-brand-primary px-4 py-2 text-[13px] font-semibold text-button-text transition-colors hover:bg-brand-primary/90"
                >
                  Start a project
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile panel — solid surface, no glass */}
      <div
        className={`overflow-hidden border-b border-neutral-border bg-neutral-bg transition-[max-height,opacity] duration-300 md:hidden ${
          isMobileMenuOpen
            ? "max-h-[420px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="dm-shell flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("http") ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}

          <div className="my-2 h-px w-full bg-neutral-border" />

          {isLoading ? (
            <div className="mx-3 h-10 animate-pulse rounded-md bg-neutral-surface-2" aria-hidden />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-md border border-neutral-border px-3 py-2.5 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-error disabled:opacity-60"
              >
                <LogOut size={16} />
                {logoutMutation.isPending ? "Logging out…" : "Log out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="mt-1 flex w-full items-center justify-center rounded-md bg-brand-primary px-3 py-2.5 text-sm font-semibold text-button-text transition-colors hover:bg-brand-primary/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a project
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
