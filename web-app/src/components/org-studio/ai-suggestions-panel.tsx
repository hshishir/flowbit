"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { slideInRight, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Task } from "@/mocks/types";

interface AiSuggestionsPanelProps {
  tasks: Task[];
}

export function AiSuggestionsPanel({ tasks }: AiSuggestionsPanelProps) {
  const reducedMotion = useReducedMotion();

  const tasksToAutomate = tasks.filter(
    (t) => t.automationPotential === "high" && t.type === "repetitive"
  );
  const tasksToAugment = tasks.filter(
    (t) =>
      t.automationPotential === "medium" ||
      (t.automationPotential === "high" && t.type === "decision")
  );
  const tasksToKeepHuman = tasks.filter(
    (t) => t.automationPotential === "low" || t.type === "high-context"
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-success";
    if (confidence >= 0.7) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <motion.aside
      initial={reducedMotion ? {} : "initial"}
      animate="enter"
      variants={reducedMotion ? {} : slideInRight}
      className="sticky top-0 w-80 shrink-0 space-y-4"
    >
      {/* AI Analysis Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base font-semibold">
              AI Analysis
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Based on task characteristics and patterns, here are our
            recommendations for this persona.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-success/10 p-2">
              <p className="text-lg font-semibold text-success">
                {tasksToAutomate.length}
              </p>
              <p className="text-xs text-muted-foreground">Automate</p>
            </div>
            <div className="rounded-lg bg-warning/10 p-2">
              <p className="text-lg font-semibold text-warning">
                {tasksToAugment.length}
              </p>
              <p className="text-xs text-muted-foreground">Augment</p>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <p className="text-lg font-semibold text-muted-foreground">
                {tasksToKeepHuman.length}
              </p>
              <p className="text-xs text-muted-foreground">Human</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks to Automate */}
      <motion.div
        initial="initial"
        animate="enter"
        variants={reducedMotion ? {} : staggerContainer}
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-success" />
              <CardTitle className="text-sm font-semibold">
                Recommended for AI
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      These tasks are repetitive with clear rules and high
                      automation potential.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasksToAutomate.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks recommended for full automation.
              </p>
            ) : (
              tasksToAutomate.slice(0, 4).map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={reducedMotion ? {} : staggerItem}
                  className="flex items-start gap-2 rounded-lg border bg-card p-2.5"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-tight">
                      {task.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {task.timePerWeek}h/week
                      </Badge>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          getConfidenceColor(0.92)
                        )}
                      >
                        92% confidence
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {tasksToAutomate.length > 4 && (
              <p className="text-xs text-muted-foreground">
                +{tasksToAutomate.length - 4} more tasks
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks to Augment */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-warning" />
            <CardTitle className="text-sm font-semibold">
              AI-Assisted (Human Oversight)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasksToAugment.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tasks recommended for AI assistance.
            </p>
          ) : (
            tasksToAugment.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-2 rounded-lg border bg-card p-2.5"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-tight">
                    {task.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Requires human review
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Rationale */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">AI Rationale</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            This persona has{" "}
            <span className="font-medium text-foreground">
              {Math.round(
                (tasksToAutomate.length / tasks.length) * 100
              )}
              %
            </span>{" "}
            of tasks suitable for full automation.
          </p>
          <Separator />
          <div className="space-y-2">
            <p className="font-medium text-foreground">Key factors:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>High volume of repetitive data entry tasks</li>
              <li>Clear rule-based decision patterns</li>
              <li>Well-documented processes with low variation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
