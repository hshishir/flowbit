"use client";

import { LucideIcon } from "lucide-react";
import { KpiCard } from "./kpi-card";

interface KpiItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

interface KpiStripProps {
  items: KpiItem[];
  className?: string;
}

export function KpiStrip({ items, className }: KpiStripProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item, index) => (
          <KpiCard key={item.label} {...item} delay={index} />
        ))}
      </div>
    </div>
  );
}
