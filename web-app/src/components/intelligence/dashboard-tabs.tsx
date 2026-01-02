"use client";

import { motion } from "framer-motion";
import { Users, Building2, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface DashboardTabsProps {
  children: {
    persona: React.ReactNode;
    department: React.ReactNode;
    org: React.ReactNode;
  };
}

export function DashboardTabs({ children }: DashboardTabsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Tabs defaultValue="persona" className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="persona" className="gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Persona</span>
        </TabsTrigger>
        <TabsTrigger value="department" className="gap-2">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Department</span>
        </TabsTrigger>
        <TabsTrigger value="org" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">Organization</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="persona">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children.persona}
        </motion.div>
      </TabsContent>

      <TabsContent value="department">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children.department}
        </motion.div>
      </TabsContent>

      <TabsContent value="org">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children.org}
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
