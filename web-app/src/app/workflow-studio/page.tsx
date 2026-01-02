"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Power, Save } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { WorkflowList } from "@/components/workflow-studio/workflow-list";
import { StepPalette } from "@/components/workflow-studio/step-palette";
import { Canvas } from "@/components/workflow-studio/canvas";
import { PropertiesPanel } from "@/components/workflow-studio/properties-panel";
import { TestRunner } from "@/components/workflow-studio/test-runner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WorkflowStudioPage() {
  const reducedMotion = useReducedMotion();
  const { workflows, selectedWorkflowId } = useAppStore();
  const [testRunnerOpen, setTestRunnerOpen] = useState(false);

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId);

  const handleSave = () => {
    toast.success("Workflow saved successfully");
  };

  const handleActivate = () => {
    toast.success(
      selectedWorkflow?.status === "active"
        ? "Workflow paused"
        : "Workflow activated"
    );
  };

  const topBarActions = selectedWorkflow && (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className={cn(
          selectedWorkflow.status === "active" && "bg-success/10 text-success",
          selectedWorkflow.status === "paused" && "bg-warning/10 text-warning"
        )}
      >
        {selectedWorkflow.status}
      </Badge>
      <Button variant="outline" size="sm" onClick={() => setTestRunnerOpen(true)}>
        <Play className="mr-2 h-4 w-4" />
        Test
      </Button>
      <Button variant="outline" size="sm" onClick={handleSave}>
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button size="sm" onClick={handleActivate}>
        <Power className="mr-2 h-4 w-4" />
        {selectedWorkflow.status === "active" ? "Pause" : "Activate"}
      </Button>
    </div>
  );

  if (!selectedWorkflow) {
    return (
      <AppShell title="Workflow Studio">
        <div className="flex h-full">
          <div className="w-64">
            <WorkflowList />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">
              Select a workflow to get started
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={selectedWorkflow.name} actions={topBarActions}>
      <PageTransition className="flex h-full">
        <div className="flex h-full w-full">
          {/* Left Panel - Workflow List + Step Palette */}
          <div className="flex w-64 flex-col">
            <div className="flex-1">
              <WorkflowList />
            </div>
            <StepPalette />
          </div>

          {/* Center - Canvas */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 overflow-hidden"
          >
            <Canvas workflow={selectedWorkflow} />
          </motion.div>

          {/* Right Panel - Properties */}
          <PropertiesPanel />
        </div>
      </PageTransition>

      <TestRunner
        open={testRunnerOpen}
        onOpenChange={setTestRunnerOpen}
        workflowName={selectedWorkflow.name}
      />
    </AppShell>
  );
}
