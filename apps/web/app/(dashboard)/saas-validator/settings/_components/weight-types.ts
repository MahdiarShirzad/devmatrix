import type { LucideIcon } from "lucide-react";

export type WeightColor = "success" | "warning" | "error";

export interface WeightSliderConfig {
  key: "market" | "competition" | "risk";
  label: string;
  description: string;
  icon: LucideIcon;
  color: WeightColor;
}

export interface Weights {
  market: number;
  competition: number;
  risk: number;
}
