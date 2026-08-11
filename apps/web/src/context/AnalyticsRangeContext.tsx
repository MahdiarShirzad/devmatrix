"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type AnalyticsRange = "7" | "30" | "180" | "365" | "all";

export const RANGE_LABELS: Record<AnalyticsRange, string> = {
  "7": "Last 7 Days",
  "30": "Last Month",
  "180": "Last 6 Months",
  "365": "Last Year",
  all: "All Time",
};

interface AnalyticsRangeContextValue {
  range: AnalyticsRange;
  setRange: (range: AnalyticsRange) => void;
}

const AnalyticsRangeContext = createContext<AnalyticsRangeContextValue | null>(
  null,
);

export function AnalyticsRangeProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<AnalyticsRange>("7");

  return (
    <AnalyticsRangeContext.Provider value={{ range, setRange }}>
      {children}
    </AnalyticsRangeContext.Provider>
  );
}

export function useAnalyticsRange() {
  const ctx = useContext(AnalyticsRangeContext);
  if (!ctx) {
    throw new Error(
      "useAnalyticsRange must be used within AnalyticsRangeProvider",
    );
  }
  return ctx;
}
