"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  "": "Home",
  "org-studio": "Org Studio",
  "personas": "Personas",
  "blueprint": "Blueprint",
  "workflow-studio": "Workflow Studio",
  "intelligence": "Intelligence",
  "settings": "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { breadcrumbPersonaName } = useAppStore();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      // Check if this is a dynamic segment (persona ID)
      if (segments[i - 1] === "personas" && segment !== "personas") {
        if (breadcrumbPersonaName) {
          breadcrumbs.push({
            label: breadcrumbPersonaName,
            href: currentPath,
          });
        }
        continue;
      }

      const label = routeLabels[segment];
      if (label) {
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center px-6 py-3">
      <ol className="flex items-center gap-1 text-sm">
        <AnimatePresence mode="popLayout">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <motion.li
                key={crumb.href}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                )}
                {isLast ? (
                  <span className="font-medium text-foreground">
                    {isFirst ? (
                      <Home className="h-3.5 w-3.5" />
                    ) : (
                      crumb.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "text-muted-foreground transition-colors hover:text-foreground",
                      isFirst && "flex items-center"
                    )}
                  >
                    {isFirst ? (
                      <Home className="h-3.5 w-3.5" />
                    ) : (
                      crumb.label
                    )}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </nav>
  );
}
