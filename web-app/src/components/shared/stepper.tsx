"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div key={step.id} className="flex items-center gap-2">
            {/* Step indicator */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "var(--primary)"
                    : isCurrent
                    ? "var(--primary)"
                    : "var(--muted)",
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.2,
                }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted && "text-primary-foreground",
                  isCurrent && "text-primary-foreground",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <motion.div
                    initial={reducedMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="relative mx-2 h-0.5 w-12 overflow-hidden rounded-full bg-muted sm:w-16">
                <motion.div
                  initial={false}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    delay: reducedMotion ? 0 : 0.1,
                  }}
                  className="absolute inset-y-0 left-0 bg-primary"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
