"use client";

import { motion } from "framer-motion";
import { Users, ClipboardList, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { slideInRight } from "@/lib/motion";

export function OrgSummaryPanel() {
  const reducedMotion = useReducedMotion();
  const { org, personas, orgMetrics } = useAppStore();

  const totalTasks = personas.reduce((acc, p) => acc + p.taskCount, 0);

  return (
    <motion.aside
      initial={reducedMotion ? {} : "initial"}
      animate="enter"
      variants={reducedMotion ? {} : slideInRight}
      className="sticky top-0 w-80 shrink-0 space-y-4"
    >
      {/* Metrics Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Personas</span>
            </div>
            <span className="font-semibold">{personas.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <ClipboardList className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Tasks</span>
            </div>
            <span className="font-semibold">{totalTasks}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">
                Automation Ready
              </span>
            </div>
            <span className="font-semibold text-success">
              {personas.filter((p) => p.automationReadiness === "high").length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Next Step Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Recommended Next Step
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Select a persona with high automation readiness to generate an AI
            blueprint.
          </p>
          <Separator />
          <div className="rounded-lg bg-background p-3">
            <p className="text-xs font-medium text-muted-foreground">
              TOP CANDIDATE
            </p>
            <p className="mt-1 font-medium">
              {personas.find((p) => p.automationReadiness === "high")?.name ||
                "No high-readiness personas"}
            </p>
            <p className="text-sm text-muted-foreground">
              {personas.find((p) => p.automationReadiness === "high")
                ?.taskCount || 0}{" "}
              tasks ready for automation
            </p>
          </div>
          <Button className="w-full gap-2" size="sm">
            Analyze Automation Potential
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.aside>
  );
}
