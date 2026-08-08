"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";

interface WeightTotalIndicatorProps {
  totalWeight: number;
  isValid: boolean;
}

export default function WeightTotalIndicator({
  totalWeight,
  isValid,
}: WeightTotalIndicatorProps) {
  return (
    <div
      className={`mb-6 flex items-center justify-between rounded-xl border p-4 transition-colors ${
        isValid
          ? "border-success/20 bg-success/5"
          : "border-warning/20 bg-warning/5"
      }`}
    >
      <div className="flex items-center gap-3">
        {isValid ? (
          <CheckCircle2 size={20} className="text-success" />
        ) : (
          <AlertCircle size={20} className="text-warning" />
        )}
        <span
          className={`text-sm font-medium ${isValid ? "text-success" : "text-warning"}`}
        >
          Total Weight Allocation
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-2xl font-bold ${isValid ? "text-success" : "text-warning"}`}
        >
          {totalWeight}
        </span>
        <span
          className={`text-sm font-medium ${isValid ? "text-success" : "text-warning"}`}
        >
          %
        </span>
      </div>
    </div>
  );
}
