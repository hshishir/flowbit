"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  ClipboardList,
  GitBranch,
  Bot,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const steps = [
  { icon: Building2, label: "Org" },
  { icon: Users, label: "Personas" },
  { icon: ClipboardList, label: "Tasks" },
  { icon: GitBranch, label: "Workflows" },
  { icon: Bot, label: "AI Execution" },
  { icon: BarChart3, label: "Intelligence" },
];

export function FlowStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="border-y border-border bg-muted/30 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          The FlowBit Journey
        </p>

        <div className="flex items-center justify-center overflow-x-auto pb-2">
          <div className="flex items-center gap-2 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={step.label}
                  initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: reducedMotion ? 0 : index * 0.08,
                  }}
                  className="flex items-center gap-2 md:gap-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm ring-1 ring-border transition-shadow hover:shadow-md md:h-14 md:w-14">
                      <Icon className="h-5 w-5 text-foreground md:h-6 md:w-6" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground md:text-sm">
                      {step.label}
                    </span>
                  </div>

                  {!isLast && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
