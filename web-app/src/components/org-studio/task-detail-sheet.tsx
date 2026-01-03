"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  Wrench,
  Bot,
  User,
  TrendingUp,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Task } from "@/mocks/types";

interface TaskDetailSheetProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export function TaskDetailSheet({
  task,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: TaskDetailSheetProps) {
  const reducedMotion = useReducedMotion();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!task) return null;

  const handleEdit = () => {
    onEdit?.(task);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete?.(task);
    setShowDeleteConfirm(false);
    onOpenChange(false);
  };

  const getTypeBadgeVariant = (type: Task["type"]) => {
    switch (type) {
      case "repetitive":
        return "default";
      case "decision":
        return "secondary";
      case "high-context":
        return "outline";
    }
  };

  const getPotentialColor = (potential: Task["automationPotential"]) => {
    switch (potential) {
      case "high":
        return "text-success bg-success/10";
      case "medium":
        return "text-warning bg-warning/10";
      case "low":
        return "text-muted-foreground bg-muted";
    }
  };

  const getAssignmentIcon = (assignment: Task["assignedTo"]) => {
    switch (assignment) {
      case "ai":
        return <Bot className="h-4 w-4" />;
      case "human":
        return <User className="h-4 w-4" />;
      case "hybrid":
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="text-left">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <SheetTitle className="text-xl">{task.name}</SheetTitle>
              <SheetDescription>{task.description}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Time/Week</span>
              </div>
              <p className="mt-1 text-xl font-semibold">{task.timePerWeek}h</p>
            </div>
            <div
              className={cn("rounded-lg border p-3", getPotentialColor(task.automationPotential))}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Automation</span>
              </div>
              <p className="mt-1 text-xl font-semibold capitalize">
                {task.automationPotential}
              </p>
            </div>
          </div>

          <Separator />

          {/* Task Type */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Task Type
            </h4>
            <Badge
              variant={getTypeBadgeVariant(task.type)}
              className="capitalize"
            >
              {task.type.replace("-", " ")}
            </Badge>
          </div>

          {/* Current Assignment */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Current Assignment
            </h4>
            <div className="flex items-center gap-2">
              {getAssignmentIcon(task.assignedTo)}
              <span className="font-medium capitalize">{task.assignedTo}</span>
            </div>
          </div>

          <Separator />

          {/* Pain Points */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Pain Points
            </h4>
            {task.painPoints.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No pain points identified.
              </p>
            ) : (
              <ul className="space-y-2">
                {task.painPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={reducedMotion ? {} : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 rounded-lg bg-warning/5 p-2.5 text-sm"
                  >
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Current Tools */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Wrench className="h-4 w-4" />
              Current Tools
            </h4>
            {task.currentTools.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tools currently used.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {task.currentTools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* AI Recommendation */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h4 className="font-medium">AI Recommendation</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {task.automationPotential === "high"
                ? "This task is highly suitable for automation. It follows clear patterns and can be fully handled by AI agents."
                : task.automationPotential === "medium"
                ? "This task can be partially automated with AI assistance, but requires human oversight for edge cases."
                : "This task requires human judgment and context that AI cannot reliably provide. Keep it human-handled."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleEdit}
              disabled={!onEdit}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Task
            </Button>
            <Button className="flex-1">Include in Blueprint</Button>
          </div>

          {/* Delete Action */}
          <Button
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={!onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Task
          </Button>
        </div>
      </SheetContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                <Trash2 className="h-4 w-4 text-destructive" />
              </div>
              Delete Task
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{task.name}&rdquo;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
