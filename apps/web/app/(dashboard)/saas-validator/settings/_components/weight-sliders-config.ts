import { Target, Swords, ShieldAlert } from "lucide-react";
import type { WeightSliderConfig } from "./weight-types";

export const WEIGHT_SLIDERS: WeightSliderConfig[] = [
  {
    key: "market",
    label: "Market Fit Weight",
    description: "How much market demand signals affect the overall score.",
    icon: Target,
    color: "success",
  },
  {
    key: "competition",
    label: "Competition Weight",
    description:
      "How much existing competitors reduce the overall score.",
    icon: Swords,
    color: "warning",
  },
  {
    key: "risk",
    label: "Risk Weight",
    description:
      "How much retention and execution risk affect the overall score.",
    icon: ShieldAlert,
    color: "error",
  },
];
