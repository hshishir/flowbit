import {
  Org,
  Department,
  Persona,
  Task,
  Blueprint,
  Workflow,
  WorkflowNode,
  OrgMetrics,
  DepartmentMetrics,
  GovernanceEvent,
} from "./types";

// Mock Organization
export const mockOrg: Org = {
  id: "org-1",
  name: "Acme Corporation",
  industry: "Technology",
  size: "500-1000",
  departments: [
    { id: "dept-1", name: "Sales", headCount: 45, personas: ["persona-1", "persona-2"] },
    { id: "dept-2", name: "Engineering", headCount: 120, personas: ["persona-3", "persona-4"] },
    { id: "dept-3", name: "Human Resources", headCount: 25, personas: ["persona-5"] },
    { id: "dept-4", name: "Operations", headCount: 60, personas: ["persona-6", "persona-7"] },
    { id: "dept-5", name: "Finance", headCount: 30, personas: ["persona-8"] },
    { id: "dept-6", name: "Marketing", headCount: 35, personas: ["persona-9", "persona-10", "persona-11"] },
  ],
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-12-28T14:30:00Z",
};

// Helper to generate tasks
const generateTasks = (personaId: string, taskConfigs: Partial<Task>[]): Task[] => {
  return taskConfigs.map((config, index) => ({
    id: `${personaId}-task-${index + 1}`,
    name: config.name || `Task ${index + 1}`,
    description: config.description || "Task description",
    type: config.type || "repetitive",
    timePerWeek: config.timePerWeek || 2,
    painPoints: config.painPoints || [],
    automationPotential: config.automationPotential || "medium",
    currentTools: config.currentTools || [],
    assignedTo: config.assignedTo || "human",
  }));
};

