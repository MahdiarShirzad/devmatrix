export interface ApiKey {
  id: string;
  name: string;
  token: string;
  date: string;
}

export const API_KEYS: ApiKey[] = [
  {
    id: "1",
    name: "Production",
    token: "sk_live_••••••••••••4f2a",
    date: "Aug 1, 2026",
  },
  {
    id: "2",
    name: "Development",
    token: "sk_test_••••••••••••9c3d",
    date: "Jul 15, 2026",
  },
];
