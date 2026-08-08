import { Bug, BarChart3, Terminal, Rocket, LucideIcon } from "lucide-react";

export interface DashboardModule {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  color: string;
  bg: string;
  borderHover: string;
}

export const MODULES: DashboardModule[] = [
  {
    href: "/api-playground",
    icon: Terminal,
    title: "API Playground",
    description: "Send requests, inspect responses, and manage collections.",
    metric: "5 collections",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
    borderHover: "hover:border-brand-accent/50",
  },
  {
    href: "/ai-debug",
    icon: Bug,
    title: "AI Debugging Assistant",
    description: "Analyze stack traces and get AI-suggested code fixes.",
    metric: "3 active sessions",
    color: "text-brand-primary",
    bg: "bg-brand-primary/10",
    borderHover: "hover:border-brand-primary/50",
  },
  {
    href: "/analytics",
    icon: BarChart3,
    title: "Developer Analytics",
    description: "Track commits, velocity, and productivity metrics.",
    metric: "2 connected repos",
    color: "text-brand-highlight",
    bg: "bg-brand-highlight/10",
    borderHover: "hover:border-brand-highlight/50",
  },
  {
    href: "/saas-validator",
    icon: Rocket,
    title: "SaaS Idea Validator",
    description: "Evaluate startup ideas against market and risk signals.",
    metric: "1 idea in review",
    color: "text-success",
    bg: "bg-success-bg",
    borderHover: "hover:border-success/50",
  },
];

export interface ActivityLogItem {
  module: string;
  text: string;
  time: string;
  indicator: string;
}

export const RECENT_ACTIVITY: ActivityLogItem[] = [
  {
    module: "AI Debugging",
    text: "Resolved TypeScript casing compile error in auth module",
    time: "22 mins ago",
    indicator: "bg-brand-primary",
  },
  {
    module: "API Playground",
    text: "Tested GET /api/flights in my-trip workspace",
    time: "2 hours ago",
    indicator: "bg-brand-accent",
  },
  {
    module: "Analytics",
    text: "Weekly productivity report generated for deep-coding-backend",
    time: "1 day ago",
    indicator: "bg-brand-highlight",
  },
];
