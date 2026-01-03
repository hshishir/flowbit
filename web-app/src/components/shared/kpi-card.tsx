"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "./animated-counter";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface KpiCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  delay?: number;
  className?: string;
}

export function KpiCard({
  label,
  value,
  suffix = "",
  prefix = "",
  icon: Icon,
  trend,
  delay = 0,
  className,
}: KpiCardProps) {
  const reducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        delay: delay * 0.08,
      },
    },
  };

  return (
    <motion.div
      className="h-full"
      variants={reducedMotion ? {} : cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={reducedMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className={cn(
        "relative overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 h-full",
        className
      )}>
        <CardContent className="p-5 h-full">
          <div className="flex items-start justify-between h-full">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground min-h-[2.5rem] flex items-end">
                {label}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-foreground">
                <AnimatedCounter
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                />
              </p>
              {trend && (
                <p
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-success" : "text-destructive"
                  )}
                >
                  {trend.positive ? "+" : "-"}
                  {Math.abs(trend.value)}% from last period
                </p>
              )}
            </div>
            {Icon && (
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors duration-300 group-hover:bg-primary/10"
                whileHover={reducedMotion ? {} : { rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Animated accent gradient */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: delay * 0.08 + 0.3 }}
        />
      </Card>
    </motion.div>
  );
}
