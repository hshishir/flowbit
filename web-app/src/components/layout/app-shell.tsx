"use client";

import { useEffect } from "react";
import { LeftNav } from "./left-nav";
import { TopBar } from "./top-bar";
import { Breadcrumbs } from "./breadcrumbs";
import { useAppStore } from "@/stores/app-store";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  leftContent?: React.ReactNode;
  hideBreadcrumbs?: boolean;
}

export function AppShell({
  children,
  title,
  actions,
  leftContent,
  hideBreadcrumbs = false,
}: AppShellProps) {
  const initialize = useAppStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Left Navigation */}
      <LeftNav />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar title={title} actions={actions} leftContent={leftContent} />

        {/* Breadcrumbs */}
        {!hideBreadcrumbs && <Breadcrumbs />}

        {/* Main Content */}
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
