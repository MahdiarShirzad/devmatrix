export const METHOD_COLORS: Record<string, string> = {
  GET: "text-success",
  POST: "text-brand-accent",
  PUT: "text-warning",
  PATCH: "text-warning",
  DELETE: "text-error",
};

export const REQUEST_TABS = ["Params", "Headers", "Body", "Auth"] as const;
export type RequestTab = (typeof REQUEST_TABS)[number];
