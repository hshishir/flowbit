"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ListTodo,
  Zap,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Department, Persona } from "@/mocks/types";

interface DepartmentWithMetrics extends Department {
  personas_data: Persona[];
  totalTasks: number;
  automationReadiness: "high" | "medium" | "low";
  avgAutomationScore: number;
}

export function DepartmentCards() {
  const reducedMotion = useReducedMotion();
  const { org, personas, setSelectedPersonaId } = useAppStore();
  const [expandedDepartment, setExpandedDepartment] = useState<string | null>(null);

  // Calculate department metrics
  const departmentsWithMetrics: DepartmentWithMetrics[] = useMemo(() => {
    if (!org) return [];

    return org.departments.map((dept) => {
      const deptPersonas = personas.filter((p) => p.departmentId === dept.id);
      const totalTasks = deptPersonas.reduce((sum, p) => sum + p.taskCount, 0);

      // Calculate average automation readiness
      const readinessScores = deptPersonas.map((p) =>
        p.automationReadiness === "high" ? 3 : p.automationReadiness === "medium" ? 2 : 1
      );
      const avgScore =
        readinessScores.length > 0
          ? readinessScores.reduce((a, b) => a + b, 0) / readinessScores.length
          : 0;

      const automationReadiness: "high" | "medium" | "low" =
        avgScore >= 2.5 ? "high" : avgScore >= 1.5 ? "medium" : "low";

      return {
        ...dept,
        personas_data: deptPersonas,
        totalTasks,
        automationReadiness,
        avgAutomationScore: Math.round(avgScore * 33.33),
      };
    });
  }, [org, personas]);

  const toggleDepartment = (deptId: string) => {
    setExpandedDepartment(expandedDepartment === deptId ? null : deptId);
  };

  const getReadinessConfig = (readiness: "high" | "medium" | "low") => {
    switch (readiness) {
      case "high":
        return {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          glow: "shadow-emerald-500/5",
          label: "High Readiness",
          icon: Sparkles,
        };
      case "medium":
        return {
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
          glow: "shadow-amber-500/5",
          label: "Medium Readiness",
          icon: TrendingUp,
        };
      case "low":
        return {
          color: "text-slate-500 dark:text-slate-400",
          bg: "bg-slate-500/10",
          border: "border-slate-500/20",
          glow: "shadow-slate-500/5",
          label: "Low Readiness",
          icon: Zap,
        };
    }
  };

  const getDepartmentIcon = (deptName: string) => {
    const icons: Record<string, string> = {
      Sales: "📈",
      Marketing: "🎯",
      Engineering: "⚙️",
      "Human Resources": "👥",
      Operations: "🔧",
      Finance: "💰",
    };
    return icons[deptName] || "🏢";
  };

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

  const expandVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
        opacity: { duration: 0.2 },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
  };

  const personaVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  if (!org || departmentsWithMetrics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <p className="text-muted-foreground">No departments found.</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Import your organization to get started.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={reducedMotion ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {departmentsWithMetrics.map((dept, index) => {
        const isExpanded = expandedDepartment === dept.id;
        const readinessConfig = getReadinessConfig(dept.automationReadiness);
        const ReadinessIcon = readinessConfig.icon;

        return (
          <motion.div
            key={dept.id}
            variants={reducedMotion ? {} : cardVariants}
            layout
            className={cn(
              "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300",
              "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
              isExpanded && "sm:col-span-2 lg:col-span-3 border-primary/30 shadow-lg shadow-primary/10"
            )}
          >
            {/* Gradient accent bar */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 transition-all duration-300",
                dept.automationReadiness === "high" && "bg-gradient-to-r from-emerald-500 to-emerald-400",
                dept.automationReadiness === "medium" && "bg-gradient-to-r from-amber-500 to-amber-400",
                dept.automationReadiness === "low" && "bg-gradient-to-r from-slate-400 to-slate-300"
              )}
            />

            {/* Card Header - Clickable */}
            <button
              onClick={() => toggleDepartment(dept.id)}
              className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-t-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Department Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-2xl ring-1 ring-border/50 group-hover:ring-primary/20 transition-all">
                    {getDepartmentIcon(dept.name)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground truncate text-lg">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dept.headCount} employees
                    </p>
                  </div>
                </div>

                {/* Expand Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mt-1"
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
              </div>

              {/* Metrics Row */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Personas Count */}
                <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5 text-sm">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{dept.personas_data.length}</span>
                  <span className="text-muted-foreground">personas</span>
                </div>

                {/* Tasks Count */}
                <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1.5 text-sm">
                  <ListTodo className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{dept.totalTasks}</span>
                  <span className="text-muted-foreground">tasks</span>
                </div>

                {/* Automation Readiness Badge */}
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm border",
                    readinessConfig.bg,
                    readinessConfig.border
                  )}
                >
                  <ReadinessIcon className={cn("h-3.5 w-3.5", readinessConfig.color)} />
                  <span className={cn("font-medium", readinessConfig.color)}>
                    {readinessConfig.label}
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded Content - Personas List */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  variants={reducedMotion ? {} : expandVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="border-t border-border/50 bg-muted/20 px-5 py-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Personas in {dept.name}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {dept.personas_data.map((persona, i) => (
                        <motion.div
                          key={persona.id}
                          custom={i}
                          variants={reducedMotion ? {} : personaVariants}
                          initial="hidden"
                          animate="visible"
                          className="group/persona flex items-center justify-between rounded-lg border border-border/50 bg-card p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Avatar placeholder */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {persona.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>

                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {persona.name}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {persona.role}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Task count */}
                            <span className="text-sm text-muted-foreground tabular-nums">
                              {persona.taskCount} tasks
                            </span>

                            {/* Readiness badge */}
                            <Badge
                              variant={
                                persona.automationReadiness === "high"
                                  ? "default"
                                  : persona.automationReadiness === "medium"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={cn(
                                "capitalize text-xs",
                                persona.automationReadiness === "high" &&
                                  "bg-emerald-500/90 text-white hover:bg-emerald-500"
                              )}
                            >
                              {persona.automationReadiness}
                            </Badge>

                            {/* View button */}
                            <Button
                              asChild
                              variant="ghost"
                              size="sm"
                              className="gap-1 opacity-0 group-hover/persona:opacity-100 transition-opacity"
                              onClick={() => setSelectedPersonaId(persona.id)}
                            >
                              <Link href={`/org-studio/personas/${persona.id}`}>
                                View
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      ))}

                      {dept.personas_data.length === 0 && (
                        <div className="py-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            No personas defined for this department yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
