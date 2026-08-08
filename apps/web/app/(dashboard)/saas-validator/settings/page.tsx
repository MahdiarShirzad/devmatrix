"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  SlidersHorizontal,
  Target,
  Swords,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ValidatorSettingsPage() {
  // تبدیل داده‌های استاتیک به State برای تعامل زنده
  const [weights, setWeights] = useState({
    market: 40,
    competition: 30,
    risk: 30,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // محاسبه مجموع درصدها
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
    <div className="mx-auto max-w-2xl pb-8">
      {/* دکمه بازگشت */}
      <Link
        href="/saas-validator"
        className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to ideas
      </Link>

      {/* هدر */}
      <div className="mb-6 flex flex-col gap-4 border-b border-neutral-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
              <SlidersHorizontal size={20} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
              Validator Settings
            </h1>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-text-secondary">
            Adjust how the AI weighs each factor when scoring your ideas.
            <strong className="font-semibold text-neutral-text-primary">
              {" "}
              The total must equal 100%.
            </strong>
          </p>
        </div>
      </div>

      {/* نوار وضعیت مجموع (Total Indicator) */}
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

      {/* لیست اسلایدرها */}
      <div className="mb-8 space-y-2 rounded-2xl border border-neutral-border bg-neutral-surface-1 p-2 shadow-sm">
        {/* فیلتر ۱: Market Fit */}
        <div className="rounded-xl p-4 transition-colors hover:bg-neutral-surface-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-success/20 bg-success/10">
                <Target size={16} className="text-success" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-text-primary">
                  Market Fit Weight
                </label>
                <p className="text-[13px] text-neutral-text-secondary">
                  How much market demand signals affect the overall score.
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-success">
              {weights.market}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={weights.market}
            onChange={(e) =>
              setWeights({ ...weights, market: Number(e.target.value) })
            }
            className="w-full accent-success"
          />
        </div>

        {/* فیلتر ۲: Competition */}
        <div className="rounded-xl p-4 transition-colors hover:bg-neutral-surface-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-warning/20 bg-warning/10">
                <Swords size={16} className="text-warning" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-text-primary">
                  Competition Weight
                </label>
                <p className="text-[13px] text-neutral-text-secondary">
                  How much existing competitors reduce the overall score.
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-warning">
              {weights.competition}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={weights.competition}
            onChange={(e) =>
              setWeights({ ...weights, competition: Number(e.target.value) })
            }
            className="w-full accent-warning"
          />
        </div>

        {/* فیلتر ۳: Risk */}
        <div className="rounded-xl p-4 transition-colors hover:bg-neutral-surface-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-error/20 bg-error/10">
                <ShieldAlert size={16} className="text-error" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-text-primary">
                  Risk Weight
                </label>
                <p className="text-[13px] text-neutral-text-secondary">
                  How much retention and execution risk affect the overall
                  score.
                </p>
              </div>
            </div>
            <span className="text-sm font-bold text-error">
              {weights.risk}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={weights.risk}
            onChange={(e) =>
              setWeights({ ...weights, risk: Number(e.target.value) })
            }
            className="w-full accent-error"
          />
        </div>
      </div>

      {/* دکمه ذخیره */}
      <div className="flex items-center justify-end border-t border-neutral-border pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid || isSaving || isSaved}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all sm:w-auto active:scale-95 ${
            isSaved
              ? "bg-success shadow-lg shadow-success/20"
              : "bg-brand-primary shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20"
          } disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none`}
        >
          {isSaving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving Settings...
            </>
          ) : isSaved ? (
            <>
              <CheckCircle2 size={18} />
              Settings Saved!
            </>
          ) : (
            <>
              <Save size={18} />
              Save Algorithm Weights
            </>
          )}
        </button>
      </div>
    </div>
  );
}
