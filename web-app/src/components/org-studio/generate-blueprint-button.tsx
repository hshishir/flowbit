"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { toast } from "sonner";

interface GenerateBlueprintButtonProps {
  personaId: string;
}

export function GenerateBlueprintButton({
  personaId,
}: GenerateBlueprintButtonProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const { generateBlueprint, isGeneratingBlueprint } = useAppStore();
  const [status, setStatus] = useState<"idle" | "generating" | "success">(
    "idle"
  );

  const handleGenerate = async () => {
    setStatus("generating");

    try {
      await generateBlueprint(personaId);
      setStatus("success");
      toast.success("Blueprint generated successfully!");

      // Navigate after a brief success state
      setTimeout(() => {
        router.push("/org-studio/blueprint");
      }, 800);
    } catch (error) {
      setStatus("idle");
      toast.error("Failed to generate blueprint. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={status !== "idle"}
      className="relative gap-2 overflow-hidden"
      size="lg"
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate AI Blueprint
            <ArrowRight className="h-4 w-4" />
          </motion.div>
        )}

        {status === "generating" && (
          <motion.div
            key="generating"
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Blueprint...
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? {} : { opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Success! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar animation */}
      {status === "generating" && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary-foreground/30"
        />
      )}
    </Button>
  );
}
