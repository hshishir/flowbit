"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Workflow,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Activity,
  MoreVertical,
  Plus,
  TrendingUp,
  Code2,
  Users,
  Settings,
  DollarSign,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Workflow as WorkflowType } from "@/mocks/types";

interface WorkflowCategoryListProps {
  departmentId: string;
  onBack: () => void;
  onSelectWorkflow: (workflowId: string) => void;
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

export function WorkflowCategoryList({
  departmentId,
  onBack,
  onSelectWorkflow,
}: WorkflowCategoryListProps) {
  const reducedMotion = useReducedMotion();
  const { org, workflows, personas, departmentMetrics } = useAppStore();

  const department = org?.departments.find((d) => d.id === departmentId);
  const config = departmentConfig[departmentId] || departmentConfig["dept-1"];
  const metrics = departmentMetrics.find((m) => m.departmentId === departmentId);

  // Get workflows for this department
  const getWorkflowsForDepartment = () => {
    const deptPersonas = personas.filter((p) => p.departmentId === departmentId);
    const personaIds = deptPersonas.map((p) => p.id);

    return workflows.filter((w) => {
      if (!w.blueprintId) return false;
      const personaId = w.blueprintId.replace("blueprint-", "");
      return personaIds.includes(personaId);
    });
  };

  const categoryWorkflows = getWorkflowsForDepartment();

  const getStatusConfig = (status: WorkflowType["status"]) => {
    switch (status) {
      case "active":
        return {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20",
          icon: Play,
        };
      case "paused":
        return {
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
          icon: Pause,
        };
      case "draft":
        return {
          color: "text-slate-500 dark:text-slate-400",
          bg: "bg-slate-500/10",
          border: "border-slate-500/20",
          icon: Clock,
        };
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
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
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Categories
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl text-3xl",
                "bg-muted/50 ring-1 ring-border/50"
              )}
            >
              {config.emoji}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {department?.name || "Department"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {categoryWorkflows.length} workflow
                {categoryWorkflows.length !== 1 ? "s" : ""} in this category
              </p>
            </div>
          </div>

          {/* Create Workflow Button */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" as const, stiffness: 300, damping: 20 }}
          >
            <Button
              size="sm"
              className={cn(
                "gap-2 shadow-sm transition-all duration-300",
                "hover:shadow-md hover:scale-105"
              )}
            >
              <Plus className="h-4 w-4" />
              New Workflow
            </Button>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 border",
              config.bgAccent,
              config.borderAccent
            )}
          >
            <Activity className={cn("h-4 w-4", config.accentColor)} />
            <span className={cn("text-sm font-medium", config.accentColor)}>
              {metrics?.automationCoverage || 0}% coverage
            </span>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 border",
              config.bgAccent,
              config.borderAccent
            )}
          >
            <Clock className={cn("h-4 w-4", config.accentColor)} />
            <span className={cn("text-sm font-medium", config.accentColor)}>
              {metrics?.timeSavedPerWeek || 0}h saved/week
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {categoryWorkflows.filter((w) => w.status === "active").length} active
            </span>
          </div>
        </div>
      </motion.div>

      {/* Workflow Cards Grid */}
      {categoryWorkflows.length === 0 ? (
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
            <Workflow className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-4 text-lg font-medium text-foreground">No workflows yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Click "New Workflow" above to create your first workflow
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categoryWorkflows.map((workflow) => {
            const statusConfig = getStatusConfig(workflow.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.button
                key={workflow.id}
                variants={reducedMotion ? {} : cardVariants}
                whileHover={reducedMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
                onClick={() => onSelectWorkflow(workflow.id)}
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
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 ring-1 ring-border/50">
                      <Workflow className={cn("h-5 w-5", config.accentColor)} />
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "flex items-center gap-1 text-xs",
                          statusConfig.color,
                          statusConfig.bg,
                          statusConfig.border
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {workflow.status}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            {workflow.status === "active" ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" /> Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" /> Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-3 font-semibold text-foreground line-clamp-2">
                    {workflow.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {workflow.description}
                  </p>

                  {/* Metrics */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/50 pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Runs</p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatNumber(workflow.runCount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {workflow.successRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last run</p>
                      <p className="text-sm font-medium text-muted-foreground">
                        {workflow.lastRun ? formatDate(workflow.lastRun) : "Never"}
                      </p>
                    </div>
                  </div>

                  {/* Node count indicator */}
                  <div className="mt-3 flex items-center gap-1 text-muted-foreground">
                    <div className="flex -space-x-1">
                      {workflow.nodes.slice(0, 4).map((_, i) => (
                        <div
                          key={i}
                          className="h-2 w-2 rounded-full border border-card bg-muted"
                        />
                      ))}
                      {workflow.nodes.length > 4 && (
                        <span className="ml-1 text-xs">
                          +{workflow.nodes.length - 4}
                        </span>
                      )}
                    </div>
                    <span className="ml-2 text-xs">
                      {workflow.nodes.length} steps
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
