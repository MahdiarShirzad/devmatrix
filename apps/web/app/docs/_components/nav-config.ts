export interface DocsNavItem {
  name: string;
  href: string;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

export const docsNav: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs/introduction" },
      { name: "What is DevMatrix?", href: "/docs/what-is-devmatrix" },
      { name: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        name: "Projects & Workspaces",
        href: "/docs/concepts/projects-workspaces",
      },
      { name: "Users & Auth", href: "/docs/concepts/users-auth" },
      {
        name: "Architecture Overview",
        href: "/docs/concepts/architecture-overview",
      },
    ],
  },
  {
    title: "Modules",
    items: [
      { name: "API Playground", href: "/docs/modules/api-playground" },
      {
        name: "AI Debugging Assistant",
        href: "/docs/modules/ai-debugging-assistant",
      },
      {
        name: "Developer Analytics",
        href: "/docs/modules/developer-analytics",
      },
      {
        name: "SaaS Idea Validator",
        href: "/docs/modules/saas-idea-validator",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      { name: "Authentication", href: "/docs/api-reference/authentication" },
      { name: "REST Endpoints", href: "/docs/api-reference/rest-endpoints" },
    ],
  },
];

export const flatDocsNav: DocsNavItem[] = docsNav.flatMap(
  (section) => section.items,
);
