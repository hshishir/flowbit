// Core entity types for FlowBit

export interface Org {
  id: string;
  name: string;
  industry: string;
  size: string;
  departments: Department[];
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  headCount: number;
  personas: string[]; // persona IDs
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentId: string;
  taskCount: number;
  estimatedHoursPerWeek: number;
  automationReadiness: "high" | "medium" | "low";
  tasks: Task[];
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  type: "repetitive" | "decision" | "high-context";
  timePerWeek: number; // hours
  painPoints: string[];
  automationPotential: "high" | "medium" | "low";
  currentTools: string[];
  assignedTo: "human" | "ai" | "hybrid";
}

export interface Blueprint {
  id: string;
  personaId: string;
  personaName: string;
  createdAt: string;
  humanTasks: BlueprintTask[];
  aiTasks: BlueprintTask[];
  metrics: BlueprintMetrics;
}

export interface BlueprintTask {
  id: string;
  taskId: string;
  name: string;
  type: Task["type"];
  assignedTo: "human" | "ai";
  reasoning: string;
  confidence: number;
}

export interface BlueprintMetrics {
  timeSavedPerWeek: number;
  automationCoverage: number;
  workflowCount: number;
  estimatedCostSavings: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active" | "paused";
  blueprintId?: string;
  nodes: WorkflowNode[];
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  runCount: number;
  successRate: number;
}

export interface WorkflowNode {
  id: string;
  type: "trigger" | "task" | "approval" | "integration" | "agent" | "condition";
  label: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  connections: string[]; // node IDs
}

export interface Metrics {
  persona: PersonaMetrics;
  department: DepartmentMetrics;
  org: OrgMetrics;
}

export interface PersonaMetrics {
  tasksAutomated: number;
  tasksManual: number;
  timeReturnedPerWeek: number;
  workflowsActive: number;
  aiUtilization: number;
}

export interface DepartmentMetrics {
  departmentId: string;
  departmentName: string;
  totalPersonas: number;
  automationCoverage: number;
  activeWorkflows: number;
  timeSavedPerWeek: number;
}

export interface OrgMetrics {
  totalPersonas: number;
  totalTasks: number;
  tasksAutomated: number;
  tasksManual: number;
  totalWorkflows: number;
  activeWorkflows: number;
  automationCoverage: number;
  totalTimeSavedPerWeek: number;
  aiUtilization: number;
}

export interface GovernanceEvent {
  id: string;
  type: "approval_required" | "exception" | "escalation" | "audit";
  title: string;
  description: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  status: "pending" | "resolved" | "dismissed";
}
