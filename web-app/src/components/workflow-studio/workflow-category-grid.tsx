"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Code2,
  Users,
  Settings,
  DollarSign,
  Megaphone,
  Workflow,
  ArrowRight,
  Activity,
  Clock,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface WorkflowCategoryGridProps {
  onSelectCategory: (departmentId: string) => void;
}

const departmentConfig: Record<
  string,
  {
    icon: React.ElementType;
    emoji: string;
    accentColor: string;
    bgAccent: string;
    borderAccent: string;
    gradientBar: string;
  }
> = {
  "dept-1": {
    icon: TrendingUp,
    emoji: "📈",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    gradientBar: "from-emerald-500 to-emerald-400",
  },
  "dept-2": {
    icon: Code2,
    emoji: "⚙️",
    accentColor: "text-blue-600 dark:text-blue-400",
    bgAccent: "bg-blue-500/10",
    borderAccent: "border-blue-500/20",
    gradientBar: "from-blue-500 to-blue-400",
  },
  "dept-3": {
    icon: Users,
    emoji: "👥",
    accentColor: "text-violet-600 dark:text-violet-400",
    bgAccent: "bg-violet-500/10",
    borderAccent: "border-violet-500/20",
    gradientBar: "from-violet-500 to-violet-400",
  },
  "dept-4": {
    icon: Settings,
    emoji: "🔧",
    accentColor: "text-orange-600 dark:text-orange-400",
    bgAccent: "bg-orange-500/10",
    borderAccent: "border-orange-500/20",
    gradientBar: "from-orange-500 to-orange-400",
  },
  "dept-5": {
    icon: DollarSign,
    emoji: "💰",
    accentColor: "text-amber-600 dark:text-amber-400",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/20",
    gradientBar: "from-amber-500 to-amber-400",
  },
  "dept-6": {
    icon: Megaphone,
    emoji: "🎯",
    accentColor: "text-pink-600 dark:text-pink-400",
    bgAccent: "bg-pink-500/10",
    borderAccent: "border-pink-500/20",
    gradientBar: "from-pink-500 to-pink-400",
  },
};

export function WorkflowCategoryGrid({ onSelectCategory }: WorkflowCategoryGridProps) {
  const reducedMotion = useReducedMotion();
  const { org, departmentMetrics, workflows, personas } = useAppStore();

  // Group workflows by department through the persona → blueprint relationship
  const getWorkflowsByDepartment = (departmentId: string) => {
    const deptPersonas = personas.filter((p) => p.departmentId === departmentId);
    const personaIds = deptPersonas.map((p) => p.id);

    return workflows.filter((w) => {
      if (!w.blueprintId) return false;
      // Blueprint ID format is "blueprint-persona-X"
      const personaId = w.blueprintId.replace("blueprint-", "");
      return personaIds.includes(personaId);
    });
  };

  const departments = org?.departments || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="h-full overflow-auto p-6">
      {/* Header */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-foreground">
          Workflow Categories
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a department to view its automated workflows
        </p>
      </motion.div>

      {/* Category Grid */}
      <motion.div
        variants={reducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {departments.map((dept) => {
          const config = departmentConfig[dept.id] || departmentConfig["dept-1"];
          const deptWorkflows = getWorkflowsByDepartment(dept.id);
          const metrics = departmentMetrics.find((m) => m.departmentId === dept.id);
          const activeCount = deptWorkflows.filter((w) => w.status === "active").length;

          return (
            <motion.button
              key={dept.id}
              variants={reducedMotion ? {} : cardVariants}
              whileHover={reducedMotion ? {} : { scale: 1.02, y: -2 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
              onClick={() => onSelectCategory(dept.id)}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card text-left transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              {/* Gradient accent bar */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                  config.gradientBar
                )}
              />

              {/* Content */}
              <div className="p-5">
                {/* Icon and Title */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-2xl ring-1 ring-border/50 group-hover:ring-primary/20 transition-all">
                      {config.emoji}
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground text-lg">
                        {dept.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {dept.headCount} employees
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                </div>

                {/* Workflow Count */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5 text-sm">
                    <Workflow className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{deptWorkflows.length}</span>
                    <span className="text-muted-foreground">
                      workflow{deptWorkflows.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {activeCount > 0 && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm border",
                        "bg-emerald-500/10 border-emerald-500/20"
                      )}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {activeCount} active
                      </span>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2">
                    <Activity className={cn("h-4 w-4", config.accentColor)} />
                    <div>
                      <p className="text-xs text-muted-foreground">Coverage</p>
                      <p className={cn("text-sm font-semibold", config.accentColor)}>
                        {metrics?.automationCoverage || 0}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className={cn("h-4 w-4", config.accentColor)} />
                    <div>
                      <p className="text-xs text-muted-foreground">Saved/wk</p>
                      <p className={cn("text-sm font-semibold", config.accentColor)}>
                        {metrics?.timeSavedPerWeek || 0}h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Summary Footer */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-center justify-center gap-6 rounded-xl border bg-muted/30 px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <Workflow className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{workflows.length}</span> total workflows
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {workflows.filter((w) => w.status === "active").length}
            </span>{" "}
            active
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {departmentMetrics.reduce((acc, m) => acc + m.timeSavedPerWeek, 0)}h
            </span>{" "}
            saved weekly
          </span>
        </div>
      </motion.div>
    </div>
  );
}
