"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bug,
  BarChart3,
  Terminal,
  Rocket,
  ChevronsUpDown,
  Settings,
  Folder,
} from "lucide-react";
import { useGithubProjects } from "@/hooks/useGithubAnalytics";

// Tools that live under /projects/[projectId]/... — everything else
// (Dashboard, Analytics) is global and has no project scoping.
const PROJECT_SCOPED_TOOLS = [
  { slug: "api-playground", label: "API Playground", icon: Terminal },
  { slug: "ai-debug", label: "AI Debugging", icon: Bug },
  { slug: "saas-validator", label: "Idea Validator", icon: Rocket },
];

const GLOBAL_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics Platform", icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const projectMenuRef = useRef<HTMLDivElement>(null);

  const { data: projectsData } = useGithubProjects("all");
  const projects = projectsData?.projects ?? [];

  // Figure out where we are: global page, or inside /projects/[projectId]/<tool>
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const isProjectScoped = segments[0] === "projects" && segments[1];
  const currentProjectId = isProjectScoped ? segments[1] : undefined;
  const currentTool = isProjectScoped ? segments[2] : undefined;
  const currentProject = projects.find((p) => p._id === currentProjectId);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const lightThemes = ["alabaster", "verdant"];
      setIsLightTheme(lightThemes.includes(theme || ""));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target as Node)
      ) {
        setIsProjectMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProject = (nextProjectId: string) => {
    setIsProjectMenuOpen(false);
    if (isProjectScoped && currentTool) {
      // Stay on the same tool, just switch which project it's scoped to
      router.push(`/projects/${nextProjectId}/${currentTool}`);
    } else {
      // Coming from a global page (or nowhere) — default into API Playground
      router.push(`/projects/${nextProjectId}/api-playground`);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-neutral-border bg-neutral-surface-1 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-border px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={isLightTheme ? "/logo-dark.png" : "/logo.png"}
            alt="DevMatrix"
            width={150}
            height={24}
            className="rounded"
          />
          {/* <span className="font-mono text-sm font-bold tracking-tight text-neutral-text-primary">
            DevMatrix
          </span> */}
        </Link>
      </div>

      {/* Project selector — label and behavior depend on where we are */}
      <div className="px-3 pt-4 pb-2 relative" ref={projectMenuRef}>
        {isProjectScoped ? (
          <>
            <button
              onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
              disabled={projects.length === 0}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors hover:border-brand-primary/50 hover:bg-neutral-surface-2/80 disabled:cursor-not-allowed disabled:opacity-60 ${
                isProjectMenuOpen
                  ? "border-brand-primary/50 bg-neutral-surface-2/80"
                  : "border-neutral-border bg-neutral-surface-2"
              }`}
            >
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-text-secondary">
                  Current Project
                </span>
                <span className="truncate text-sm font-semibold text-neutral-text-primary">
                  {currentProject?.name ?? "Select project"}
                </span>
              </div>
              <ChevronsUpDown
                size={16}
                className="text-neutral-text-secondary"
              />
            </button>

            {isProjectMenuOpen && projects.length > 0 && (
              <div className="absolute top-full left-3 right-3 mt-1 rounded-lg border border-neutral-border bg-neutral-surface-1 p-1 shadow-lg z-50">
                {projects.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => handleSelectProject(p._id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary transition-colors"
                  >
                    <Folder size={14} className="text-neutral-text-secondary" />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full items-center justify-between rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2 text-left">
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-text-secondary">
                Workspace
              </span>
              <span className="truncate text-sm font-semibold text-neutral-text-primary">
                All Projects
              </span>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {GLOBAL_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.75}
                className={
                  isActive
                    ? "text-brand-primary"
                    : "text-neutral-text-secondary group-hover:text-neutral-text-primary"
                }
              />
              {item.label}
            </Link>
          );
        })}

        <div className="my-2 border-t border-neutral-border" />

        {PROJECT_SCOPED_TOOLS.map((tool) => {
          const isActive = currentTool === tool.slug;
          const Icon = tool.icon;
          // Prefer staying on the current project; fall back to the first
          // linked project; if none exist yet, still link there so the
          // page's own empty state (with guidance to Analytics) can show.
          const targetProjectId =
            currentProjectId ?? projects[0]?._id ?? "none";
          const href = `/projects/${targetProjectId}/${tool.slug}`;

          return (
            <Link
              key={tool.slug}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.2 : 1.75}
                className={
                  isActive
                    ? "text-brand-primary"
                    : "text-neutral-text-secondary group-hover:text-neutral-text-primary"
                }
              />
              {tool.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-neutral-border p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
        >
          <Settings size={18} strokeWidth={1.75} />
          Project Settings
        </Link>
      </div>
    </aside>
  );
}
