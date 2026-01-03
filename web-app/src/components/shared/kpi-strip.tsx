"use client";

import { LucideIcon } from "lucide-react";
import { KpiCard } from "./kpi-card";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex justify-center", className)}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full max-w-5xl">
        {items.map((item, index) => (
          <KpiCard key={item.label} {...item} delay={index} />
        ))}
      </div>
    </div>
  );
}
