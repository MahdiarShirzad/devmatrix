"use client";

import { useState } from "react";
import WeightTotalIndicator from "./WeightTotalIndicator";
import WeightSlider from "./WeightSlider";
import SaveWeightsButton from "./SaveWeightsButton";
import { WEIGHT_SLIDERS } from "./weight-sliders-config";
import type { Weights } from "./weight-types";

export default function ValidatorSettingsForm() {
  const [weights, setWeights] = useState<Weights>({
    market: 40,
    competition: 30,
    risk: 30,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const totalWeight = weights.market + weights.competition + weights.risk;
  const isValid = totalWeight === 100;

  const handleSave = () => {
    if (!isValid) return;
    setIsSaving(true);
    setIsSaved(false);

    // شبیه‌سازی ذخیره‌سازی در سرور
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // بازگشت دکمه به حالت عادی بعد از ۳ ثانیه
    }, 1200);
  };

  return (
    <>
      <WeightTotalIndicator totalWeight={totalWeight} isValid={isValid} />

      <div className="mb-8 space-y-2 rounded-2xl border border-neutral-border bg-neutral-surface-1 p-2 shadow-sm">
        {WEIGHT_SLIDERS.map((slider) => (
          <WeightSlider
            key={slider.key}
            icon={slider.icon}
            label={slider.label}
            description={slider.description}
            color={slider.color}
            value={weights[slider.key]}
            onChange={(value) =>
              setWeights({ ...weights, [slider.key]: value })
            }
          />
        ))}
      </div>

      <SaveWeightsButton
        isValid={isValid}
        isSaving={isSaving}
        isSaved={isSaved}
        onSave={handleSave}
      />
    </>
  );
}
