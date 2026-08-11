"use client";

import { useId, useState } from "react";
import { ActivityPoint } from "./mockData";

interface MiniAreaChartProps {
  data: ActivityPoint[];
  height?: number;
}

const WIDTH = 720;
const PADDING_X = 12;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;

export default function MiniAreaChart({ data, height = 220 }: MiniAreaChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);
  const min = 0;
  const chartHeight = height - PADDING_TOP - PADDING_BOTTOM;
  const chartWidth = WIDTH - PADDING_X * 2;
  const stepX = data.length > 1 ? chartWidth / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = PADDING_X + i * stepX;
    const ratio = (d.value - min) / (max - min || 1);
    const y = PADDING_TOP + (1 - ratio) * chartHeight;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath =
    `${linePath} ` +
    `L ${points[points.length - 1].x.toFixed(2)} ${(PADDING_TOP + chartHeight).toFixed(2)} ` +
    `L ${points[0].x.toFixed(2)} ${(PADDING_TOP + chartHeight).toFixed(2)} Z`;

  // Horizontal gridlines: 3 subtle reference lines
  const gridLines = [0.25, 0.5, 0.75].map((r) => PADDING_TOP + r * chartHeight);

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle gridlines */}
        {gridLines.map((y, i) => (
          <line
            key={i}
            x1={PADDING_X}
            x2={WIDTH - PADDING_X}
            y1={y}
            y2={y}
            stroke="var(--color-neutral-border)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Hover interaction targets + points */}
        {points.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x - stepX / 2}
              y={PADDING_TOP}
              width={stepX || WIDTH}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
            />
            {hoverIndex === i && (
              <line
                x1={p.x}
                x2={p.x}
                y1={PADDING_TOP}
                y2={PADDING_TOP + chartHeight}
                stroke="var(--color-neutral-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 4 : 2.5}
              fill="var(--color-brand-primary)"
              stroke="var(--color-neutral-surface-1)"
              strokeWidth={hoverIndex === i ? 2 : 0}
              className="transition-all duration-150"
            />
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-neutral-text-secondary)"
            className="font-sans"
          >
            {p.label}
          </text>
        ))}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-neutral-border bg-neutral-surface-2 px-2.5 py-1.5 text-xs shadow-lg shadow-black/40"
          style={{
            left: `${(hovered.x / WIDTH) * 100}%`,
            top: `${((hovered.y - 10) / height) * 100}%`,
          }}
        >
          <div className="font-medium text-neutral-text-primary">{hovered.value}</div>
          <div className="text-neutral-text-secondary">{hovered.label}</div>
        </div>
      )}
    </div>
  );
}
