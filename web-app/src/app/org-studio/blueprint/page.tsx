"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Workflow,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Download,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { SplitView } from "@/components/blueprint/split-view";
import { KpiStrip } from "@/components/shared/kpi-strip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { toast } from "sonner";

export default function BlueprintPage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const {
    currentBlueprint,
    updateBlueprintTask,
    personas,
    generateBlueprint,
    isGeneratingBlueprint,
  } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMoveTask = (taskId: string, newAssignment: "human" | "ai") => {
    if (currentBlueprint) {
      updateBlueprintTask(currentBlueprint.id, taskId, newAssignment);
      toast.success(
        `Task moved to ${newAssignment === "ai" ? "AI" : "Human"} column`
      );
    }
  };

  const handleRegenerate = async () => {
    if (currentBlueprint) {
      await generateBlueprint(currentBlueprint.personaId);
      toast.success("Blueprint regenerated!");
    }
  };

  const handleImplement = () => {
    const params = new URLSearchParams();
    if (persona?.departmentId) {
      params.set("departmentId", persona.departmentId);
    }
    if (currentBlueprint?.personaName) {
      params.set("personaName", currentBlueprint.personaName);
    }
    router.push(`/workflow-studio?${params.toString()}`);
  };

  const kpis = currentBlueprint
    ? [
        {
          label: "Time Saved/Week",
          value: currentBlueprint.metrics.timeSavedPerWeek,
          suffix: "h",
          icon: Clock,
        },
        {
          label: "Automation Coverage",
          value: currentBlueprint.metrics.automationCoverage,
          suffix: "%",
          icon: TrendingUp,
        },
        {
          label: "Workflows to Create",
          value: currentBlueprint.metrics.workflowCount,
          icon: Workflow,
        },
        {
          label: "Est. Cost Savings",
          value: currentBlueprint.metrics.estimatedCostSavings,
          prefix: "$",
          icon: DollarSign,
        },
      ]
    : [];

  const persona = currentBlueprint
    ? personas.find((p) => p.id === currentBlueprint.personaId)
    : null;

  const topBarActions = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleRegenerate}
        disabled={isGeneratingBlueprint}
      >
        <RefreshCw
          className={`mr-2 h-4 w-4 ${isGeneratingBlueprint ? "animate-spin" : ""}`}
        />
        Regenerate
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button size="sm" onClick={handleImplement} className="gap-2">
        Implement in Workflow Studio
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <AppShell title="Blueprint" actions={topBarActions}>
        <div className="space-y-6 p-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-6">
            <Skeleton className="h-96 flex-1" />
            <Skeleton className="h-96 flex-1" />
          </div>
        </div>
      </AppShell>
    );
  }

  if (!currentBlueprint) {
    return (
      <AppShell title="Blueprint">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Blueprint Generated</h2>
            <p className="mt-2 text-muted-foreground">
              Select a persona and generate an AI blueprint to get started.
            </p>
            <Button
              className="mt-6"
              onClick={() => router.push("/org-studio")}
            >
              Go to Org Studio
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="AI Blueprint" actions={topBarActions}>
      <PageTransition>
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="space-y-6 p-6"
        >
          {/* Blueprint Header */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Blueprint for {currentBlueprint.personaName}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      AI-generated transformation plan based on task analysis
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Generated{" "}
                    {new Date(currentBlueprint.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Persona</p>
                    <p className="font-medium">{persona?.name || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{persona?.department || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="font-medium">
                      {currentBlueprint.humanTasks.length +
                        currentBlueprint.aiTasks.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* KPI Strip */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <KpiStrip items={kpis} />
          </motion.div>

          {/* Hybrid Role Definition */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Hybrid Role Definition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Human Responsibilities
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Strategic decision-making</li>
                      <li>Complex relationship management</li>
                      <li>Exception handling and escalations</li>
                      <li>Quality oversight and approvals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      AI Responsibilities
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Data entry and processing</li>
                      <li>Routine communications</li>
                      <li>Report generation</li>
                      <li>Pattern-based task execution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Split View */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Task Assignment</h2>
              <p className="text-sm text-muted-foreground">
                Drag tasks between columns or click the move button to reassign
              </p>
            </div>
            <SplitView
              blueprint={currentBlueprint}
              onMoveTask={handleMoveTask}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={reducedMotion ? {} : staggerItem}
            className="flex justify-center pt-4"
          >
            <Button size="lg" onClick={handleImplement} className="gap-2">
              Implement in Workflow Studio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </PageTransition>
    </AppShell>
  );
}
