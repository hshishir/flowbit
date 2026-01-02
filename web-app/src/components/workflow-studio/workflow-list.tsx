"use client";

import { motion } from "framer-motion";
import { Workflow, Play, Pause, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export function WorkflowList() {
  const reducedMotion = useReducedMotion();
  const { workflows, selectedWorkflowId, setSelectedWorkflowId } = useAppStore();

  const getStatusColor = (status: WorkflowType["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "paused":
        return "bg-warning text-warning-foreground";
      case "draft":
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex h-full flex-col border-r bg-muted/30">
      <div className="border-b p-4">
        <h2 className="font-semibold">Workflows</h2>
        <p className="text-xs text-muted-foreground">
          {workflows.length} workflow{workflows.length !== 1 && "s"}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {workflows.map((workflow, index) => {
            const isSelected = workflow.id === selectedWorkflowId;

            return (
              <motion.button
                key={workflow.id}
                initial={reducedMotion ? {} : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedWorkflowId(workflow.id)}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors",
                  isSelected
                    ? "bg-background shadow-sm ring-1 ring-border"
                    : "hover:bg-background/50"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isSelected ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <Workflow
                    className={cn(
                      "h-4 w-4",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "truncate text-sm font-medium",
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {workflow.name}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px]", getStatusColor(workflow.status))}
                    >
                      {workflow.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {workflow.runCount} runs
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
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
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <Button variant="outline" className="w-full" size="sm">
          <Workflow className="mr-2 h-4 w-4" />
          New Workflow
        </Button>
      </div>
    </div>
  );
}
