# Application Routes & Navigation (Studio-First + Page Transitions)

## Primary Routes

/ → Home (in-app overview, studio entry point)
/org-studio → Org Studio overview (org intake + personas)
/org-studio/personas/[id] → Persona detail page
/org-studio/blueprint → Org Blueprint (AI transformation plan)
/workflow-studio → Workflow Studio (execution)
/intelligence → Intelligence Dashboard
/settings → Settings

## Global Layout

- AppShell
  - LeftNav
  - TopBar
  - Breadcrumbs
  - MainContent
  - Route transition wrapper (Framer Motion)

## Primary Navigation (LeftNav)

- Home
- Org Studio (primary highlight)
- Workflow Studio
- Intelligence
- Settings

## Breadcrumb Pattern

Home → Org Studio → Persona → Blueprint → Workflow Studio → Intelligence

Breadcrumbs must update dynamically as user moves through the journey.

## Navigation Rules

- Org Studio is the default starting point
- Workflow Studio is entered primarily from Org Blueprint ("Implement in Workflow Studio")
- Intelligence Dashboard is reachable from anywhere
- Navigation must preserve context (selected persona, org state) using a client-side store

## Route Transitions (Animation Rules)

- Apply page transitions between routes:
  - enter: fade in + slight upward translate (e.g., y: 8 → 0)
  - exit: fade out + slight downward translate (e.g., y: 0 → -8)
- Keep transitions fast (150–250ms)
- Use AnimatePresence for route transitions
- Respect reduced motion:
  - if prefers-reduced-motion, disable translate and use minimal fade only

## Route Guarding

- No authentication logic required (mock app)
- Assume a single org context for now
