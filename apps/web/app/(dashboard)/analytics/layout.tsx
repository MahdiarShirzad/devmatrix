import type { ReactNode } from "react";
import { AnalyticsRangeProvider } from "@/src/context/AnalyticsRangeContext";

export default function AnalyticsLayout({ children }: { children: ReactNode }) {
  return <AnalyticsRangeProvider>{children}</AnalyticsRangeProvider>;
}
