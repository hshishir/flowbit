"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Workflow, Sparkles } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface NewWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, description: string) => void;
  departmentName?: string;
  defaultName?: string;
}

export function NewWorkflowDialog({
  open,
  onOpenChange,
  onSubmit,
  departmentName,
  defaultName,
}: NewWorkflowDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setName(defaultName || "");
      setDescription("");
      setError("");
    }
  }, [open, defaultName]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Workflow name is required");
      return;
    }
    onSubmit(name.trim(), description.trim());
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
            >
              <Workflow className="h-5 w-5 text-primary" />
            </motion.div>
            <span>Create New Workflow</span>
          </DialogTitle>
          <DialogDescription>
            {departmentName
              ? `Create a new workflow in ${departmentName}`
              : "Set up your new workflow with a name and description"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="workflow-name" className="text-sm font-medium">
              Workflow Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="workflow-name"
              placeholder="e.g., Lead Qualification Process"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              className={cn(error && "border-destructive")}
              autoFocus
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="workflow-description" className="text-sm font-medium">
              Description <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="workflow-description"
              placeholder="Describe what this workflow does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs text-muted-foreground">
              Your workflow will start with a trigger node. Add more steps from the
              palette on the left side of the editor.
            </p>
          </motion.div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Workflow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
