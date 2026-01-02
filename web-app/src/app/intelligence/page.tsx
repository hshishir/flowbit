"use client";

import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Workflow,
  Bot,
  Users,
  Download,
  RefreshCw,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { DashboardTabs } from "@/components/intelligence/dashboard-tabs";
import {
  AutomationTrendChart,
  TimeSavedByDepartmentChart,
  WorkflowPerformanceChart,
} from "@/components/intelligence/metrics-charts";
import {
  TopPersonasTable,
  WorkflowsPerformanceTable,
  GovernanceEventsTable,
} from "@/components/intelligence/performance-tables";
import { KpiStrip } from "@/components/shared/kpi-strip";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function IntelligencePage() {
  const reducedMotion = useReducedMotion();
  const { orgMetrics } = useAppStore();

  const kpis = [
    {
      label: "Tasks Automated",
      value: orgMetrics.tasksAutomated,
      suffix: ` / ${orgMetrics.totalTasks}`,
      icon: TrendingUp,
      trend: { value: 12, positive: true },
    },
    {
      label: "Time Saved/Week",
      value: orgMetrics.totalTimeSavedPerWeek,
      suffix: "h",
      icon: Clock,
      trend: { value: 8, positive: true },
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
      trend: { value: 5, positive: true },
    },
    {
      label: "AI Utilization",
      value: orgMetrics.aiUtilization,
      suffix: "%",
      icon: Bot,
    },
  ];

  const topBarActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  );

  const personaContent = (
    <motion.div
      initial="initial"
      animate="enter"
      variants={reducedMotion ? {} : staggerContainer}
      className="space-y-6"
    >
      <motion.div variants={reducedMotion ? {} : staggerItem}>
        <TopPersonasTable />
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <AutomationTrendChart />
        </motion.div>
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <TimeSavedByDepartmentChart />
        </motion.div>
      </div>
    </motion.div>
  );

  const departmentContent = (
    <motion.div
      initial="initial"
      animate="enter"
      variants={reducedMotion ? {} : staggerContainer}
      className="space-y-6"
    >
      <motion.div variants={reducedMotion ? {} : staggerItem}>
        <TimeSavedByDepartmentChart />
      </motion.div>
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <AutomationTrendChart />
        </motion.div>
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <WorkflowPerformanceChart />
        </motion.div>
      </div>
    </motion.div>
  );

  const orgContent = (
    <motion.div
      initial="initial"
      animate="enter"
      variants={reducedMotion ? {} : staggerContainer}
      className="space-y-6"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <WorkflowsPerformanceTable />
        </motion.div>
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <GovernanceEventsTable />
        </motion.div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <AutomationTrendChart />
        </motion.div>
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <WorkflowPerformanceChart />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <AppShell title="Intelligence Dashboard" actions={topBarActions}>
      <PageTransition>
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="space-y-6 p-6"
        >
          {/* KPI Strip */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <KpiStrip items={kpis} />
          </motion.div>

          {/* Tabs with content */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <DashboardTabs
              children={{
                persona: personaContent,
                department: departmentContent,
                org: orgContent,
              }}
            />
          </motion.div>
        </motion.div>
      </PageTransition>
    </AppShell>
  );
}
