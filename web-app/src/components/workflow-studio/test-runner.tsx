"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Square,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  step: string;
  status: "running" | "success" | "error";
  message: string;
}

interface TestRunnerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
}

export function TestRunner({
  open,
  onOpenChange,
  workflowName,
}: TestRunnerProps) {
  const reducedMotion = useReducedMotion();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const simulatedSteps = [
    { step: "Trigger", message: "Webhook received - new lead created" },
    { step: "AI Lead Scorer", message: "Processing lead data with GPT-4..." },
    { step: "AI Lead Scorer", message: "Lead scored: 85/100 (High potential)" },
    { step: "Condition Check", message: "Evaluating: Score > 80? → TRUE" },
    { step: "Route to SDR", message: "Assigning lead to SDR team queue" },
    { step: "Complete", message: "Workflow completed successfully" },
  ];

  const runTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([]);

    for (let i = 0; i < simulatedSteps.length; i++) {
      const step = simulatedSteps[i];

      // Add "running" log
      const runningLog: LogEntry = {
        id: `log-${i}-running`,
        timestamp: new Date().toLocaleTimeString(),
        step: step.step,
        status: "running",
        message: step.message,
      };
      setLogs((prev) => [...prev, runningLog]);

      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update to "success"
      setLogs((prev) =>
        prev.map((log) =>
          log.id === runningLog.id ? { ...log, status: "success" } : log
        )
      );

      setProgress(((i + 1) / simulatedSteps.length) * 100);
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: LogEntry["status"]) => {
    switch (status) {
      case "running":
        return (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        );
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Test Workflow: {workflowName}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              />
            </div>
          </div>

          {/* Log Output */}
          <div className="rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <span className="text-sm font-medium">Execution Log</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {logs.length} entries
              </span>
            </div>
            <ScrollArea className="h-64">
              <div className="space-y-1 p-2">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={reducedMotion ? {} : { opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 rounded-md bg-background p-2.5"
                    >
                      <div className="mt-0.5 shrink-0">
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{log.step}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {log.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {logs.length === 0 && (
                  <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                    Click "Run Test" to start the simulation
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={runTest} disabled={isRunning} className="gap-2">
              {isRunning ? (
                <>
                  <Square className="h-4 w-4" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Test
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
