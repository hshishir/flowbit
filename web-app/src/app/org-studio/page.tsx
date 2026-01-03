"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Building2 } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { DepartmentCards } from "@/components/org-studio/department-cards";
import { ImportOrgModal } from "@/components/org-studio/import-org-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function OrgStudioPage() {
  const reducedMotion = useReducedMotion();
  const { org } = useAppStore();
  const [importModalOpen, setImportModalOpen] = useState(false);

  const topBarActions = (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setImportModalOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Import Org
      </Button>
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Add Persona
      </Button>
    </div>
  );

  return (
    <AppShell title="Org Studio" actions={topBarActions}>
      <PageTransition>
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="p-6"
        >
          {/* Main Content */}
          <div className="space-y-6">
            {/* Org Intake Card */}
            <motion.div variants={reducedMotion ? {} : staggerItem}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Organization Overview
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setImportModalOpen(true)}>
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Organization</p>
                        <p className="font-semibold">{org?.name || "Not set"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-semibold">{org?.industry || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="font-semibold">{org?.size || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Departments</p>
                      <p className="font-semibold">{org?.departments.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Departments Section */}
            <motion.div variants={reducedMotion ? {} : staggerItem}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Departments</h2>
                <p className="text-sm text-muted-foreground">
                  Click a department to view personas
                </p>
              </div>
              <DepartmentCards />
            </motion.div>
          </div>
        </motion.div>
      </PageTransition>

      <ImportOrgModal open={importModalOpen} onOpenChange={setImportModalOpen} />
    </AppShell>
  );
}
