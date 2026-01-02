"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { HeroSection } from "@/components/home/hero-section";
import { FlowStrip } from "@/components/home/flow-strip";
import { StudioCards } from "@/components/home/studio-cards";
import { StatusSummary } from "@/components/home/status-summary";

export default function HomePage() {
  return (
    <AppShell hideBreadcrumbs>
      <PageTransition>
        <div className="min-h-full">
          <HeroSection />
          <FlowStrip />
          <StudioCards />
          <StatusSummary />
        </div>
      </PageTransition>
    </AppShell>
  );
}