// Mock Personas with Tasks
export const mockPersonas: Persona[] = [
  {
    id: "persona-1",
    name: "Sales Development Rep",
    role: "SDR",
    department: "Sales",
    departmentId: "dept-1",
    taskCount: 8,
    estimatedHoursPerWeek: 40,
    automationReadiness: "high",
    createdAt: "2024-06-01T09:00:00Z",
    tasks: generateTasks("persona-1", [
      { name: "Lead qualification", type: "repetitive", timePerWeek: 10, automationPotential: "high", painPoints: ["Manual data entry", "Inconsistent criteria"], currentTools: ["Salesforce", "LinkedIn"] },
      { name: "Email outreach", type: "repetitive", timePerWeek: 8, automationPotential: "high", painPoints: ["Repetitive messaging", "Low response rates"], currentTools: ["Outreach", "Gmail"] },
      { name: "Meeting scheduling", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Back-and-forth emails", "Timezone confusion"], currentTools: ["Calendly", "Google Calendar"] },
      { name: "CRM updates", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Tedious data entry", "Duplicate records"], currentTools: ["Salesforce"] },
      { name: "Prospect research", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Time-consuming", "Information scattered"], currentTools: ["LinkedIn", "ZoomInfo"] },
      { name: "Discovery calls", type: "high-context", timePerWeek: 8, automationPotential: "low", painPoints: ["Needs human judgment", "Relationship building"], currentTools: ["Zoom", "Gong"] },
      { name: "Pipeline reporting", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Manual aggregation", "Formatting"], currentTools: ["Excel", "Salesforce"] },
      { name: "Handoff to AE", type: "decision", timePerWeek: 2, automationPotential: "medium", painPoints: ["Context loss", "Timing"], currentTools: ["Slack", "Salesforce"] },
    ]),
  },
  {
    id: "persona-2",
    name: "Account Executive",
    role: "AE",
    department: "Sales",
    departmentId: "dept-1",
    taskCount: 7,
    estimatedHoursPerWeek: 45,
    automationReadiness: "medium",
    createdAt: "2024-06-01T09:00:00Z",
    tasks: generateTasks("persona-2", [
      { name: "Proposal creation", type: "decision", timePerWeek: 8, automationPotential: "medium", painPoints: ["Custom requirements", "Formatting"], currentTools: ["Google Docs", "PandaDoc"] },
      { name: "Contract negotiation", type: "high-context", timePerWeek: 6, automationPotential: "low", painPoints: ["Complex terms", "Legal review"], currentTools: ["DocuSign", "Salesforce"] },
      { name: "Demo preparation", type: "decision", timePerWeek: 5, automationPotential: "medium", painPoints: ["Customization needed", "Data setup"], currentTools: ["Demo environment", "Slides"] },
      { name: "Forecasting updates", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Weekly updates", "Data accuracy"], currentTools: ["Salesforce", "Clari"] },
      { name: "Customer meetings", type: "high-context", timePerWeek: 12, automationPotential: "low", painPoints: ["Travel time", "Preparation"], currentTools: ["Zoom", "Gong"] },
      { name: "Follow-up emails", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Time-consuming", "Tracking"], currentTools: ["Gmail", "Outreach"] },
      { name: "Competitive analysis", type: "decision", timePerWeek: 3, automationPotential: "medium", painPoints: ["Information gathering", "Updates"], currentTools: ["Klue", "Web research"] },
    ]),
  },
  {
    id: "persona-3",
    name: "Software Engineer",
    role: "SWE",
    department: "Engineering",
    departmentId: "dept-2",
    taskCount: 6,
    estimatedHoursPerWeek: 40,
    automationReadiness: "medium",
    createdAt: "2024-06-15T09:00:00Z",
    tasks: generateTasks("persona-3", [
      { name: "Code review", type: "decision", timePerWeek: 8, automationPotential: "medium", painPoints: ["Time-consuming", "Inconsistent feedback"], currentTools: ["GitHub", "GitLab"] },
      { name: "Documentation", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Often neglected", "Outdated quickly"], currentTools: ["Notion", "Confluence"] },
      { name: "Bug triage", type: "decision", timePerWeek: 5, automationPotential: "medium", painPoints: ["Priority decisions", "Incomplete reports"], currentTools: ["Jira", "Linear"] },
      { name: "Feature development", type: "high-context", timePerWeek: 18, automationPotential: "low", painPoints: ["Complex requirements", "Dependencies"], currentTools: ["VS Code", "GitHub Copilot"] },
      { name: "Testing", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Repetitive", "Coverage gaps"], currentTools: ["Jest", "Cypress"] },
      { name: "Deployment", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Manual steps", "Rollback risk"], currentTools: ["GitHub Actions", "Vercel"] },
    ]),
  },
  {
    id: "persona-4",
    name: "Engineering Manager",
    role: "EM",
    department: "Engineering",
    departmentId: "dept-2",
    taskCount: 7,
    estimatedHoursPerWeek: 45,
    automationReadiness: "medium",
    createdAt: "2024-06-15T09:00:00Z",
    tasks: generateTasks("persona-4", [
      { name: "Sprint planning", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Estimation accuracy", "Scope creep"], currentTools: ["Jira", "Linear"] },
      { name: "1:1 meetings", type: "high-context", timePerWeek: 8, automationPotential: "low", painPoints: ["Scheduling", "Preparation"], currentTools: ["Google Calendar", "Notion"] },
      { name: "Performance reviews", type: "high-context", timePerWeek: 3, automationPotential: "low", painPoints: ["Data gathering", "Bias"], currentTools: ["Lattice", "Google Docs"] },
      { name: "Status reporting", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Manual aggregation", "Multiple stakeholders"], currentTools: ["Slack", "Notion"] },
      { name: "Hiring interviews", type: "high-context", timePerWeek: 6, automationPotential: "low", painPoints: ["Time-consuming", "Coordination"], currentTools: ["Greenhouse", "Zoom"] },
      { name: "Technical decisions", type: "decision", timePerWeek: 5, automationPotential: "medium", painPoints: ["Information gathering", "Trade-offs"], currentTools: ["Notion", "Architecture docs"] },
      { name: "Roadmap updates", type: "decision", timePerWeek: 3, automationPotential: "medium", painPoints: ["Stakeholder alignment", "Priority changes"], currentTools: ["ProductBoard", "Notion"] },
    ]),
  },
  {
    id: "persona-5",
    name: "HR Generalist",
    role: "HR",
    department: "Human Resources",
    departmentId: "dept-3",
    taskCount: 8,
    estimatedHoursPerWeek: 40,
    automationReadiness: "high",
    createdAt: "2024-07-01T09:00:00Z",
    tasks: generateTasks("persona-5", [
      { name: "Onboarding coordination", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Many steps", "Document collection"], currentTools: ["BambooHR", "DocuSign"] },
      { name: "Benefits administration", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Enrollment periods", "Questions"], currentTools: ["Gusto", "Benefits portal"] },
      { name: "Leave management", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Policy compliance", "Tracking"], currentTools: ["BambooHR", "Slack"] },
      { name: "Policy updates", type: "decision", timePerWeek: 3, automationPotential: "medium", painPoints: ["Legal compliance", "Communication"], currentTools: ["Notion", "Email"] },
      { name: "Employee inquiries", type: "repetitive", timePerWeek: 8, automationPotential: "high", painPoints: ["Repetitive questions", "Response time"], currentTools: ["Slack", "Email"] },
      { name: "Compliance reporting", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Data accuracy", "Deadlines"], currentTools: ["Excel", "BambooHR"] },
      { name: "Exit interviews", type: "high-context", timePerWeek: 2, automationPotential: "low", painPoints: ["Sensitive topics", "Documentation"], currentTools: ["Zoom", "Google Forms"] },
      { name: "Training coordination", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Scheduling", "Tracking completion"], currentTools: ["Lattice", "Google Calendar"] },
    ]),
  },
  {
    id: "persona-6",
    name: "Operations Analyst",
    role: "Ops Analyst",
    department: "Operations",
    departmentId: "dept-4",
    taskCount: 6,
    estimatedHoursPerWeek: 40,
    automationReadiness: "high",
    createdAt: "2024-07-15T09:00:00Z",
    tasks: generateTasks("persona-6", [
      { name: "Data reconciliation", type: "repetitive", timePerWeek: 10, automationPotential: "high", painPoints: ["Manual matching", "Discrepancies"], currentTools: ["Excel", "SQL"] },
      { name: "Report generation", type: "repetitive", timePerWeek: 8, automationPotential: "high", painPoints: ["Multiple sources", "Formatting"], currentTools: ["Tableau", "Excel"] },
      { name: "Process documentation", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Keeping updated", "Version control"], currentTools: ["Notion", "Confluence"] },
      { name: "Vendor coordination", type: "decision", timePerWeek: 5, automationPotential: "medium", painPoints: ["Communication delays", "Contract terms"], currentTools: ["Email", "Slack"] },
      { name: "Anomaly detection", type: "decision", timePerWeek: 6, automationPotential: "high", painPoints: ["Manual review", "False positives"], currentTools: ["Excel", "Custom scripts"] },
      { name: "Capacity planning", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Forecasting accuracy", "Data quality"], currentTools: ["Excel", "Planning tools"] },
    ]),
  },
  {
    id: "persona-7",
    name: "Customer Success Manager",
    role: "CSM",
    department: "Operations",
    departmentId: "dept-4",
    taskCount: 7,
    estimatedHoursPerWeek: 42,
    automationReadiness: "medium",
    createdAt: "2024-08-01T09:00:00Z",
    tasks: generateTasks("persona-7", [
      { name: "Customer health monitoring", type: "decision", timePerWeek: 6, automationPotential: "high", painPoints: ["Manual tracking", "Late detection"], currentTools: ["Gainsight", "Salesforce"] },
      { name: "Quarterly business reviews", type: "high-context", timePerWeek: 5, automationPotential: "low", painPoints: ["Preparation time", "Data gathering"], currentTools: ["Google Slides", "Salesforce"] },
      { name: "Onboarding calls", type: "high-context", timePerWeek: 6, automationPotential: "low", painPoints: ["Scheduling", "Custom needs"], currentTools: ["Zoom", "Calendly"] },
      { name: "Support escalations", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Routing", "Context gathering"], currentTools: ["Zendesk", "Slack"] },
      { name: "Renewal tracking", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Manual tracking", "Timing"], currentTools: ["Salesforce", "Excel"] },
      { name: "Usage reporting", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Data extraction", "Formatting"], currentTools: ["Analytics tools", "Excel"] },
      { name: "Expansion opportunities", type: "decision", timePerWeek: 3, automationPotential: "medium", painPoints: ["Identification", "Timing"], currentTools: ["Salesforce", "Product analytics"] },
    ]),
  },
  {
    id: "persona-8",
    name: "Financial Analyst",
    role: "Finance",
    department: "Finance",
    departmentId: "dept-5",
    taskCount: 6,
    estimatedHoursPerWeek: 45,
    automationReadiness: "high",
    createdAt: "2024-08-15T09:00:00Z",
    tasks: generateTasks("persona-8", [
      { name: "Expense processing", type: "repetitive", timePerWeek: 8, automationPotential: "high", painPoints: ["Manual review", "Policy compliance"], currentTools: ["Expensify", "NetSuite"] },
      { name: "Budget tracking", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Multiple sources", "Variance analysis"], currentTools: ["Excel", "Adaptive Planning"] },
      { name: "Financial reporting", type: "repetitive", timePerWeek: 10, automationPotential: "high", painPoints: ["Data aggregation", "Deadlines"], currentTools: ["NetSuite", "Excel"] },
      { name: "Forecasting", type: "decision", timePerWeek: 8, automationPotential: "medium", painPoints: ["Assumptions", "Accuracy"], currentTools: ["Excel", "Anaplan"] },
      { name: "Audit preparation", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Documentation", "Requests"], currentTools: ["NetSuite", "Box"] },
      { name: "Variance analysis", type: "decision", timePerWeek: 6, automationPotential: "medium", painPoints: ["Root cause", "Explanation"], currentTools: ["Excel", "BI tools"] },
    ]),
  },
  // Marketing Department Personas
  {
    id: "persona-9",
    name: "Content Marketing Manager",
    role: "Content Manager",
    department: "Marketing",
    departmentId: "dept-6",
    taskCount: 7,
    estimatedHoursPerWeek: 42,
    automationReadiness: "high",
    createdAt: "2024-09-01T09:00:00Z",
    tasks: generateTasks("persona-9", [
      { name: "Blog content creation", type: "decision", timePerWeek: 10, automationPotential: "medium", painPoints: ["Writer's block", "Research time"], currentTools: ["Google Docs", "WordPress", "Grammarly"] },
      { name: "SEO optimization", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Keyword research", "Meta tag updates"], currentTools: ["Ahrefs", "SEMrush", "Yoast"] },
      { name: "Content calendar management", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Scheduling conflicts", "Deadline tracking"], currentTools: ["Asana", "Google Calendar", "Notion"] },
      { name: "Social media scheduling", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Multiple platforms", "Optimal timing"], currentTools: ["Buffer", "Hootsuite", "Sprout Social"] },
      { name: "Performance reporting", type: "repetitive", timePerWeek: 4, automationPotential: "high", painPoints: ["Data aggregation", "Multiple sources"], currentTools: ["Google Analytics", "HubSpot", "Excel"] },
      { name: "Content repurposing", type: "decision", timePerWeek: 3, automationPotential: "medium", painPoints: ["Format adaptation", "Platform requirements"], currentTools: ["Canva", "Adobe Creative Suite"] },
      { name: "Stakeholder reviews", type: "high-context", timePerWeek: 4, automationPotential: "low", painPoints: ["Feedback cycles", "Approval delays"], currentTools: ["Slack", "Email", "Google Docs"] },
    ]),
  },
  {
    id: "persona-10",
    name: "Digital Marketing Specialist",
    role: "Digital Marketer",
    department: "Marketing",
    departmentId: "dept-6",
    taskCount: 8,
    estimatedHoursPerWeek: 40,
    automationReadiness: "high",
    createdAt: "2024-09-15T09:00:00Z",
    tasks: generateTasks("persona-10", [
      { name: "Paid ad campaign management", type: "decision", timePerWeek: 8, automationPotential: "medium", painPoints: ["Budget allocation", "A/B testing"], currentTools: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads"] },
      { name: "Ad creative testing", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Variant creation", "Performance tracking"], currentTools: ["Canva", "Figma", "Ad platforms"] },
      { name: "Campaign performance analysis", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Data consolidation", "Attribution"], currentTools: ["Google Analytics", "Looker", "Excel"] },
      { name: "Audience segmentation", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Data quality", "Targeting precision"], currentTools: ["HubSpot", "Segment", "Customer.io"] },
      { name: "Landing page optimization", type: "decision", timePerWeek: 4, automationPotential: "medium", painPoints: ["Conversion tracking", "A/B testing"], currentTools: ["Unbounce", "Optimizely", "Google Optimize"] },
      { name: "Email campaign execution", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["List management", "Deliverability"], currentTools: ["Mailchimp", "HubSpot", "Klaviyo"] },
      { name: "Competitor monitoring", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Manual tracking", "Alert fatigue"], currentTools: ["SEMrush", "SpyFu", "SimilarWeb"] },
      { name: "Budget tracking", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Multiple platforms", "Reconciliation"], currentTools: ["Excel", "Google Sheets", "Finance tools"] },
    ]),
  },
  {
    id: "persona-11",
    name: "Marketing Operations Manager",
    role: "Marketing Ops",
    department: "Marketing",
    departmentId: "dept-6",
    taskCount: 7,
    estimatedHoursPerWeek: 44,
    automationReadiness: "high",
    createdAt: "2024-10-01T09:00:00Z",
    tasks: generateTasks("persona-11", [
      { name: "Marketing automation setup", type: "decision", timePerWeek: 8, automationPotential: "medium", painPoints: ["Complex workflows", "Integration issues"], currentTools: ["HubSpot", "Marketo", "Pardot"] },
      { name: "Lead scoring configuration", type: "decision", timePerWeek: 5, automationPotential: "high", painPoints: ["Criteria tuning", "Sales alignment"], currentTools: ["HubSpot", "Salesforce", "Marketo"] },
      { name: "Data hygiene and cleanup", type: "repetitive", timePerWeek: 6, automationPotential: "high", painPoints: ["Duplicate records", "Data decay"], currentTools: ["ZoomInfo", "Clearbit", "HubSpot"] },
      { name: "Campaign attribution reporting", type: "repetitive", timePerWeek: 5, automationPotential: "high", painPoints: ["Multi-touch attribution", "Data silos"], currentTools: ["Bizible", "HubSpot", "Google Analytics"] },
      { name: "Tech stack management", type: "decision", timePerWeek: 4, automationPotential: "low", painPoints: ["Vendor management", "Integration maintenance"], currentTools: ["Zapier", "Workato", "Various APIs"] },
      { name: "Process documentation", type: "repetitive", timePerWeek: 3, automationPotential: "high", painPoints: ["Keeping updated", "Team adoption"], currentTools: ["Notion", "Confluence", "Loom"] },
      { name: "Cross-team coordination", type: "high-context", timePerWeek: 6, automationPotential: "low", painPoints: ["Alignment", "Communication gaps"], currentTools: ["Slack", "Asana", "Zoom"] },
    ]),
  },
];

// Generate blueprint from persona
export const generateBlueprintFromPersona = (persona: Persona): Blueprint => {
  const humanTasks: Blueprint["humanTasks"] = [];
  const aiTasks: Blueprint["aiTasks"] = [];

  persona.tasks.forEach((task) => {
    const blueprintTask = {
      id: `bp-${task.id}`,
      taskId: task.id,
      name: task.name,
      type: task.type,
      assignedTo: task.automationPotential === "high" ? "ai" as const : "human" as const,
      reasoning: task.automationPotential === "high"
        ? "High automation potential - repetitive task with clear rules"
        : task.automationPotential === "medium"
        ? "Medium automation potential - requires human oversight"
        : "Low automation potential - requires human judgment",
      confidence: task.automationPotential === "high" ? 0.92 : task.automationPotential === "medium" ? 0.75 : 0.45,
    };

    if (blueprintTask.assignedTo === "ai") {
      aiTasks.push(blueprintTask);
    } else {
      humanTasks.push(blueprintTask);
    }
  });

  const timeSaved = aiTasks.reduce((acc, t) => {
    const originalTask = persona.tasks.find(pt => pt.id === t.taskId);
    return acc + (originalTask?.timePerWeek || 0);
  }, 0);

  return {
    id: `blueprint-${persona.id}`,
    personaId: persona.id,
    personaName: persona.name,
    createdAt: new Date().toISOString(),
    humanTasks,
    aiTasks,
    metrics: {
      timeSavedPerWeek: timeSaved,
      automationCoverage: Math.round((aiTasks.length / persona.tasks.length) * 100),
      workflowCount: aiTasks.length,
      estimatedCostSavings: timeSaved * 75, // $75/hour
    },
  };
};

// Mock Workflows
export const mockWorkflows: Workflow[] = [
  {
    id: "workflow-1",
    name: "Lead Qualification Automation",
    description: "Automatically qualify and score incoming leads based on predefined criteria",
    status: "active",
    blueprintId: "blueprint-persona-1",
    nodes: [
      { id: "node-1", type: "trigger", label: "New Lead Created", config: { source: "Salesforce" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "AI Lead Scorer", config: { model: "gpt-4", prompt: "Score lead based on..." }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "condition", label: "Score > 80?", config: { threshold: 80 }, position: { x: 500, y: 200 }, connections: ["node-4", "node-5"] },
      { id: "node-4", type: "task", label: "Route to SDR", config: { assignee: "SDR Team" }, position: { x: 700, y: 100 }, connections: [] },
      { id: "node-5", type: "task", label: "Add to Nurture", config: { campaign: "Nurture" }, position: { x: 700, y: 300 }, connections: [] },
    ],
    createdAt: "2024-11-01T10:00:00Z",
    updatedAt: "2024-12-28T15:30:00Z",
    lastRun: "2024-12-28T15:30:00Z",
    runCount: 1247,
    successRate: 98.5,
  },
  {
    id: "workflow-2",
    name: "Email Outreach Sequence",
    description: "Personalized email sequences with AI-generated content",
    status: "active",
    blueprintId: "blueprint-persona-1",
    nodes: [
      { id: "node-1", type: "trigger", label: "Lead Qualified", config: { event: "lead.qualified" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "Generate Email", config: { template: "outreach_v1" }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "approval", label: "Human Review", config: { assignee: "SDR" }, position: { x: 500, y: 200 }, connections: ["node-4"] },
      { id: "node-4", type: "integration", label: "Send via Outreach", config: { integration: "outreach" }, position: { x: 700, y: 200 }, connections: [] },
    ],
    createdAt: "2024-11-05T10:00:00Z",
    updatedAt: "2024-12-27T09:00:00Z",
    lastRun: "2024-12-28T14:00:00Z",
    runCount: 892,
    successRate: 96.2,
  },
  {
    id: "workflow-3",
    name: "Employee Onboarding",
    description: "Automated onboarding workflow for new hires",
    status: "active",
    blueprintId: "blueprint-persona-5",
    nodes: [
      { id: "node-1", type: "trigger", label: "New Hire Added", config: { source: "BambooHR" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "task", label: "Create Accounts", config: { systems: ["Google", "Slack", "GitHub"] }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "task", label: "Send Welcome Pack", config: { template: "welcome" }, position: { x: 500, y: 200 }, connections: ["node-4"] },
      { id: "node-4", type: "task", label: "Schedule Training", config: { calendar: "onboarding" }, position: { x: 700, y: 200 }, connections: [] },
    ],
    createdAt: "2024-11-10T10:00:00Z",
    updatedAt: "2024-12-20T11:00:00Z",
    lastRun: "2024-12-26T09:00:00Z",
    runCount: 45,
    successRate: 100,
  },
  {
    id: "workflow-4",
    name: "Expense Processing",
    description: "Automated expense report processing and approval routing",
    status: "active",
    blueprintId: "blueprint-persona-8",
    nodes: [
      { id: "node-1", type: "trigger", label: "Expense Submitted", config: { source: "Expensify" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "Policy Check", config: { rules: "expense_policy" }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "condition", label: "Amount > $500?", config: { threshold: 500 }, position: { x: 500, y: 200 }, connections: ["node-4", "node-5"] },
      { id: "node-4", type: "approval", label: "Manager Approval", config: { escalation: "manager" }, position: { x: 700, y: 100 }, connections: ["node-6"] },
      { id: "node-5", type: "task", label: "Auto-Approve", config: { action: "approve" }, position: { x: 700, y: 300 }, connections: ["node-6"] },
      { id: "node-6", type: "integration", label: "Process in NetSuite", config: { integration: "netsuite" }, position: { x: 900, y: 200 }, connections: [] },
    ],
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-12-28T16:00:00Z",
    lastRun: "2024-12-28T16:00:00Z",
    runCount: 2341,
    successRate: 99.1,
  },
  {
    id: "workflow-5",
    name: "Customer Health Monitoring",
    description: "Automated tracking of customer health signals and alerting",
    status: "active",
    blueprintId: "blueprint-persona-7",
    nodes: [
      { id: "node-1", type: "trigger", label: "Daily Schedule", config: { cron: "0 9 * * *" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "Analyze Usage", config: { metrics: ["logins", "feature_usage", "support_tickets"] }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "condition", label: "Health Score < 70?", config: { threshold: 70 }, position: { x: 500, y: 200 }, connections: ["node-4", "node-5"] },
      { id: "node-4", type: "task", label: "Alert CSM", config: { channel: "slack" }, position: { x: 700, y: 100 }, connections: [] },
      { id: "node-5", type: "task", label: "Update Dashboard", config: { action: "log" }, position: { x: 700, y: 300 }, connections: [] },
    ],
    createdAt: "2024-11-20T10:00:00Z",
    updatedAt: "2024-12-28T09:00:00Z",
    lastRun: "2024-12-28T09:00:00Z",
    runCount: 38,
    successRate: 100,
  },
  // Marketing Workflows
  {
    id: "workflow-6",
    name: "Content Publishing Pipeline",
    description: "Automated blog content optimization and multi-channel publishing",
    status: "active",
    blueprintId: "blueprint-persona-9",
    nodes: [
      { id: "node-1", type: "trigger", label: "New Draft Ready", config: { source: "Google Docs", event: "document.approved" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "SEO Optimizer", config: { model: "gpt-4", tasks: ["meta_tags", "keywords", "readability"] }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "approval", label: "Content Review", config: { assignee: "Content Manager" }, position: { x: 500, y: 200 }, connections: ["node-4"] },
      { id: "node-4", type: "integration", label: "Publish to WordPress", config: { integration: "wordpress", action: "publish" }, position: { x: 700, y: 200 }, connections: ["node-5"] },
      { id: "node-5", type: "task", label: "Schedule Social Posts", config: { platforms: ["twitter", "linkedin", "facebook"] }, position: { x: 900, y: 200 }, connections: [] },
    ],
    createdAt: "2024-11-25T10:00:00Z",
    updatedAt: "2024-12-28T11:00:00Z",
    lastRun: "2024-12-28T10:30:00Z",
    runCount: 156,
    successRate: 97.4,
  },
  {
    id: "workflow-7",
    name: "Ad Campaign Performance Monitor",
    description: "Real-time monitoring and alerting for paid advertising campaigns",
    status: "active",
    blueprintId: "blueprint-persona-10",
    nodes: [
      { id: "node-1", type: "trigger", label: "Hourly Check", config: { cron: "0 * * * *" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "Analyze Metrics", config: { platforms: ["google_ads", "meta_ads"], metrics: ["cpc", "ctr", "conversions", "roas"] }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "condition", label: "Performance Issue?", config: { rules: ["cpc > threshold", "ctr < benchmark"] }, position: { x: 500, y: 200 }, connections: ["node-4", "node-5"] },
      { id: "node-4", type: "task", label: "Alert Marketing Team", config: { channel: "slack", urgency: "high" }, position: { x: 700, y: 100 }, connections: ["node-6"] },
      { id: "node-5", type: "task", label: "Log to Dashboard", config: { action: "update_metrics" }, position: { x: 700, y: 300 }, connections: [] },
      { id: "node-6", type: "agent", label: "Generate Recommendations", config: { model: "gpt-4", context: "campaign_optimization" }, position: { x: 900, y: 100 }, connections: [] },
    ],
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-28T14:00:00Z",
    lastRun: "2024-12-28T14:00:00Z",
    runCount: 648,
    successRate: 99.5,
  },
  {
    id: "workflow-8",
    name: "Lead Nurture Email Sequence",
    description: "Personalized email sequences based on lead behavior and engagement",
    status: "active",
    blueprintId: "blueprint-persona-11",
    nodes: [
      { id: "node-1", type: "trigger", label: "Lead Score Changed", config: { source: "HubSpot", event: "lead.score_updated" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "condition", label: "Score 50-80?", config: { min: 50, max: 80 }, position: { x: 300, y: 200 }, connections: ["node-3", "node-7"] },
      { id: "node-3", type: "agent", label: "Personalize Content", config: { model: "gpt-4", data: ["industry", "company_size", "interests"] }, position: { x: 500, y: 100 }, connections: ["node-4"] },
      { id: "node-4", type: "task", label: "Select Email Template", config: { templates: ["nurture_v1", "nurture_v2", "nurture_v3"] }, position: { x: 700, y: 100 }, connections: ["node-5"] },
      { id: "node-5", type: "integration", label: "Send via HubSpot", config: { integration: "hubspot", action: "send_email" }, position: { x: 900, y: 100 }, connections: ["node-6"] },
      { id: "node-6", type: "task", label: "Update CRM", config: { action: "log_touchpoint" }, position: { x: 1100, y: 100 }, connections: [] },
      { id: "node-7", type: "task", label: "Route to Sales", config: { condition: "score >= 80", assignee: "SDR Team" }, position: { x: 500, y: 300 }, connections: [] },
    ],
    createdAt: "2024-12-05T10:00:00Z",
    updatedAt: "2024-12-28T12:00:00Z",
    lastRun: "2024-12-28T11:45:00Z",
    runCount: 423,
    successRate: 98.1,
  },
  {
    id: "workflow-9",
    name: "Marketing Data Cleanup",
    description: "Automated data hygiene and deduplication for marketing database",
    status: "active",
    blueprintId: "blueprint-persona-11",
    nodes: [
      { id: "node-1", type: "trigger", label: "Weekly Schedule", config: { cron: "0 2 * * 0" }, position: { x: 100, y: 200 }, connections: ["node-2"] },
      { id: "node-2", type: "agent", label: "Identify Duplicates", config: { matching: ["email", "company", "phone"] }, position: { x: 300, y: 200 }, connections: ["node-3"] },
      { id: "node-3", type: "task", label: "Merge Records", config: { strategy: "keep_most_recent", preserve_history: true }, position: { x: 500, y: 200 }, connections: ["node-4"] },
      { id: "node-4", type: "agent", label: "Enrich Data", config: { provider: "clearbit", fields: ["company_size", "industry", "revenue"] }, position: { x: 700, y: 200 }, connections: ["node-5"] },
      { id: "node-5", type: "task", label: "Generate Report", config: { metrics: ["records_merged", "records_enriched", "data_quality_score"] }, position: { x: 900, y: 200 }, connections: [] },
    ],
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-28T02:00:00Z",
    lastRun: "2024-12-28T02:00:00Z",
    runCount: 12,
    successRate: 100,
  },
];

// Mock Org Metrics
export const mockOrgMetrics: OrgMetrics = {
  totalPersonas: 11,
  totalTasks: 77,
  tasksAutomated: 48,
  tasksManual: 29,
  totalWorkflows: 9,
  activeWorkflows: 9,
  automationCoverage: 62,
  totalTimeSavedPerWeek: 168,
  aiUtilization: 75,
};

// Mock Department Metrics
export const mockDepartmentMetrics: DepartmentMetrics[] = [
  { departmentId: "dept-1", departmentName: "Sales", totalPersonas: 2, automationCoverage: 65, activeWorkflows: 2, timeSavedPerWeek: 38 },
  { departmentId: "dept-2", departmentName: "Engineering", totalPersonas: 2, automationCoverage: 45, activeWorkflows: 0, timeSavedPerWeek: 22 },
  { departmentId: "dept-3", departmentName: "Human Resources", totalPersonas: 1, automationCoverage: 72, activeWorkflows: 1, timeSavedPerWeek: 28 },
  { departmentId: "dept-4", departmentName: "Operations", totalPersonas: 2, automationCoverage: 55, activeWorkflows: 1, timeSavedPerWeek: 24 },
  { departmentId: "dept-5", departmentName: "Finance", totalPersonas: 1, automationCoverage: 68, activeWorkflows: 1, timeSavedPerWeek: 31 },
  { departmentId: "dept-6", departmentName: "Marketing", totalPersonas: 3, automationCoverage: 70, activeWorkflows: 4, timeSavedPerWeek: 41 },
];

// Mock Governance Events
export const mockGovernanceEvents: GovernanceEvent[] = [
  { id: "gov-1", type: "approval_required", title: "High-value expense pending", description: "Expense report for $2,450 requires manager approval", workflowId: "workflow-4", workflowName: "Expense Processing", timestamp: "2024-12-28T15:45:00Z", status: "pending" },
  { id: "gov-2", type: "exception", title: "Lead scoring anomaly", description: "AI confidence below threshold for lead scoring", workflowId: "workflow-1", workflowName: "Lead Qualification Automation", timestamp: "2024-12-28T14:30:00Z", status: "resolved" },
  { id: "gov-3", type: "escalation", title: "Customer at-risk alert", description: "Enterprise customer health score dropped below 50", workflowId: "workflow-5", workflowName: "Customer Health Monitoring", timestamp: "2024-12-28T09:15:00Z", status: "pending" },
  { id: "gov-4", type: "audit", title: "Monthly compliance check", description: "Automated audit of expense policy compliance completed", workflowId: "workflow-4", workflowName: "Expense Processing", timestamp: "2024-12-27T00:00:00Z", status: "resolved" },
  { id: "gov-5", type: "approval_required", title: "New onboarding workflow", description: "Modified onboarding workflow requires admin approval", workflowId: "workflow-3", workflowName: "Employee Onboarding", timestamp: "2024-12-26T16:00:00Z", status: "resolved" },
];

// Chart data for Intelligence Dashboard
export const mockChartData = {
  automationTrend: [
    { month: "Jul", automated: 18, manual: 37 },
    { month: "Aug", automated: 22, manual: 33 },
    { month: "Sep", automated: 28, manual: 35 },
    { month: "Oct", automated: 35, manual: 32 },
    { month: "Nov", automated: 42, manual: 30 },
    { month: "Dec", automated: 48, manual: 29 },
  ],
  workflowPerformance: [
    { name: "Lead Qualification", runs: 1247, successRate: 98.5 },
    { name: "Email Outreach", runs: 892, successRate: 96.2 },
    { name: "Onboarding", runs: 45, successRate: 100 },
    { name: "Expense Processing", runs: 2341, successRate: 99.1 },
    { name: "Health Monitoring", runs: 38, successRate: 100 },
    { name: "Content Publishing", runs: 156, successRate: 97.4 },
    { name: "Ad Performance", runs: 648, successRate: 99.5 },
    { name: "Lead Nurture", runs: 423, successRate: 98.1 },
    { name: "Data Cleanup", runs: 12, successRate: 100 },
  ],
  timeSavedByDepartment: [
    { department: "Sales", hours: 38 },
    { department: "Engineering", hours: 22 },
    { department: "HR", hours: 28 },
    { department: "Operations", hours: 24 },
    { department: "Finance", hours: 31 },
    { department: "Marketing", hours: 41 },
  ],
};
