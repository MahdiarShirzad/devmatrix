"use client";

import type { WeightColor } from "./weight-types";
import type { LucideIcon } from "lucide-react";

const colorClasses: Record<
  WeightColor,
  { border: string; bg: string; text: string; accent: string }
> = {
  success: {
    border: "border-success/20",
    bg: "bg-success/10",
    text: "text-success",
    accent: "accent-success",
  },
  warning: {
    border: "border-warning/20",
    bg: "bg-warning/10",
    text: "text-warning",
    accent: "accent-warning",
  },
  error: {
    border: "border-error/20",
    bg: "bg-error/10",
    text: "text-error",
    accent: "accent-error",
  },
};

interface WeightSliderProps {
  icon: LucideIcon;
  label: string;
  description: string;
  color: WeightColor;
  value: number;
  onChange: (value: number) => void;
}

export default function WeightSlider({
  icon: Icon,
  label,
  description,
  color,
  value,
  onChange,
}: WeightSliderProps) {
  const classes = colorClasses[color];

  return (
    <div className="rounded-xl p-4 transition-colors hover:bg-neutral-surface-2">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${classes.border} ${classes.bg}`}
          >
            <Icon size={16} className={classes.text} />
          </div>
          <div>
            <label className="text-sm font-semibold text-neutral-text-primary">
              {label}
            </label>
            <p className="text-[13px] text-neutral-text-secondary">
              {description}
            </p>
          </div>
        </div>
        <span className={`text-sm font-bold ${classes.text}`}>{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full ${classes.accent}`}
      />
    </div>
  );
}
