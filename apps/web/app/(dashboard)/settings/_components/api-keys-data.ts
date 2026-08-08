export interface ApiKeyItem {
  id: string;
  name: string;
  token: string;
  date: string;
}

export const API_KEYS: ApiKeyItem[] = [
  {
    id: "1",
    name: "Production Key",
    token: "sk_live_9f8d...a2b4",
    date: "Oct 24, 2025",
  },
  {
    id: "2",
    name: "Development Env",
    token: "sk_test_4c2a...f9e1",
    date: "Feb 12, 2026",
  },
];
