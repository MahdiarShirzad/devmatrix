export const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Next.js",
  "React.js",
  "Node.js",
  "Express",
  "Python",
  "Go",
  "C#",
] as const;

export type Language = (typeof LANGUAGES)[number];
