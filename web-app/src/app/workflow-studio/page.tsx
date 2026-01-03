"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Power, Save, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { WorkflowCategoryGrid } from "@/components/workflow-studio/workflow-category-grid";
import { WorkflowCategoryList } from "@/components/workflow-studio/workflow-category-list";
import { StepPalette } from "@/components/workflow-studio/step-palette";
import { Canvas } from "@/components/workflow-studio/canvas";
import { PropertiesPanel } from "@/components/workflow-studio/properties-panel";
import { TestRunner } from "@/components/workflow-studio/test-runner";
import { NewWorkflowDialog } from "@/components/workflow-studio/new-workflow-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ViewState = "categories" | "workflows" | "editor";

function WorkflowStudioLoading() {
  return (
    <AppShell title="Workflow Studio">
      <div className="flex h-full items-center justify-center">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    </AppShell>
  );
}

export default function WorkflowStudioPage() {
  return (
    <Suspense fallback={<WorkflowStudioLoading />}>
      <WorkflowStudioContent />
    </Suspense>
  );
}

function WorkflowStudioContent() {
  const reducedMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const { workflows, selectedWorkflowId, setSelectedWorkflowId, selectedNodeId, org, createWorkflow } = useAppStore();
  const [testRunnerOpen, setTestRunnerOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showNewWorkflowDialog, setShowNewWorkflowDialog] = useState(false);
  const [pendingPersonaName, setPendingPersonaName] = useState<string | null>(null);

  const selectedWorkflow = workflows.find((w) => w.id === selectedWorkflowId);
  const selectedDepartment = org?.departments.find((d) => d.id === selectedCategoryId);

  // Handle incoming navigation from Blueprint page
  useEffect(() => {
    const departmentId = searchParams.get("departmentId");
    const personaName = searchParams.get("personaName");

    if (departmentId && org?.departments.some((d) => d.id === departmentId)) {
      setSelectedCategoryId(departmentId);
      setViewState("workflows");
      setPendingPersonaName(personaName);
      // Show dialog after a brief delay to allow view transition
      setTimeout(() => {
        setShowNewWorkflowDialog(true);
      }, 300);
    }
  }, [searchParams, org]);

  const handleSelectCategory = (departmentId: string) => {
    setSelectedCategoryId(departmentId);
    setViewState("workflows");
  };

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setViewState("editor");
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setViewState("categories");
  };

  const handleBackToWorkflows = () => {
    setSelectedWorkflowId(null);
    setViewState("workflows");
  };

  const handleCreateWorkflow = (departmentId: string, name: string, description: string) => {
    const department = org?.departments.find((d) => d.id === departmentId);
    createWorkflow(
      name,
      description || "No description provided",
      departmentId
    );
    toast.success("Workflow created", {
      description: `"${name}" created in ${department?.name || "department"}`,
    });
    setPendingPersonaName(null);
    setViewState("editor");
  };

  // Handler for dialog opened from Blueprint navigation
  const handleDialogCreateWorkflow = (name: string, description: string) => {
    if (selectedCategoryId) {
      handleCreateWorkflow(selectedCategoryId, name, description);
      setShowNewWorkflowDialog(false);
    }
  };

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

  // Get page title based on current view
  const getPageTitle = () => {
    if (viewState === "editor" && selectedWorkflow) {
      return selectedWorkflow.name;
    }
    if (viewState === "workflows" && selectedDepartment) {
      return `${selectedDepartment.name} Workflows`;
    }
    return "Workflow Studio";
  };

  // Get top bar actions based on current view
  const getTopBarActions = () => {
    if (viewState === "editor" && selectedWorkflow) {
      return (
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
    }
    return null;
  };

  // Get left navigation button for editor view
  const getLeftNavigation = () => {
    if (viewState === "editor") {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToWorkflows}
          className="mr-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      );
    }
    return null;
  };

  return (
    <AppShell
      title={getPageTitle()}
      actions={getTopBarActions()}
      leftContent={getLeftNavigation()}
    >
      <PageTransition className="h-full">
        <AnimatePresence mode="wait">
          {/* Categories View */}
          {viewState === "categories" && (
            <motion.div
              key="categories"
              initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <WorkflowCategoryGrid onSelectCategory={handleSelectCategory} />
            </motion.div>
          )}

          {/* Workflows List View */}
          {viewState === "workflows" && selectedCategoryId && (
            <motion.div
              key="workflows"
              initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <WorkflowCategoryList
                departmentId={selectedCategoryId}
                onBack={handleBackToCategories}
                onSelectWorkflow={handleSelectWorkflow}
                onCreateWorkflow={handleCreateWorkflow}
              />
            </motion.div>
          )}

          {/* Workflow Editor View */}
          {viewState === "editor" && selectedWorkflow && (
            <motion.div
              key="editor"
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full w-full"
            >
              {/* Left Panel - Step Palette */}
              <div className="w-64 border-r bg-muted/30">
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

              {/* Right Panel - Properties (only shown when a node is selected) */}
              <AnimatePresence>
                {selectedNodeId && (
                  <motion.div
                    initial={reducedMotion ? {} : { x: 320, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={reducedMotion ? {} : { x: 320, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <PropertiesPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>

      {selectedWorkflow && (
        <TestRunner
          open={testRunnerOpen}
          onOpenChange={setTestRunnerOpen}
          workflowName={selectedWorkflow.name}
        />
      )}

      {/* New Workflow Dialog - triggered from Blueprint navigation */}
      <NewWorkflowDialog
        open={showNewWorkflowDialog}
        onOpenChange={(open) => {
          setShowNewWorkflowDialog(open);
          if (!open) setPendingPersonaName(null);
        }}
        onSubmit={handleDialogCreateWorkflow}
        departmentName={selectedDepartment?.name}
        defaultName={pendingPersonaName ? `Workflow for ${pendingPersonaName}` : undefined}
      />
    </AppShell>
  );
}
