import React from "react";
import { User, KeyRound, Bell, Shield, Palette } from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  iconProps?: Record<string, unknown>;
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
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "security", label: "Security", icon: Shield },
    ],
  },
  {
    label: "Developer",
    items: [
      { id: "api-keys", label: "API Keys", icon: KeyRound },
      {
        id: "github",
        label: "GitHub",
        icon: GithubIcon,
        iconProps: { width: 30, height: 30, className: "text-black" },
      },
    ],
  },
  {
    label: "Preferences",
    items: [{ id: "appearance", label: "Appearance", icon: Palette }],
  },
];
