/**
 * Shared architecture model for the landing-page diagrams.
 * Mirrors the four real modules and the destinations that already exist.
 */
export type ArchitectureModule = {
  id: string;
  index: string;
  label: string;
  artifact: string;
  href: string;
};

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    id: "playground",
    index: "01",
    label: "API Playground",
    artifact: "requests, collections, responses",
    href: "/docs/modules/api-playground",
  },
  {
    id: "debug",
    index: "02",
    label: "AI Debugging",
    artifact: "causes, fixes, explanations",
    href: "/docs/modules/ai-debugging-assistant",
  },
  {
    id: "analytics",
    index: "03",
    label: "Developer Analytics",
    artifact: "commits, trends, activity",
    href: "/docs/modules/developer-analytics",
  },
  {
    id: "validator",
    index: "04",
    label: "Idea Validator",
    artifact: "market, competitors, SWOT",
    href: "/docs/modules/saas-idea-validator",
  },
];
