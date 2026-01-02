"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Clock, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { BlueprintTask } from "@/mocks/types";

interface TaskItemProps {
  task: BlueprintTask;
  column: "human" | "ai";
  onMove: (taskId: string, newAssignment: "human" | "ai") => void;
}

export function TaskItem({ task, column, onMove }: TaskItemProps) {
  const reducedMotion = useReducedMotion();
  const isAi = column === "ai";

  return (
    <motion.div
      layout={!reducedMotion}
      layoutId={reducedMotion ? undefined : task.id}
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
      className={cn(
        "group relative rounded-lg border bg-card p-4 transition-shadow hover:shadow-md",
        isAi && "border-success/20 bg-success/5"
      )}
    >
      {/* Drag handle (visual only) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-50">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="pl-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h4 className="font-medium leading-tight">{task.name}</h4>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize">
                {task.type.replace("-", " ")}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{Math.round(task.confidence * 100)}% confidence</span>
              </div>
            </div>
          </div>

          {/* Move button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(task.id, isAi ? "human" : "ai")}
            className={cn(
              "shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100",
              isAi ? "text-muted-foreground" : "text-success"
            )}
          >
            {isAi ? (
              <>
                <ArrowLeft className="h-3.5 w-3.5" />
                To Human
              </>
            ) : (
              <>
                To AI
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        {/* Reasoning */}
        <p className="mt-2 text-xs text-muted-foreground">{task.reasoning}</p>
      </div>
    </motion.div>
  );
}
