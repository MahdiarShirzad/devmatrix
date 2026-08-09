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

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  // هندل کردن شورت‌کات Cmd+K یا Ctrl+K و دکمه Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchActive(true);
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsSearchActive(false);
        setIsProfileOpen(false);
        setIsNotifOpen(false);
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // بستن دراپ‌داون‌ها و سرچ هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-border bg-neutral-bg px-4 md:px-6 relative z-40">
      {/* Overlay تیره پشت سرچ باز، برای جدا کردن هدر از محتوای پشت صفحه */}
      {isSearchActive && (
        <div
          className="fixed inset-0 top-14 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchActive(false)}
        />
      )}

      <div className="flex items-center gap-2 flex-1">
        {/* دکمه منوی موبایل */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-neutral-text-secondary hover:bg-neutral-surface-1 hover:text-neutral-text-primary md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* کانتینر جستجو - یکپارچه در هدر */}
        <div
          ref={searchContainerRef}
          className={`relative hidden sm:flex items-center transition-all duration-200 ease-in-out ${
            isSearchActive ? "w-full max-w-lg z-50" : "w-full max-w-xs"
          }`}
        >
          <div
            className={`flex w-full items-center gap-2 rounded-lg border bg-neutral-surface-1 px-3 py-1.5 text-sm transition-all ${
              isSearchActive
                ? "border-brand-primary ring-1 ring-brand-primary/20 bg-neutral-surface-1 text-neutral-text-primary shadow-lg"
                : "border-neutral-border text-neutral-text-secondary hover:border-brand-primary/50 hover:bg-neutral-surface-2"
            }`}
            onClick={() => {
              setIsSearchActive(true);
              searchInputRef.current?.focus();
            }}
          >
            <Search
              size={16}
              className={`shrink-0 ${isSearchActive ? "text-brand-primary" : ""}`}
            />

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands, projects..."
              className="flex-1 bg-transparent outline-none placeholder:text-neutral-text-secondary w-full"
              onFocus={() => setIsSearchActive(true)}
            />

            {!isSearchActive && (
              <kbd className="hidden h-5 items-center gap-1 rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}

            {isSearchActive && (
              <kbd
                className="hidden h-5 items-center justify-center rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary sm:flex cursor-pointer hover:bg-neutral-surface-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchActive(false);
                }}
              >
                ESC
              </kbd>
            )}
          </div>

          {/* دراپ‌داون نتایج جستجو - باز شدن دقیقا زیر اینپوت */}
          {isSearchActive && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-neutral-border bg-neutral-surface-1 shadow-2xl ring-1 ring-black/5 z-50 max-h-80 overflow-y-auto">
              <div className="p-2 flex flex-col gap-1">
                {searchQuery.length > 0 ? (
                  <div className="px-3 py-2 text-sm text-neutral-text-secondary">
                    Search results for &ldquo;{searchQuery}&ldquo;...
                  </div>
                ) : (
                  <>
                    <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                      Quick Links
                    </div>
                    <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary transition-colors text-left">
                      <LayoutDashboard size={16} />
                      Go to Dashboard
                    </button>

                    <div className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-text-secondary">
                      Projects
                    </div>
                    <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary transition-colors text-left">
                      <Folder size={16} />
                      my-trip
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary transition-colors text-left">
                      <Folder size={16} />
                      devmatrix
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* دکمه سرچ موبایل (جایگزین اینپوت کامل در صفحه‌های کوچک) */}
        <button
          className="sm:hidden rounded-md p-2 text-neutral-text-secondary hover:bg-neutral-surface-1 hover:text-neutral-text-primary"
          onClick={() => {
            setIsSearchActive(true);
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }}
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* نوتیفیکیشن‌ها */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative rounded-full p-1.5 transition-colors hover:bg-neutral-surface-1 ${isNotifOpen ? "text-brand-primary bg-neutral-surface-1" : "text-neutral-text-secondary"}`}
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-highlight ring-2 ring-neutral-bg"></span>
          </button>

          {/* دراپ‌داون نوتیفیکیشن */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-lg border border-neutral-border bg-neutral-surface-1 p-2 shadow-2xl ring-1 ring-black/5 z-50">
              <div className="mb-2 border-b border-neutral-border pb-2 px-2 text-sm font-semibold text-neutral-text-primary">
                Notifications
              </div>
              <div className="flex flex-col gap-1">
                <div className="rounded-md p-2 text-sm hover:bg-neutral-surface-2 cursor-pointer transition-colors">
                  <p className="text-neutral-text-primary font-medium">
                    Build successful
                  </p>
                  <p className="text-neutral-text-secondary text-xs">
                    my-trip deployed to production.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* پروفایل کاربر */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex cursor-pointer items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition-colors hover:border-brand-primary/50 ${isProfileOpen ? "border-brand-primary/50 bg-neutral-surface-2" : "border-neutral-border bg-neutral-surface-1"}`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary">
              {initials}
            </div>
            <span className="hidden text-sm font-medium text-neutral-text-primary sm:block">
              {user?.name}
            </span>
          </button>

          {/* دراپ‌داون پروفایل */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-neutral-border bg-neutral-surface-1 p-1 shadow-2xl ring-1 ring-black/5 z-50">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              >
                <User size={16} />
                My Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              >
                <Settings size={16} />
                Account Settings
              </Link>
              <div className="my-1 border-t border-neutral-border"></div>
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

      {/* مودال سرچ مخصوص موبایل (وقتی روی آیکون سرچ در موبایل کلیک میشه) */}
      {isSearchActive && (
        <div className="sm:hidden absolute top-0 left-0 right-0 h-14 bg-neutral-bg border-b border-neutral-border flex items-center px-4 z-[60]">
          <div className="flex w-full items-center gap-2 rounded-lg border border-brand-primary bg-neutral-surface-1 px-3 py-1.5 text-sm ring-1 ring-brand-primary/20 text-neutral-text-primary">
            <Search size={16} className="shrink-0 text-brand-primary" />

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none w-full"
            />

            <kbd
              className="flex h-5 items-center justify-center rounded border border-neutral-border bg-neutral-bg px-1.5 font-mono text-[10px] font-medium text-neutral-text-secondary cursor-pointer"
              onClick={() => setIsSearchActive(false)}
            >
              ESC
            </kbd>
          </div>

          {/* دراپ‌داون موبایل */}
          <div className="absolute left-0 right-0 top-14 rounded-b-lg border-x border-b border-neutral-border bg-neutral-surface-1 shadow-2xl ring-1 ring-black/5 z-[60] max-h-80 overflow-y-auto">
            <div className="p-2 flex flex-col gap-1">
              {searchQuery.length > 0 ? (
                <div className="px-3 py-2 text-sm text-neutral-text-secondary">
                  Search results for &ldquo;{searchQuery}&quot;...
                </div>
              ) : (
                <>
                  <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 text-left">
                    <LayoutDashboard size={16} />
                    Go to Dashboard
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 text-left">
                    <Folder size={16} />
                    my-trip
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
