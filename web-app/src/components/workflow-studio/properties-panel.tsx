"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Zap,
  ClipboardCheck,
  Plug,
  Bot,
  GitBranch,
  Play,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { slideInRight } from "@/lib/motion";
import type { WorkflowNode } from "@/mocks/types";

const nodeIcons: Record<WorkflowNode["type"], typeof Zap> = {
  trigger: Play,
  task: Zap,
  approval: ClipboardCheck,
  integration: Plug,
  agent: Bot,
  condition: GitBranch,
};

export function PropertiesPanel() {
  const reducedMotion = useReducedMotion();
  const { workflows, selectedWorkflowId, selectedNodeId, setSelectedNodeId } =
    useAppStore();

  const workflow = workflows.find((w) => w.id === selectedWorkflowId);
  const node = workflow?.nodes.find((n) => n.id === selectedNodeId);

  // Return null if no node is selected (panel won't be rendered anyway, but safety check)
  if (!node) {
    return null;
  }

  const Icon = nodeIcons[node.type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={reducedMotion ? {} : "initial"}
        animate="enter"
        exit="exit"
        variants={reducedMotion ? {} : slideInRight}
        className="flex h-full w-80 flex-col border-l bg-background"
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">{node.label}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedNodeId(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-4">
            {/* Basic Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Basic Information
              </h4>
              <div className="space-y-2">
                <Label htmlFor="node-label">Label</Label>
                <Input id="node-label" defaultValue={node.label} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input value={node.type} disabled className="capitalize" />
              </div>
            </div>

            <Separator />

            {/* Type-specific settings */}
            {node.type === "trigger" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Trigger Settings
                </h4>
                <div className="space-y-2">
                  <Label>Event Source</Label>
                  <Select defaultValue="webhook">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="integration">Integration Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {node.type === "agent" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  AI Agent Settings
                </h4>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Input type="number" defaultValue="0.7" step="0.1" min="0" max="2" />
                </div>
              </div>
            )}

            {node.type === "approval" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Approval Settings
                </h4>
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Direct Manager</SelectItem>
                      <SelectItem value="team-lead">Team Lead</SelectItem>
                      <SelectItem value="custom">Custom User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto-approve after timeout</Label>
                  <Switch />
                </div>
              </div>
            )}

            {node.type === "condition" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Condition Settings
                </h4>
                <div className="space-y-2">
                  <Label>Condition Type</Label>
                  <Select defaultValue="threshold">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="threshold">Threshold</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Threshold Value</Label>
                  <Input type="number" defaultValue="80" />
                </div>
              </div>
            )}

            {node.type === "integration" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Integration Settings
                </h4>
                <div className="space-y-2">
                  <Label>Integration</Label>
                  <Select defaultValue="salesforce">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="jira">Jira</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Separator />

            {/* Execution Settings */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Execution
              </h4>
              <div className="flex items-center justify-between">
                <Label>Retry on failure</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Log execution</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm">
              Duplicate
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
