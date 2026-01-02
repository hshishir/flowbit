"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Workflow,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Org Studio",
    href: "/org-studio",
    icon: Building2,
    primary: true,
  },
  {
    label: "Workflow Studio",
    href: "/workflow-studio",
    icon: Workflow,
  },
  {
    label: "Intelligence",
    href: "/intelligence",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function LeftNav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex h-full w-[240px] flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-sidebar-foreground">
          FlowBit
        </span>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  item.primary && !active && "text-sidebar-foreground"
                )}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId={reducedMotion ? undefined : "nav-indicator"}
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                <Icon
                  className={cn(
                    "h-4.5 w-4.5 shrink-0 transition-colors duration-150",
                    active
                      ? "text-primary"
                      : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70"
                  )}
                />
                <span>{item.label}</span>

                {/* Primary badge */}
                {item.primary && (
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Start
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
            AC
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Acme Corporation
            </p>
            <p className="truncate text-xs text-muted-foreground">Enterprise</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
