"use client";

import { motion, LayoutGroup } from "framer-motion";
import { TaskColumn } from "./task-column";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Blueprint } from "@/mocks/types";

interface SplitViewProps {
  blueprint: Blueprint;
  onMoveTask: (taskId: string, newAssignment: "human" | "ai") => void;
}

export function SplitView({ blueprint, onMoveTask }: SplitViewProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LayoutGroup>
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex gap-6"
      >
        <TaskColumn
          title="Human Tasks"
          icon="human"
          tasks={blueprint.humanTasks}
          onMoveTask={onMoveTask}
        />
        <TaskColumn
          title="AI Tasks"
          icon="ai"
          tasks={blueprint.aiTasks}
          onMoveTask={onMoveTask}
        />
      </motion.div>
    </LayoutGroup>
  );
}
