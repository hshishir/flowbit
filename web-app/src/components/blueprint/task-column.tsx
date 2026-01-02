"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskItem } from "./task-item";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { BlueprintTask } from "@/mocks/types";

interface TaskColumnProps {
  title: string;
  icon: "human" | "ai";
  tasks: BlueprintTask[];
  onMoveTask: (taskId: string, newAssignment: "human" | "ai") => void;
  className?: string;
}

export function TaskColumn({
  title,
  icon,
  tasks,
  onMoveTask,
  className,
}: TaskColumnProps) {
  const reducedMotion = useReducedMotion();
  const isAi = icon === "ai";
  const Icon = isAi ? Bot : User;

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, x: isAi ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: isAi ? 0.1 : 0 }}
      className={cn("flex-1", className)}
    >
      <Card className={cn("h-full", isAi && "border-success/20")}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isAi ? "bg-success/10" : "bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isAi ? "text-success" : "text-muted-foreground"
                  )}
                />
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tasks.length} task{tasks.length !== 1 && "s"}
                </p>
              </div>
            </div>
            <Badge
              variant={isAi ? "default" : "secondary"}
              className={cn(isAi && "bg-success text-success-foreground")}
            >
              {isAi ? "AI Handled" : "Human Handled"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    column={icon}
                    onMove={onMoveTask}
                  />
                ))}
              </AnimatePresence>

              {tasks.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground"
                >
                  No tasks assigned
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
