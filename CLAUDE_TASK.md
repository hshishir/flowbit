# Claude Build Task — FlowBit (Studio-First, Animated UI)

You are a senior product designer and expert frontend engineer.
Your task is to build a **production-quality frontend application**, NOT wireframes, for an enterprise SaaS product called **FlowBit**.

This app must look and feel like a real, polished, modern enterprise product with subtle, purposeful animations.

---

## 1) Product Framing (DO NOT IGNORE)

FlowBit is a **studio-centric AI platform**.

### Studios are the product (the UI heroes)

- **Org Studio** — understands organization, personas, tasks, workflows; generates an AI Org Blueprint.
- **Workflow Studio** — implements and runs automation workflows derived from Org Studio.

### Supporting engines (NOT UI heroes)

- Agent Garden (agents)
- Model Garden (model routing)
- MCP Hub (integrations)
- Maestro AI (governance + optimization)
- Unified Intelligence Layer (analytics)

The UI must always lead users through:
**Org → Personas → Tasks → Blueprint → Workflows → Intelligence**

Do NOT build an agent playground.
Do NOT build a chatbot-first UI.
Do NOT visually emphasize AI engines over Studios.

---

## 2) Tech Stack (MANDATORY — do not deviate)

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **lucide-react** (icons)
- **Framer Motion** (animations)
- **Recharts** (charts)
- **Zustand** (client-side state)
- **React Hook Form + zod** (forms)

No backend.
Use realistic **mock data only**.

---

## 3) Required Inputs (Read These Before Coding)

You MUST read and follow these files (they define IA, page content, and design system):

- `docs/design-brief.md`
- `docs/style-references.md`
- `docs/routes.md`
- `docs/pages.md`

If anything is unclear, make reasonable assumptions aligned with a **studio-first enterprise product**.

---

## 4) UX & Design Requirements (Non-Negotiable)

### This MUST be

- Polished enterprise UI
- Clean layout
- Consistent spacing & typography
- Clear hierarchy and navigation
- Production-ready reusable components

### This MUST NOT be

- Wireframes
- Box-only placeholder layouts
- Canvas-only mockups
- Lorem ipsum content

### Required UI patterns

- App shell (left nav + top bar + breadcrumbs)
- Cards, tables, tabs, badges
- Side panels (Sheets)
- Modals
- Steppers
- KPI strips
- Empty states
- Skeleton loaders
- Toast notifications

---

## 5) Animation & Motion Requirements (MANDATORY)

### Animation philosophy

- Subtle
- Purposeful
- Fast
- Professional
- Non-distracting

### Use Framer Motion for

- Page transitions
- Panel open/close
- Stepper progress
- Blueprint task reassignment
- Canvas interactions (selection, panel updates)
- Content stagger on load

### Route transitions

- Use `AnimatePresence`
- Enter: fade in + slight upward translate (y: 8 → 0)
- Exit: fade out + slight downward translate (y: 0 → -8)
- Duration: 150–250ms
- Respect `prefers-reduced-motion`:
  - If reduced motion, remove translate and use minimal fade only

### Component animations

- Cards: hover lift + shadow
- Tables: skeleton loading shimmer
- Tabs: subtle indicator animation
- Modals/Sheets: slide + fade
- KPI counters: subtle count-up
- Workflow Studio:
  - node selection highlight
  - properties panel slide-in

Do NOT over-animate charts or dashboards.

---

## 6) Pages & Routes to Implement (ALL REQUIRED)

### Routes

- `/` → Home (in-app overview / studio entry)
- `/org-studio` → Org Studio overview
- `/org-studio/personas/[id]` → Persona Detail
- `/org-studio/blueprint` → Org Blueprint
- `/workflow-studio` → Workflow Studio builder
- `/intelligence` → Intelligence Dashboard
- `/settings` → Settings

### Navigation rules

- Org Studio is the primary entry point
- Workflow Studio is entered mainly from Blueprint CTA
- Intelligence is reachable from anywhere
- Breadcrumbs must update dynamically:
  Home → Org Studio → Persona → Blueprint → Workflow Studio → Intelligence

---

## 7) Page Expectations (High-Level)

### Home (`/`)

- Studio-first messaging
- Clear CTAs
- Status summary
- Animated section entrance (stagger)

### Org Studio (`/org-studio`)

- Org intake (import + manual setup) via modal/sheet
- Personas table with search/filter
- Sticky right summary panel
- Skeleton loading states
- Smooth modal/sheet animations

### Persona Detail (`/org-studio/personas/[id]`)

- Task table with filters + search
- Sticky AI Suggestions panel with confidence badges
- Drawer/Sheet for task details
- “Generate Blueprint” flow:
  - animated loading state (“Generating…”)
  - toast success
  - navigate to Blueprint page

### Org Blueprint (`/org-studio/blueprint`)

- Split view: Human vs AI tasks
- Animated reassignment (use `layoutId` in Framer Motion)
- KPI strip with subtle count-up
- Primary CTA: “Implement in Workflow Studio”

### Workflow Studio (`/workflow-studio`)

- Builder-style layout:
  - Left: workflow list + step palette
  - Center: canvas with nodes + connectors (polished placeholder; no full drag-drop required)
  - Right: properties panel for selected node
- Node selection animation
- Fake “Test workflow” run:
  - progress indicator
  - animated log entries appearing in sequence

### Intelligence Dashboard (`/intelligence`)

- Tabs: Persona / Department / Org
- KPI header cards
- Recharts charts (simple bar/line)
- Tables for top personas, workflow performance, governance events
- Subtle stagger on load; avoid heavy chart animation

### Settings (`/settings`)

- Calm UI, minimal motion
- Optional “Reduce animations” toggle (mirrors reduced motion behavior)

---

## 8) State Management & Data

### Data models (mocked)

- Org
- Department
- Persona
- Task
- Blueprint
- Workflow
- Metrics (persona, department, org)

### State rules

- Use Zustand to store:
  - selected org
  - persona list
  - selected persona
  - generated blueprint
  - workflows
  - metrics
- Preserve context across navigation.

No backend calls. Use mock data modules under `src/mocks`.

---

## 9) File Structure Expectations

Use a clean, scalable structure similar to.

---

## 10) Build & Delivery Process (IMPORTANT)

### Step 1 — Plan first

Output:

- Proposed file tree
- Concise implementation plan (bullet list)
  Then proceed to implementation.

### Step 2 — Implement

- Scaffold Next.js app
- Install dependencies
- Configure Tailwind + shadcn/ui
- Implement AppShell and all pages
- Add Framer Motion transitions and component motion
- Use mock data + Zustand store

### Step 3 — Verify

Ensure:

- `npm install`
- `npm run dev`
- No runtime errors
- Smooth navigation
- Visible and tasteful animations

### Step 4 — Handoff

Provide:

- README with run instructions
- List of primary user flows to click through
- Notes on how to extend pages/components

---

## 11) Success Criteria (Definition of Done)

This is successful ONLY IF:

- The UI looks like a real enterprise SaaS product (not wireframes)
- Studios are clearly the hero and primary navigation focus
- The user journey is intuitive end-to-end
- Animations are tasteful and improve clarity
- All pages have meaningful content with realistic mock data
- No broken routes, no console errors

Build as if this will be shown to executives and investors.
