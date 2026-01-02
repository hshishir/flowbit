"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function TopPersonasTable() {
  const reducedMotion = useReducedMotion();
  const { personas } = useAppStore();

  const sortedPersonas = [...personas]
    .sort((a, b) => {
      const aAutomatable = a.tasks.filter(
        (t) => t.automationPotential === "high"
      ).length;
      const bAutomatable = b.tasks.filter(
        (t) => t.automationPotential === "high"
      ).length;
      return bAutomatable - aAutomatable;
    })
    .slice(0, 5);

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <CardTitle className="text-base">
              Top Personas by Automation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Persona</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Automated</TableHead>
                <TableHead className="text-right">Time Saved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPersonas.map((persona) => {
                const automatedTasks = persona.tasks.filter(
                  (t) => t.automationPotential === "high"
                );
                const timeSaved = automatedTasks.reduce(
                  (acc, t) => acc + t.timePerWeek,
                  0
                );

                return (
                  <TableRow key={persona.id}>
                    <TableCell className="font-medium">
                      {persona.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {persona.department}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-success/10 text-success">
                        {automatedTasks.length}/{persona.taskCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {timeSaved}h/week
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WorkflowsPerformanceTable() {
  const reducedMotion = useReducedMotion();
  const { workflows } = useAppStore();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Workflow Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Runs</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.slice(0, 5).map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        workflow.status === "active" &&
                          "bg-success/10 text-success",
                        workflow.status === "paused" &&
                          "bg-warning/10 text-warning"
                      )}
                    >
                      {workflow.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    {workflow.runCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "font-medium",
                        workflow.successRate >= 98
                          ? "text-success"
                          : workflow.successRate >= 95
                          ? "text-warning"
                          : "text-destructive"
                      )}
                    >
                      {workflow.successRate}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function GovernanceEventsTable() {
  const reducedMotion = useReducedMotion();
  const { governanceEvents } = useAppStore();

  const getEventIcon = (type: string) => {
    switch (type) {
      case "approval_required":
        return <Clock className="h-4 w-4 text-warning" />;
      case "exception":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "escalation":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "audit":
        return <Shield className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Governance Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Workflow</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {governanceEvents.slice(0, 5).map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.type)}
                      <span className="font-medium">{event.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {event.workflowName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        event.status === "pending" &&
                          "bg-warning/10 text-warning",
                        event.status === "resolved" &&
                          "bg-success/10 text-success"
                      )}
                    >
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
