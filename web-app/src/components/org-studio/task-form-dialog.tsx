"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  X,
  Clock,
  Zap,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Task } from "@/mocks/types";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSubmit: (taskData: Omit<Task, "id">) => void;
  mode: "add" | "edit";
}

const defaultTask: Omit<Task, "id"> = {
  name: "",
  description: "",
  type: "repetitive",
  timePerWeek: 1,
  painPoints: [],
  automationPotential: "medium",
  currentTools: [],
  assignedTo: "human",
};

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSubmit,
  mode,
}: TaskFormDialogProps) {
  const [formData, setFormData] = useState<Omit<Task, "id">>(defaultTask);
  const [painPointInput, setPainPointInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task && mode === "edit") {
      setFormData({
        name: task.name,
        description: task.description,
        type: task.type,
        timePerWeek: task.timePerWeek,
        painPoints: [...task.painPoints],
        automationPotential: task.automationPotential,
        currentTools: [...task.currentTools],
        assignedTo: task.assignedTo,
      });
    } else if (mode === "add") {
      setFormData(defaultTask);
    }
    setErrors({});
    setPainPointInput("");
    setToolInput("");
  }, [task, mode, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Task name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.timePerWeek <= 0) {
      newErrors.timePerWeek = "Hours must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  const addPainPoint = () => {
    if (painPointInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        painPoints: [...prev.painPoints, painPointInput.trim()],
      }));
      setPainPointInput("");
    }
  };

  const removePainPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.filter((_, i) => i !== index),
    }));
  };

  const addTool = () => {
    if (toolInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        currentTools: [...prev.currentTools, toolInput.trim()],
      }));
      setToolInput("");
    }
  };

  const removeTool = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    action: () => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "add" ? (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                Add New Task
              </>
            ) : (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Pencil className="h-4 w-4 text-primary" />
                </div>
                Edit Task
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new task for this persona. Fill in the details below."
              : "Update the task details. Changes will be saved automatically."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Task Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Process customer inquiries"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </Label>
            <Input
              id="description"
              placeholder="Describe what this task involves..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className={cn(errors.description && "border-destructive")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <Separator />

          {/* Task Type and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Task Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Task["type"]) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="repetitive">Repetitive</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                  <SelectItem value="high-context">High Context</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timePerWeek" className="flex items-center gap-1.5 text-sm font-medium">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Hours/Week
              </Label>
              <Input
                id="timePerWeek"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.timePerWeek}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timePerWeek: parseFloat(e.target.value) || 0,
                  }))
                }
                className={cn(errors.timePerWeek && "border-destructive")}
              />
              {errors.timePerWeek && (
                <p className="text-xs text-destructive">{errors.timePerWeek}</p>
              )}
            </div>
          </div>

          {/* Automation Potential and Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                Automation Potential
              </Label>
              <Select
                value={formData.automationPotential}
                onValueChange={(value: Task["automationPotential"]) =>
                  setFormData((prev) => ({ ...prev, automationPotential: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      High
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-warning" />
                      Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                      Low
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Current Assignment</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value: Task["assignedTo"]) =>
                  setFormData((prev) => ({ ...prev, assignedTo: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="human">Human</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Pain Points */}
          <div className="space-y-3">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              Pain Points
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a pain point..."
                value={painPointInput}
                onChange={(e) => setPainPointInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addPainPoint)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPainPoint}
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <AnimatePresence mode="popLayout">
              {formData.painPoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {formData.painPoints.map((point, index) => (
                    <motion.div
                      key={`${point}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      <Badge
                        variant="secondary"
                        className="gap-1.5 py-1 pr-1.5"
                      >
                        <span className="max-w-[180px] truncate">{point}</span>
                        <button
                          type="button"
                          onClick={() => removePainPoint(index)}
                          className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current Tools */}
          <div className="space-y-3">
            <Label className="flex items-center gap-1.5 text-sm font-medium">
              <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
              Current Tools
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tool..."
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, addTool)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTool}
                className="shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <AnimatePresence mode="popLayout">
              {formData.currentTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {formData.currentTools.map((tool, index) => (
                    <motion.div
                      key={`${tool}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout
                    >
                      <Badge variant="outline" className="gap-1.5 py-1 pr-1.5">
                        <span className="max-w-[180px] truncate">{tool}</span>
                        <button
                          type="button"
                          onClick={() => removeTool(index)}
                          className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Add Task" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
