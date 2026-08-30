const THEME_STORAGE_KEY = "devmatrix-theme";
const DEFAULT_THEME = "obsidian";

const VALID_THEMES = [
  "obsidian",
  "deep-blue",
  "terminal",
  "arctic",
  "amethyst",
  "verdant",
  "monochrome",
  "alabaster",
] as const;

type ValidTheme = (typeof VALID_THEMES)[number];

function isValidTheme(value: string): value is ValidTheme {
  return VALID_THEMES.includes(value as ValidTheme);
}

// This function is designed to be executed inline in the HTML
export function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    let theme = DEFAULT_THEME;

    if (savedTheme && isValidTheme(savedTheme)) {
      theme = savedTheme;
    }

    // Apply theme immediately
    document.documentElement.setAttribute("data-theme", theme);

    // Update color scheme
    const isLightTheme = theme === "verdant" || theme === "alabaster";
    document.documentElement.style.colorScheme = isLightTheme
      ? "light"
      : "dark";

    return theme;
  } catch {
    // Fallback to default
    document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    document.documentElement.style.colorScheme = "dark";
    return DEFAULT_THEME;
  }
}

export const themeInitScript = `
  (function() {
    const key = 'devmatrix-theme';
    const validThemes = ['obsidian','deep-blue','terminal','arctic','amethyst','verdant','monochrome','alabaster'];
    const defaultTheme = 'obsidian';
    let theme = defaultTheme;
    try {
      const saved = localStorage.getItem(key);
      if (saved && validThemes.includes(saved)) {
        theme = saved;
      }
    } catch(e) {}
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = (theme === 'verdant' || theme === 'alabaster') ? 'light' : 'dark';
  })();
`;
