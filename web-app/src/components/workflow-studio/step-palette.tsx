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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const stepTypes = [
  {
    type: "trigger",
    label: "Trigger",
    description: "Start your workflow",
    icon: Play,
    color: "text-primary",
  },
  {
    type: "task",
    label: "Task Step",
    description: "Execute an action",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    type: "approval",
    label: "Approval",
    description: "Human review point",
    icon: ClipboardCheck,
    color: "text-blue-500",
  },
  {
    type: "integration",
    label: "Integration",
    description: "Connect external tools",
    icon: Plug,
    color: "text-purple-500",
  },
  {
    type: "agent",
    label: "AI Agent",
    description: "AI-powered action",
    icon: Bot,
    color: "text-success",
  },
  {
    type: "condition",
    label: "Condition",
    description: "Branch logic",
    icon: GitBranch,
    color: "text-orange-500",
  },
];

export function StepPalette() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="border-t bg-muted/30">
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold">Step Palette</h3>
        <p className="text-xs text-muted-foreground">
          Drag steps to the canvas
        </p>
      </div>

      <ScrollArea className="h-48">
        <div className="grid grid-cols-2 gap-2 p-3">
          {stepTypes.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.type}
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                draggable
                className="cursor-grab rounded-lg border bg-background p-2.5 transition-shadow hover:shadow-md active:cursor-grabbing"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                    <Icon className={cn("h-3.5 w-3.5", step.color)} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-medium">{step.label}</p>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
