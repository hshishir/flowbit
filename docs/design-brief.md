# FlowBit – Design Brief (Studio-First + Motion)

## Product Identity

FlowBit is an enterprise SaaS product that helps organizations understand how work is done today (personas, tasks, workflows) and transform it into AI-powered, automated operating models using Studios.

The UI must look and feel like a real, production-grade enterprise application — not a wireframe.

## Core UX Principle: Studio-First

- Org Studio and Workflow Studio are the heroes of the product.
- Agents, models, and integrations are supporting infrastructure and should not visually dominate the UI.
- The UI should always guide users from understanding → transformation → execution → intelligence.

## Target Users

- CTOs, COOs, Heads of Engineering, Sales, HR, Operations
- Senior managers and transformation leaders
- Users expect clarity, trust, and control — not gimmicks

## Visual Tone

- Enterprise-grade
- Modern, clean, minimal
- Calm, confident, high-trust
- No flashy gradients or consumer-style visuals
- Feels closer to Rippling, Linear, Notion, Vercel Dashboard

## Layout System

- App Shell layout:
  - Left navigation (primary)
  - Top bar (secondary actions)
  - Breadcrumbs (contextual navigation)
  - Main content area
- Desktop-first
- Responsive with collapsible nav for smaller screens

## Styling Guidelines

- Tailwind CSS with shadcn/ui components
- Neutral color palette (grays) with one accent color
- Clear typography hierarchy:
  - Page title
  - Section headers
  - Body text
  - Secondary metadata text
- Generous whitespace
- Subtle shadows on cards
- Clear visual grouping

## Motion & Animation Philosophy (IMPORTANT)

Animations must feel:

- professional
- subtle
- purposeful
- fast
- non-distracting

Use animations to:

- reduce perceived latency
- communicate hierarchy
- guide the user through the Studio journey
- make the product feel “premium”

Avoid:

- large bouncy motion
- excessive parallax
- over-animated dashboards
- distracting loop animations

## Animation Tech Requirements

- Use Framer Motion for component and page transitions
- Use CSS transitions for micro-interactions (hover, focus)
- Respect reduced motion preferences:
  - If user prefers reduced motion, minimize or disable animations

## Where to Animate

### Global

- Page transitions: fade + slight slide on route change
- Top-level layout mount: subtle fade-in
- LeftNav interactions: active indicator transition
- Breadcrumb transitions: subtle fade

### Components

- Cards: hover lift + subtle shadow change
- Tables: row hover highlight; loading skeleton shimmer
- Tabs: subtle underline/indicator animation
- Modals/Sheets: smooth slide + fade
- Toasts: slide-in

### Studio Journey Guidance

- Steppers (Org Studio): animate step changes and progress
- Side panels: animate open/close
- Blueprint split view: animate task reassignment between Human vs AI columns
- Workflow Studio: animate node selection and properties panel updates

## UI Components to Use Heavily

- Cards
- Tables (with sorting, filtering)
- Tabs
- Badges
- Side panels / sheets
- Modals
- Steppers
- Breadcrumbs
- Empty states
- Skeleton loaders
- Toast notifications

## Interaction Expectations

- Hover states on interactive elements
- Clear CTAs
- Inline help text
- Progressive disclosure (don’t overwhelm)
- Subtle transitions (CSS-based)
- Visible feedback on user actions (toast or inline status)

## What This Is NOT

- Not a canvas-only wireframe
- Not an agent playground
- Not a chatbot UI
- Not a marketing-only site

This should feel like software that runs a real company — with tasteful motion that makes it feel premium.
