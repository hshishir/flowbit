"use client";

import { motion } from "framer-motion";
import { Users, Workflow, TrendingUp, Clock, Building2 } from "lucide-react";
import { KpiStrip } from "@/components/shared/kpi-strip";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function StatusSummary() {
  const reducedMotion = useReducedMotion();
  const { orgMetrics, org } = useAppStore();

  const kpis = [
    {
      label: "Departments",
      value: org?.departments?.length || 0,
      icon: Building2,
    },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section className="px-6 py-16 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

      {/* Animated accent line */}
      {!reducedMotion && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}

      <motion.div
        className="mx-auto max-w-5xl relative"
        variants={reducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title with animation */}
        <motion.div
          className="text-center mb-10"
          variants={reducedMotion ? {} : titleVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4"
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={reducedMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Live Data
            </span>
          </motion.div>
          <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Current Status
          </h2>
        </motion.div>

        {/* KPI Cards */}
        <KpiStrip items={kpis} />
      </motion.div>

      {/* Bottom accent line */}
      {!reducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      )}
    </section>
  );
}
