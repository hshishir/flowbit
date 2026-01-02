"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Building2, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { toast } from "sonner";

interface ImportOrgModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportOrgModal({ open, onOpenChange }: ImportOrgModalProps) {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("import");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate file processing
    handleFileUpload();
  };

  const handleFileUpload = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    toast.success("Organization data imported successfully");
    onOpenChange(false);
  };

  const handleManualSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsProcessing(false);
    toast.success("Organization created successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Set Up Your Organization</DialogTitle>
          <DialogDescription>
            Import your org structure or set it up manually to get started.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <Building2 className="h-4 w-4" />
              Manual Setup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="mt-4 space-y-4">
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              animate={{
                borderColor: isDragging
                  ? "var(--primary)"
                  : "var(--border)",
                backgroundColor: isDragging
                  ? "var(--accent)"
                  : "transparent",
              }}
              transition={{ duration: reducedMotion ? 0 : 0.15 }}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors"
            >
              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">
                      Processing your organization data...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Drop your file here</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        or click to browse
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports CSV, XLSX, JSON
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFileUpload}
                disabled={isProcessing}
              >
                Select File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <form onSubmit={handleManualSetup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  placeholder="e.g., Acme Corporation"
                  defaultValue="Acme Corporation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology"
                  defaultValue="Technology"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Input
                  id="size"
                  placeholder="e.g., 500-1000"
                  defaultValue="500-1000"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Organization
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
