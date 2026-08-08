import {
  User,
  Shield,
  Bell,
  Briefcase,
  Users,
  Key,
  Terminal,
  Webhook,
  type LucideIcon,
} from "lucide-react";

export type TabId = "profile" | "security" | "api-keys" | "appearance";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "security", label: "Security", icon: Shield },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "general", label: "General", icon: Briefcase },
      { id: "members", label: "Members", icon: Users },
      { id: "roles", label: "Roles & Permissions", icon: Key },
    ],
  },
  {
    label: "Advanced",
    items: [
      { id: "api-keys", label: "API Keys", icon: Terminal },
      { id: "webhooks", label: "Webhooks", icon: Webhook },
    ],
  },
];
