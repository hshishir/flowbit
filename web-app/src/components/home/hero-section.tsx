"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      initial="initial"
      animate="enter"
      variants={reducedMotion ? {} : staggerContainer}
      className="relative overflow-hidden px-6 py-16 md:py-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div variants={reducedMotion ? {} : staggerItem}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Enterprise AI Platform
          </span>
        </motion.div>

        <motion.h1
          variants={reducedMotion ? {} : staggerItem}
          className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Design, automate, and operate your organization with{" "}
          <span className="text-primary">AI</span>
        </motion.h1>

        <motion.p
          variants={reducedMotion ? {} : staggerItem}
          className="mt-6 text-lg text-muted-foreground md:text-xl"
        >
          FlowBit helps you understand how work happens today, identify
          automation opportunities, and transform your operations with
          intelligent workflows.
        </motion.p>

        <motion.div
          variants={reducedMotion ? {} : staggerItem}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="gap-2 px-6">
            <Link href="/org-studio">
              <Building2 className="h-4 w-4" />
              Start with Org Studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 px-6">
            <Link href="/workflow-studio">
              <Workflow className="h-4 w-4" />
              Explore Workflow Studio
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
