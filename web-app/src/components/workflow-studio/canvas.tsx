"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { WorkflowNode } from "./workflow-node";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Workflow } from "@/mocks/types";

interface CanvasProps {
  workflow: Workflow;
}

export function Canvas({ workflow }: CanvasProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const { selectedNodeId, setSelectedNodeId } = useAppStore();

  // Draw connection lines between nodes
  const renderConnections = () => {
    return workflow.nodes.map((node) => {
      return node.connections.map((targetId) => {
        const targetNode = workflow.nodes.find((n) => n.id === targetId);
        if (!targetNode) return null;

        const startX = node.position.x + 160; // Right side of node
        const startY = node.position.y + 28; // Center of node
        const endX = targetNode.position.x; // Left side of target
        const endY = targetNode.position.y + 28;

        // Create a curved path
        const midX = (startX + endX) / 2;

        const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

        return (
          <motion.path
            key={`${node.id}-${targetId}`}
            d={pathD}
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6,4"
            initial={reducedMotion ? {} : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        );
      });
    });
  };

  return (
    <div
      ref={canvasRef}
      className="relative h-full w-full overflow-auto bg-[radial-gradient(circle,_var(--border)_1px,_transparent_1px)] [background-size:24px_24px]"
      onClick={(e) => {
        if (e.target === canvasRef.current) {
          setSelectedNodeId(null);
        }
      }}
    >
      {/* Connection lines SVG */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {renderConnections()}
      </svg>

      {/* Nodes */}
      {workflow.nodes.map((node) => (
        <WorkflowNode
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          onClick={() => setSelectedNodeId(node.id)}
        />
      ))}

      {/* Empty state hint */}
      {workflow.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">
              Drag steps from the palette to build your workflow
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
