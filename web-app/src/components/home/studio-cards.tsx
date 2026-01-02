"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Workflow,
  ArrowRight,
  Users,
  ClipboardList,
  Zap,
  GitBranch,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cardHover, staggerContainer, staggerItem } from "@/lib/motion";

const studios = [
  {
    id: "org-studio",
    title: "Org Studio",
    subtitle: "Understand personas & tasks",
    description:
      "Map your organization structure, define personas, catalog their tasks, and generate an AI-powered transformation blueprint.",
    href: "/org-studio",
    icon: Building2,
    features: [
      { icon: Users, label: "Persona mapping" },
      { icon: ClipboardList, label: "Task analysis" },
      { icon: Zap, label: "AI recommendations" },
    ],
    primary: true,
  },
  {
    id: "workflow-studio",
    title: "Workflow Studio",
    subtitle: "Implement automation workflows",
    description:
      "Turn your blueprint into executable workflows. Design, test, and deploy AI-powered automations with human oversight.",
    href: "/workflow-studio",
    icon: Workflow,
    features: [
      { icon: GitBranch, label: "Visual builder" },
      { icon: Zap, label: "AI agents" },
      { icon: ClipboardList, label: "Approval flows" },
    ],
    primary: false,
  },
];

export function StudioCards() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="grid gap-6 md:grid-cols-2"
        >
          {studios.map((studio) => {
            const Icon = studio.icon;

            return (
              <motion.div
                key={studio.id}
                variants={reducedMotion ? {} : staggerItem}
                whileHover={reducedMotion ? {} : "hover"}
                initial="rest"
                animate="rest"
              >
                <motion.div variants={reducedMotion ? {} : cardHover}>
                  <Card
                    className={`relative h-full overflow-hidden ${
                      studio.primary ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    {studio.primary && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          Recommended
                        </span>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-xl font-semibold text-foreground">
                          {studio.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {studio.subtitle}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {studio.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {studio.features.map((feature) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div
                              key={feature.label}
                              className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                            >
                              <FeatureIcon className="h-3 w-3" />
                              {feature.label}
                            </div>
                          );
                        })}
                      </div>

                      <Button
                        asChild
                        className="w-full gap-2"
                        variant={studio.primary ? "default" : "outline"}
                      >
                        <Link href={studio.href}>
                          Open {studio.title}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
