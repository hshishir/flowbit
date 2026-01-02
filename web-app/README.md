# FlowBit - AI-Powered Organization Studio

A production-quality enterprise SaaS application for designing, automating, and operating organizations with AI.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Zustand** for state management
- **lucide-react** for icons

## Getting Started

### Installation

```bash
cd web-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Application Structure

### Routes

| Route | Description |
|-------|-------------|
| `/` | Home - Studio entry point with overview |
| `/org-studio` | Org Studio - Persona management and org intake |
| `/org-studio/personas/[id]` | Persona Detail - Task analysis and AI suggestions |
| `/org-studio/blueprint` | AI Blueprint - Human vs AI task assignment |
| `/workflow-studio` | Workflow Studio - Visual workflow builder |
| `/intelligence` | Intelligence Dashboard - Metrics and analytics |
| `/settings` | Settings - Configuration and preferences |

### Primary User Flows

1. **Start with Org Studio**
   - Navigate to `/org-studio`
   - View the personas table
   - Click on a persona to view details

2. **Generate AI Blueprint**
   - From a persona detail page (`/org-studio/personas/[id]`)
   - Click "Generate AI Blueprint"
   - Watch the animated loading state
   - Get redirected to the Blueprint page

3. **Review and Adjust Blueprint**
   - On `/org-studio/blueprint`
   - View tasks split between Human and AI columns
   - Click "To AI" or "To Human" buttons to reassign tasks
   - Watch the animated task movement between columns
   - View updated KPI metrics

4. **Implement in Workflow Studio**
   - Click "Implement in Workflow Studio"
   - View the workflow builder interface
   - Select nodes to view/edit properties
   - Click "Test" to run a simulated workflow execution

5. **Monitor with Intelligence**
   - Navigate to `/intelligence`
   - Switch between Persona, Department, and Org views
   - View charts and performance tables

## Key Features

### Animations

- **Page transitions**: Fade + slide with Framer Motion
- **Staggered reveals**: Cards and list items animate in sequence
- **Blueprint reassignment**: Animated task movement with `layoutId`
- **Node selection**: Interactive workflow canvas
- **Reduced motion**: Respects `prefers-reduced-motion` setting

### Design System

- **Color palette**: Warm amber primary accent with neutral grays
- **Typography**: Geist font family (sans + mono)
- **Spacing**: Consistent 4px grid system
- **Components**: shadcn/ui with custom styling

### State Management

- Zustand store with persistence
- Mock data for all entities
- Cross-page state preservation

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── org-studio/        # Org Studio routes
│   ├── workflow-studio/   # Workflow Studio
│   ├── intelligence/      # Dashboard
│   └── settings/          # Settings
├── components/
│   ├── layout/            # AppShell, Nav, Breadcrumbs
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # KPI cards, steppers, etc.
│   ├── home/              # Home page components
│   ├── org-studio/        # Org Studio components
│   ├── blueprint/         # Blueprint components
│   ├── workflow-studio/   # Workflow builder components
│   └── intelligence/      # Dashboard components
├── stores/                # Zustand store
├── mocks/                 # Mock data and types
├── lib/                   # Utilities and motion variants
└── hooks/                 # Custom hooks
```

## Extending the Application

### Adding a New Page

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with the page component
3. Wrap content with `AppShell` and `PageTransition`
4. Update navigation in `src/components/layout/left-nav.tsx`

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Use existing motion variants from `src/lib/motion.ts`
3. Support reduced motion with `useReducedMotion` hook
4. Follow shadcn/ui patterns for consistency

### Modifying Mock Data

1. Update types in `src/mocks/types.ts`
2. Modify data in `src/mocks/data.ts`
3. Update Zustand store if needed in `src/stores/app-store.ts`

## Notes

- This is a frontend-only application with mock data
- No backend integration required
- All data is stored in client-side state (Zustand with persistence)
- Charts may show warnings during static generation (harmless)
