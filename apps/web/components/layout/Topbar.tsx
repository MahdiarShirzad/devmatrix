"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  Folder,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useMe } from "@/hooks/useMe";
import { useLogout } from "@/hooks/useAuth";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { data: user } = useMe();
  const logout = useLogout();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const closeAllDropdowns = () => {
    setIsProfileOpen(false);
    setIsNotifOpen(false);
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  const handleNavigation = (href: string) => {
    closeAllDropdowns();
    setIsSearchActive(false);
    router.push(href);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchActive(true);

        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }

      if (e.key === "Escape") {
        setIsSearchActive(false);
        setIsProfileOpen(false);
        setIsNotifOpen(false);
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotifOpen(false);
      }

      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-border bg-neutral-bg px-4 md:px-6">
      {/* Search Overlay */}
      {isSearchActive && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchActive(false)}
        />
      )}

      {/* Left Side */}
      <div className="flex flex-1 items-center gap-2">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Search */}
        <div
          ref={searchContainerRef}
          className={`relative hidden items-center transition-all duration-200 ease-in-out sm:flex ${
            isSearchActive ? "z-50 w-full max-w-lg" : "w-full max-w-xs"
          }`}
        >
          <div
            className={`flex w-full items-center gap-2 rounded-lg border bg-neutral-surface-1 px-3 py-1.5 text-sm transition-all ${
              isSearchActive
                ? "border-brand-primary bg-neutral-surface-1 text-neutral-text-primary shadow-lg ring-1 ring-brand-primary/20"
                : "border-neutral-border text-neutral-text-secondary hover:border-brand-primary/50 hover:bg-neutral-surface-2"
            }`}
            onClick={() => {
              setIsSearchActive(true);
              searchInputRef.current?.focus();
            }}
          >
            <Search
              size={16}
              className={`shrink-0 ${
                isSearchActive ? "text-brand-primary" : ""
              }`}
            />

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands, projects..."
              className="w-full flex-1 bg-transparent outline-none placeholder:text-neutral-text-secondary"
              onFocus={() => setIsSearchActive(true)}
            />

            {!isSearchActive && (
              <kbd className="hidden h-5 items-center gap-1 rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}

            {isSearchActive && (
              <kbd
                className="hidden h-5 cursor-pointer items-center justify-center rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 sm:flex"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchActive(false);
                }}
              >
                ESC
              </kbd>
            )}
          </div>

          {/* Desktop Search Dropdown */}
          {isSearchActive && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-2xl ring-1 ring-black/5">
              <div className="flex flex-col gap-1 p-2">
                {searchQuery.length > 0 ? (
                  <div className="px-3 py-2 text-sm text-neutral-text-secondary">
                    Search results for &ldquo;
                    {searchQuery}
                    &rdquo;...
                  </div>
                ) : (
                  <>
                    <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                      Quick Links
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsSearchActive(false)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                    >
                      <LayoutDashboard size={16} />
                      Go to Dashboard
                    </Link>

                    <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                      Projects
                    </div>

                    <Link
                      href="/projects/my-trip"
                      onClick={() => setIsSearchActive(false)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                    >
                      <Folder size={16} />
                      my-trip
                    </Link>

                    <Link
                      href="/projects/devmatrix"
                      onClick={() => setIsSearchActive(false)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                    >
                      <Folder size={16} />
                      devmatrix
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Button */}
        <button
          className="rounded-md p-2 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-1 hover:text-neutral-text-primary sm:hidden"
          onClick={() => {
            setIsSearchActive(true);

            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 50);
          }}
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setIsNotifOpen((prev) => !prev);
              setIsProfileOpen(false);
            }}
            className={`relative rounded-full p-1.5 transition-colors hover:bg-neutral-surface-1 ${
              isNotifOpen
                ? "bg-neutral-surface-1 text-brand-primary"
                : "text-neutral-text-secondary"
            }`}
            aria-label="Notifications"
          >
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-highlight ring-2 ring-neutral-bg" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-lg border border-neutral-border bg-neutral-surface-1 p-2 shadow-2xl ring-1 ring-black/5">
              <div className="mb-2 border-b border-neutral-border px-2 pb-2 text-sm font-semibold text-neutral-text-primary">
                Notifications
              </div>

              <div className="flex flex-col gap-1">
                <div className="cursor-pointer rounded-md p-2 transition-colors hover:bg-neutral-surface-2">
                  <p className="font-medium text-neutral-text-primary">
                    Build successful
                  </p>

                  <p className="text-xs text-neutral-text-secondary">
                    my-trip deployed to production.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen((prev) => !prev);
              setIsNotifOpen(false);
            }}
            className={`flex cursor-pointer items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition-colors hover:border-brand-primary/50 ${
              isProfileOpen
                ? "border-brand-primary/50 bg-neutral-surface-2"
                : "border-neutral-border bg-neutral-surface-1"
            }`}
            aria-label="Open profile menu"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary">
              {initials}
            </div>

            <span className="hidden text-sm font-medium text-neutral-text-primary sm:block">
              {user?.name}
            </span>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-neutral-border bg-neutral-surface-1 p-1 shadow-2xl ring-1 ring-black/5 z-50">
              <Link
                href="/dashboard"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <Link
                href="/projects"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              >
                <Folder size={16} />
                Projects
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              >
                <Settings size={16} />
                Settings
              </Link>

              <div className="my-1 border-t border-neutral-border" />

              <button
                onClick={handleLogout}
                disabled={logout.isPending}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 disabled:opacity-50"
              >
                <LogOut size={16} />
                {logout.isPending ? "Logging out..." : "Log out"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchActive && (
        <div className="absolute left-0 right-0 top-0 z-[60] flex h-14 items-center border-b border-neutral-border bg-neutral-bg px-4 sm:hidden">
          <div className="flex w-full items-center gap-2 rounded-lg border border-brand-primary bg-neutral-surface-1 px-3 py-1.5 text-sm text-neutral-text-primary ring-1 ring-brand-primary/20">
            <Search size={16} className="shrink-0 text-brand-primary" />

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full flex-1 bg-transparent outline-none"
            />

            <kbd
              className="flex h-5 cursor-pointer items-center justify-center rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary"
              onClick={() => setIsSearchActive(false)}
            >
              ESC
            </kbd>
          </div>

          {/* Mobile Search Dropdown */}
          <div className="absolute left-0 right-0 top-14 z-[60] max-h-80 overflow-y-auto rounded-b-lg border-x border-b border-neutral-border bg-neutral-surface-1 shadow-2xl ring-1 ring-black/5">
            <div className="flex flex-col gap-1 p-2">
              {searchQuery.length > 0 ? (
                <div className="px-3 py-2 text-sm text-neutral-text-secondary">
                  Search results for &ldquo;
                  {searchQuery}
                  &rdquo;...
                </div>
              ) : (
                <>
                  <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                    Quick Links
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setIsSearchActive(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                  >
                    <LayoutDashboard size={16} />
                    Go to Dashboard
                  </Link>

                  <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                    Projects
                  </div>

                  <Link
                    href="/projects/my-trip"
                    onClick={() => setIsSearchActive(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                  >
                    <Folder size={16} />
                    my-trip
                  </Link>

                  <Link
                    href="/projects/devmatrix"
                    onClick={() => setIsSearchActive(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
                  >
                    <Folder size={16} />
                    devmatrix
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
