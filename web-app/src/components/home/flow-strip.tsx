"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { cn } from "@/lib/utils";

const steps = [
  { icon: Building2, label: "Org", description: "Map your organization structure", color: "text-blue-500", bgColor: "bg-blue-500/10", ringColor: "ring-blue-500/40" },
  { icon: Users, label: "Personas", description: "Define roles and responsibilities", color: "text-violet-500", bgColor: "bg-violet-500/10", ringColor: "ring-violet-500/40" },
  { icon: ClipboardList, label: "Tasks", description: "Identify automation opportunities", color: "text-amber-500", bgColor: "bg-amber-500/10", ringColor: "ring-amber-500/40" },
  { icon: GitBranch, label: "Workflows", description: "Design intelligent processes", color: "text-emerald-500", bgColor: "bg-emerald-500/10", ringColor: "ring-emerald-500/40" },
  { icon: Bot, label: "AI Execution", description: "Deploy autonomous agents", color: "text-rose-500", bgColor: "bg-rose-500/10", ringColor: "ring-rose-500/40" },
  { icon: BarChart3, label: "Intelligence", description: "Monitor and optimize performance", color: "text-cyan-500", bgColor: "bg-cyan-500/10", ringColor: "ring-cyan-500/40" },
];

export function FlowStrip() {
  const reducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const chevronVariants = {
    hidden: { opacity: 0, x: -10, scale: 0 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  return (
    <section className="relative border-y border-border bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20 px-6 py-16 overflow-x-clip">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl"
            animate={{
              x: ["-10%", "110%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-5xl relative">
        <motion.p
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The FlowBit Journey
        </motion.p>

        <motion.div
          className="flex items-center justify-center overflow-x-auto pt-4 pb-4 scrollbar-thin"
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setHasAnimated(true)}
        >
          <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              const isHovered = hoveredIndex === index;
              const isActive = hoveredIndex !== null && hoveredIndex >= index;

              return (
                <motion.div
                  key={step.label}
                  variants={reducedMotion ? {} : itemVariants}
                  className="flex items-center gap-3 md:gap-5 lg:gap-6"
                >
                  {/* Step Card */}
                  <motion.div
                    className="relative flex flex-col items-center gap-3 cursor-pointer"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={reducedMotion ? {} : { y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Glow effect behind icon */}
                    <AnimatePresence>
                      {isHovered && !reducedMotion && (
                        <motion.div
                          className={cn(
                            "absolute -inset-3 top-0 h-20 md:h-[5.5rem] rounded-3xl blur-xl",
                            step.bgColor
                          )}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.6, scale: 1.1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon Container */}
                    <motion.div
                      className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ring-1 transition-all duration-300 md:h-16 md:w-16",
                        step.bgColor,
                        isHovered
                          ? cn("shadow-lg", step.ringColor)
                          : "ring-border/40"
                      )}
                      animate={isHovered && !reducedMotion ? {
                        scale: 1.05,
                      } : {
                        scale: 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {/* Pulse ring on hover */}
                      <AnimatePresence>
                        {isHovered && !reducedMotion && (
                          <motion.div
                            className={cn(
                              "absolute inset-0 rounded-2xl ring-2",
                              step.ringColor
                            )}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Icon with animation */}
                      <motion.div
                        animate={isHovered && !reducedMotion ? {
                          rotate: [0, -10, 10, -5, 5, 0],
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6 transition-all duration-300 md:h-7 md:w-7",
                            step.color,
                            isHovered && "scale-110 drop-shadow-sm"
                          )}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Label */}
                    <motion.span
                      className={cn(
                        "text-xs font-medium transition-colors duration-300 md:text-sm whitespace-nowrap",
                        isHovered ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </motion.span>

                  </motion.div>

                  {/* Animated Chevron Connector */}
                  {!isLast && (
                    <motion.div
                      variants={reducedMotion ? {} : chevronVariants}
                      className="relative flex items-center"
                    >
                      {/* Flowing dot animation */}
                      {hasAnimated && !reducedMotion && (
                        <motion.div
                          className="absolute left-0 w-1.5 h-1.5 rounded-full bg-primary/60"
                          animate={{
                            x: [0, 16, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      <motion.div
                        animate={isActive && !reducedMotion ? {
                          x: [0, 3, 0],
                        } : {}}
                        transition={{
                          duration: 0.4,
                          repeat: isActive ? Infinity : 0,
                          repeatType: "reverse",
                        }}
                      >
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors duration-300",
                            isActive ? "text-primary/70" : "text-muted-foreground/30"
                          )}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Progress line underneath */}
        <motion.div
          className="mt-6 mx-auto max-w-md h-0.5 bg-border/30 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
