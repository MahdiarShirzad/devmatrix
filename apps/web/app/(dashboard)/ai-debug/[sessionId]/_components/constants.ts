export const TABS = ["Explanation", "Fix", "Diff"] as const;
export type Tab = (typeof TABS)[number];

export const SAMPLE_CODE = `function getUser(id) {
  const user = users.find(u => u.id === id);
  return user.name;
}`;
