# Page Specifications – FlowBit (Polished UI + Motion)

All pages must be production-quality UI (not wireframe). Use shadcn/ui components and tasteful motion.

---

## 1. Home Page (/)

### Purpose

Introduce the platform and guide users into Org Studio (primary) or Workflow Studio (secondary).

### Key Sections

- Page header:
  - Title: “FlowBit”
  - Subtitle: “Design, automate, and operate your organization with AI”
- Primary CTAs:
  - Start with Org Studio
  - Explore Workflow Studio
- Conceptual flow section (visual strip):
  Org → Personas → Tasks → Workflows → AI Execution → Intelligence
- Studio highlights (two large cards):
  - Org Studio card: "Understand personas & tasks"
  - Workflow Studio card: "Implement automation workflows"
- Status summary:
  - Personas defined
  - Workflows active
  - Automation coverage

### Motion / Animation

- On page mount: header + cards fade in with slight stagger (Framer Motion)
- CTA hover: subtle scale/brightness
- Conceptual flow: step indicators animate in sequence (subtle)

---

## 2. Org Studio Overview (/org-studio)

### Purpose

Understand the organization and its personas.

### Key Sections

- Header + quick actions:
  - Import org (opens modal)
  - Manual setup (opens modal or inline form)
- Org intake panel (card):
  - Org name (mock)
  - Departments list
  - Last updated
- Personas table:
  - Persona name
  - Department
  - Number of tasks
  - Automation readiness indicator (badge)
  - Action: View persona
- Right-side panel (sticky on desktop):
  - Org summary metrics
  - “Next recommended step” card
- CTA:
  - Analyze automation potential (navigates to Blueprint or prompts selection)

### Motion / Animation

- Personas table loading: skeleton rows
- Import modal: slide+fade
- Persona row hover: subtle highlight + arrow reveal
- Side panel open/close: smooth slide

---

## 3. Persona Detail Page (/org-studio/personas/[id])

### Purpose

Deep dive into how a role works today, and generate an AI blueprint.

### Key Sections

- Persona header:
  - Role name
  - Department
  - Summary chips: tasks count, estimated hours/week
- Task table:
  - Task name
  - Type (repetitive / decision / high-context)
  - Time per week
  - Pain points (compact)
  - Automation potential (badge)
- Filters:
  - Task type
  - Automation potential
  - Search
- AI suggestions panel (right side, sticky):
  - “Tasks to Automate” list with confidence badges
  - “Tasks to Augment” list
  - Notes / rationale section
- CTA:
  - Generate AI Blueprint (primary)
  - Secondary: Save changes

### Motion / Animation

- Panel content loads with stagger
- Clicking a task row opens a details drawer (Sheet) with slide animation
- Generate Blueprint:
  - show “Generating…” progress state with animated loader
  - then toast success and transition to Blueprint page
- Respect reduced motion

---

## 4. Org Blueprint (/org-studio/blueprint)

### Purpose

Show AI-powered transformation plan and prepare implementation.

### Key Sections

- Blueprint summary header:
  - Persona(s) included
  - Expected efficiency lift
  - Automation coverage %
- Split view (two columns):
  - Human-handled tasks (left)
  - AI-handled tasks (right)
- Hybrid role definition card:
  - Human responsibilities
  - AI responsibilities
- KPI strip:
  - Time saved
  - Automation %
  - Workflow count
  - Estimated cost impact (mock)
- Primary CTA:
  - Implement in Workflow Studio

### Motion / Animation

- Split view columns animate in
- Task items have subtle hover and can be “reassigned”:
  - Clicking “Move to AI” animates item moving across columns (Framer Motion layoutId)
- KPI strip counts animate up slightly (small, tasteful)
- CTA hover: subtle emphasis

---

## 5. Workflow Studio (/workflow-studio)

### Purpose

Execute the blueprint as AI workflows using a builder-style UI.

### Layout (Builder)

- Top bar actions:
  - Test workflow
  - Activate workflow
  - Save draft
- Left panel:
  - Workflow list (generated from Blueprint)
  - Step palette (Task step, Approval, Integration, Agent step – abstracted)
- Center canvas:
  - Polished canvas placeholder:
    - nodes + connectors (simple, not full drag-drop required)
    - select node to edit properties
- Right properties panel:
  - Node configuration
  - Execution settings
  - Approval rules
  - Integration mappings (mock)

### Motion / Animation

- Switching workflows animates canvas transition (fade)
- Selecting a node animates highlight and slides in properties content
- Panels collapse/expand with smooth transitions
- “Test workflow” runs a fake simulation:
  - progress indicator
  - log list appears with staggered entries

---

## 6. Intelligence Dashboard (/intelligence)

### Purpose

Provide visibility into persona + org performance.

### Tabs

- Persona View
- Department View
- Org View

### Core UI

- KPI header strip (cards):
  - Tasks automated vs human
  - Time returned to humans
  - Workflow throughput
  - Automation coverage
  - AI utilization
- Charts (placeholder but real components):
  - Use Recharts (simple bar/line charts)
- Tables:
  - Top personas by automation
  - Workflows performance
  - Governance events (mock list)

### Motion / Animation

- KPI cards load with subtle stagger
- Tab switching: crossfade content
- Chart mount: subtle fade (avoid heavy animation)
- Table loading: skeleton

---

## 7. Settings (/settings)

### Purpose

Basic configuration.

### Sections

- Org settings
- Persona management
- Workflow defaults
- Display preferences
- Motion preferences (optional toggle):
  - “Reduce animations” (mirrors prefers-reduced-motion concept)

### Motion / Animation

- Minimal — keep settings calm
- Modal/drawer transitions if needed

---

## General UI Rules

- Every page must have a clear primary CTA
- Use real UI components (tables, cards, tabs)
- No lorem ipsum
- Use realistic mock data
- Maintain studio-first narrative throughout
- Respect reduced motion accessibility preferences
