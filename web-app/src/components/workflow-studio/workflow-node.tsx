"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ClipboardCheck,
  Plug,
  Bot,
  GitBranch,
  Play,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { WorkflowNode as WorkflowNodeType } from "@/mocks/types";

interface WorkflowNodeProps {
  node: WorkflowNodeType;
  isSelected: boolean;
  onClick: () => void;
}

const nodeIcons: Record<WorkflowNodeType["type"], typeof Zap> = {
  trigger: Play,
  task: Zap,
  approval: ClipboardCheck,
  integration: Plug,
  agent: Bot,
  condition: GitBranch,
};

const nodeColors: Record<WorkflowNodeType["type"], string> = {
  trigger: "border-primary bg-primary/5 text-primary",
  task: "border-amber-500 bg-amber-500/5 text-amber-500",
  approval: "border-blue-500 bg-blue-500/5 text-blue-500",
  integration: "border-purple-500 bg-purple-500/5 text-purple-500",
  agent: "border-success bg-success/5 text-success",
  condition: "border-orange-500 bg-orange-500/5 text-orange-500",
};

export function WorkflowNode({ node, isSelected, onClick }: WorkflowNodeProps) {
  const reducedMotion = useReducedMotion();
  const Icon = nodeIcons[node.type];

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: isSelected ? 1.02 : 1,
        boxShadow: isSelected
          ? "0 0 0 2px var(--ring), 0 4px 12px -2px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.15,
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
      onClick={onClick}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
      }}
      className={cn(
        "cursor-pointer rounded-lg border-2 bg-background p-3 transition-colors",
        nodeColors[node.type],
        isSelected && "ring-2 ring-ring ring-offset-2"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            nodeColors[node.type]
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{node.label}</p>
          <p className="text-xs capitalize text-muted-foreground">
            {node.type}
          </p>
        </div>
      </div>

      {/* Connection points */}
      {node.type !== "trigger" && (
        <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
      )}
      {node.connections.length > 0 && (
        <div className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
      )}
    </motion.div>
  );
}
