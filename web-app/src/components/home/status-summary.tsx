"use client";

import { motion } from "framer-motion";
import { Users, Workflow, TrendingUp, Clock } from "lucide-react";
import { KpiStrip } from "@/components/shared/kpi-strip";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerItem } from "@/lib/motion";

export function StatusSummary() {
  const reducedMotion = useReducedMotion();
  const { orgMetrics } = useAppStore();

  const kpis = [
    {
      label: "Personas Defined",
      value: orgMetrics.totalPersonas,
      icon: Users,
    },
    {
      label: "Active Workflows",
      value: orgMetrics.activeWorkflows,
      icon: Workflow,
    },
    {
      label: "Automation Coverage",
      value: orgMetrics.automationCoverage,
      suffix: "%",
      icon: TrendingUp,
    },
    {
      label: "Hours Saved/Week",
      value: orgMetrics.totalTimeSavedPerWeek,
      icon: Clock,
    },
  ];

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          variants={reducedMotion ? {} : staggerItem}
          transition={{ duration: 0.25, delay: 0.3 }}
        >
          <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Current Status
          </h2>
          <KpiStrip items={kpis} />
        </motion.div>
      </div>
    </section>
  );
}
