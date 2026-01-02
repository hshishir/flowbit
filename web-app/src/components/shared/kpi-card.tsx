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

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: delay * 0.05 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </CardContent>

        {/* Subtle accent gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
      </Card>
    </motion.div>
  );
}
