"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ClipboardList, TrendingUp, Save } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { TaskTable } from "@/components/org-studio/task-table";
import { AiSuggestionsPanel } from "@/components/org-studio/ai-suggestions-panel";
import { TaskDetailSheet } from "@/components/org-studio/task-detail-sheet";
import { TaskFormDialog } from "@/components/org-studio/task-form-dialog";
import { GenerateBlueprintButton } from "@/components/org-studio/generate-blueprint-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Task } from "@/mocks/types";

export default function PersonaDetailPage() {
  const params = useParams();
  const personaId = params.id as string;
  const reducedMotion = useReducedMotion();

  const { getPersonaById, setSelectedPersonaId, addTask, updateTask, deleteTask } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const persona = getPersonaById(personaId);

  useEffect(() => {
    setSelectedPersonaId(personaId);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [personaId, setSelectedPersonaId]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };

  const handleAddTask = () => {
    setFormMode("add");
    setTaskToEdit(null);
    setFormDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setFormMode("edit");
    setTaskToEdit(task);
    setFormDialogOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(personaId, task.id);
    toast.success("Task deleted", {
      description: `"${task.name}" has been removed.`,
    });
  };

  const handleFormSubmit = (taskData: Omit<Task, "id">) => {
    if (formMode === "add") {
      addTask(personaId, taskData);
      toast.success("Task added", {
        description: `"${taskData.name}" has been created.`,
      });
    } else if (taskToEdit) {
      updateTask(personaId, taskToEdit.id, taskData);
      toast.success("Task updated", {
        description: `"${taskData.name}" has been saved.`,
      });
    }
  };

  const getReadinessBadgeClass = (readiness: string) => {
    switch (readiness) {
      case "high":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      default:
        return "";
    }
  };

  const topBarActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </Button>
      {persona && <GenerateBlueprintButton personaId={persona.id} />}
    </div>
  );

  if (isLoading) {
    return (
      <AppShell title="Loading..." actions={topBarActions}>
        <div className="flex gap-6 p-6">
          <div className="flex-1 space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="w-80 space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </AppShell>
    );
  }

  if (!persona) {
    return (
      <AppShell title="Persona Not Found">
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Persona not found.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={persona.name} actions={topBarActions}>
      <PageTransition>
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="flex gap-6 p-6"
        >
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Persona Header */}
            <motion.div
              variants={reducedMotion ? {} : staggerItem}
              className="rounded-lg border bg-card p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{persona.name}</h1>
                    <Badge
                      className={cn(
                        "capitalize",
                        getReadinessBadgeClass(persona.automationReadiness)
                      )}
                    >
                      {persona.automationReadiness} readiness
                    </Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {persona.role} • {persona.department}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks</p>
                    <p className="font-semibold">{persona.taskCount}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours/Week</p>
                    <p className="font-semibold">
                      {persona.estimatedHoursPerWeek}h
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Automatable Time
                    </p>
                    <p className="font-semibold">
                      {persona.tasks
                        .filter((t) => t.automationPotential === "high")
                        .reduce((acc, t) => acc + t.timePerWeek, 0)}
                      h
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tasks Section */}
            <motion.div variants={reducedMotion ? {} : staggerItem}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tasks</h2>
              </div>
              <TaskTable
                tasks={persona.tasks}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            </motion.div>
          </div>

          {/* AI Suggestions Sidebar */}
          <AiSuggestionsPanel tasks={persona.tasks} />
        </motion.div>
      </PageTransition>

      {/* Task Detail Sheet */}
      <TaskDetailSheet
        task={selectedTask}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {/* Task Form Dialog */}
      <TaskFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        task={taskToEdit}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />
    </AppShell>
  );
}
