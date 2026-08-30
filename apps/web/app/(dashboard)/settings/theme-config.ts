export interface ThemeConfig {
  id: string;
  name: string;
  colors: string[];
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    colors: ["#000000", "#0d1117", "#fca311", "#e5e5e5", "#ffffff"],
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    colors: ["#0B1220", "#111B2E", "#3B82F6", "#7DD3FC", "#F8FAFC"],
  },
  {
    id: "terminal",
    name: "Terminal",
    colors: ["#0F1214", "#161A1E", "#3DD68C", "#E8B44A", "#F2F5F7"],
  },
  {
    id: "arctic",
    name: "Arctic",
    colors: ["#0A1823", "#102634", "#4DC4E8", "#B8E4F0", "#FFFFFF"],
  },
  {
    id: "amethyst",
    name: "Amethyst",
    colors: ["#0D0B14", "#161326", "#A78BFA", "#E4B363", "#F5F0FF"],
  },
  {
    id: "verdant",
    name: "Verdant",
    colors: ["#0D2231", "#E3EDF5", "#53D46B", "#8C99A2", "#F2F5F7"],
  },
  {
    id: "monochrome",
    name: "Monochrome",
    colors: ["#0A0A0A", "#141414", "#E5E7EB", "#8CA3B8", "#FFFFFF"],
  },
  {
    id: "alabaster",
    name: "Alabaster",
    colors: ["#F4F2ED", "#FFFFFF", "#2F3E46", "#C96F4A", "#1A1A1A"],
  },
];
