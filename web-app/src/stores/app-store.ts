"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Org,
  Persona,
  Blueprint,
  Workflow,
  OrgMetrics,
  DepartmentMetrics,
  GovernanceEvent,
  Task,
} from "@/mocks/types";
import {
  mockOrg,
  mockPersonas,
  mockWorkflows,
  mockOrgMetrics,
  mockDepartmentMetrics,
  mockGovernanceEvents,
  generateBlueprintFromPersona,
} from "@/mocks/data";

interface AppState {
  // Org state
  org: Org | null;
  setOrg: (org: Org) => void;

  // Personas
  personas: Persona[];
  selectedPersonaId: string | null;
  setSelectedPersonaId: (id: string | null) => void;
  getPersonaById: (id: string) => Persona | undefined;

  // Task CRUD
  addTask: (personaId: string, task: Omit<Task, "id">) => Task;
  updateTask: (personaId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (personaId: string, taskId: string) => void;

  // Blueprints
  blueprints: Blueprint[];
  currentBlueprint: Blueprint | null;
  generateBlueprint: (personaId: string) => Promise<Blueprint>;
  updateBlueprintTask: (
    blueprintId: string,
    taskId: string,
    newAssignment: "human" | "ai"
  ) => void;

  // Workflows
  workflows: Workflow[];
  selectedWorkflowId: string | null;
  setSelectedWorkflowId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  createWorkflow: (name: string, description: string, departmentId?: string) => Workflow;
  updateWorkflow: (workflowId: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (workflowId: string) => void;

  // Metrics
  orgMetrics: OrgMetrics;
  departmentMetrics: DepartmentMetrics[];
  governanceEvents: GovernanceEvent[];

  // UI State
  isGeneratingBlueprint: boolean;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;

  // Navigation breadcrumb state
  breadcrumbPersonaName: string | null;
  setBreadcrumbPersonaName: (name: string | null) => void;

  // Initialize with mock data
  initialize: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      org: null,
      personas: [],
      selectedPersonaId: null,
      blueprints: [],
      currentBlueprint: null,
      workflows: [],
      selectedWorkflowId: null,
      selectedNodeId: null,
      orgMetrics: mockOrgMetrics,
      departmentMetrics: mockDepartmentMetrics,
      governanceEvents: mockGovernanceEvents,
      isGeneratingBlueprint: false,
      reducedMotion: false,
      breadcrumbPersonaName: null,

      // Actions
      setOrg: (org) => set({ org }),

      setSelectedPersonaId: (id) => {
        const persona = id ? get().personas.find((p) => p.id === id) : null;
        set({
          selectedPersonaId: id,
          breadcrumbPersonaName: persona?.name || null,
        });
      },

      getPersonaById: (id) => get().personas.find((p) => p.id === id),

      addTask: (personaId, taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        };

        set((state) => ({
          personas: state.personas.map((p) =>
            p.id === personaId
              ? {
                  ...p,
                  tasks: [...p.tasks, newTask],
                  taskCount: p.taskCount + 1,
                  estimatedHoursPerWeek: p.estimatedHoursPerWeek + newTask.timePerWeek,
                }
              : p
          ),
        }));

        return newTask;
      },

      updateTask: (personaId, taskId, updates) => {
        set((state) => ({
          personas: state.personas.map((p) => {
            if (p.id !== personaId) return p;

            const oldTask = p.tasks.find((t) => t.id === taskId);
            const updatedTasks = p.tasks.map((t) =>
              t.id === taskId ? { ...t, ...updates } : t
            );
            const hoursDiff = updates.timePerWeek !== undefined && oldTask
              ? updates.timePerWeek - oldTask.timePerWeek
              : 0;

            return {
              ...p,
              tasks: updatedTasks,
              estimatedHoursPerWeek: p.estimatedHoursPerWeek + hoursDiff,
            };
          }),
        }));
      },

      deleteTask: (personaId, taskId) => {
        set((state) => ({
          personas: state.personas.map((p) => {
            if (p.id !== personaId) return p;

            const taskToDelete = p.tasks.find((t) => t.id === taskId);
            const hoursToRemove = taskToDelete?.timePerWeek || 0;

            return {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== taskId),
              taskCount: p.taskCount - 1,
              estimatedHoursPerWeek: p.estimatedHoursPerWeek - hoursToRemove,
            };
          }),
        }));
      },

      generateBlueprint: async (personaId) => {
        set({ isGeneratingBlueprint: true });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const persona = get().personas.find((p) => p.id === personaId);
        if (!persona) {
          set({ isGeneratingBlueprint: false });
          throw new Error("Persona not found");
        }

        const blueprint = generateBlueprintFromPersona(persona);

        set((state) => ({
          blueprints: [...state.blueprints.filter((b) => b.personaId !== personaId), blueprint],
          currentBlueprint: blueprint,
          isGeneratingBlueprint: false,
        }));

        return blueprint;
      },

      updateBlueprintTask: (blueprintId, taskId, newAssignment) => {
        set((state) => {
          const blueprint = state.blueprints.find((b) => b.id === blueprintId);
          if (!blueprint) return state;

          const allTasks = [...blueprint.humanTasks, ...blueprint.aiTasks];
          const task = allTasks.find((t) => t.id === taskId);
          if (!task) return state;

          const updatedTask = { ...task, assignedTo: newAssignment };

          const newHumanTasks = newAssignment === "human"
            ? [...blueprint.humanTasks.filter((t) => t.id !== taskId), updatedTask]
            : blueprint.humanTasks.filter((t) => t.id !== taskId);

          const newAiTasks = newAssignment === "ai"
            ? [...blueprint.aiTasks.filter((t) => t.id !== taskId), updatedTask]
            : blueprint.aiTasks.filter((t) => t.id !== taskId);

          const updatedBlueprint = {
            ...blueprint,
            humanTasks: newHumanTasks,
            aiTasks: newAiTasks,
            metrics: {
              ...blueprint.metrics,
              automationCoverage: Math.round(
                (newAiTasks.length / (newHumanTasks.length + newAiTasks.length)) * 100
              ),
              workflowCount: newAiTasks.length,
            },
          };

          return {
            blueprints: state.blueprints.map((b) =>
              b.id === blueprintId ? updatedBlueprint : b
            ),
            currentBlueprint:
              state.currentBlueprint?.id === blueprintId
                ? updatedBlueprint
                : state.currentBlueprint,
          };
        });
      },

      setSelectedWorkflowId: (id) => set({ selectedWorkflowId: id, selectedNodeId: null }),

      setSelectedNodeId: (id) => set({ selectedNodeId: id }),

      createWorkflow: (name, description, departmentId) => {
        const now = new Date().toISOString();
        const workflowId = `workflow-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

        // Find first persona in department to create a blueprint link
        const persona = departmentId
          ? get().personas.find((p) => p.departmentId === departmentId)
          : null;

        const newWorkflow: Workflow = {
          id: workflowId,
          name,
          description,
          status: "draft",
          blueprintId: persona ? `blueprint-${persona.id}` : undefined,
          nodes: [
            {
              id: `node-${Date.now()}-1`,
              type: "trigger",
              label: "Start",
              config: { source: "Manual" },
              position: { x: 100, y: 200 },
              connections: [],
            },
          ],
          createdAt: now,
          updatedAt: now,
          runCount: 0,
          successRate: 0,
        };

        set((state) => ({
          workflows: [...state.workflows, newWorkflow],
          selectedWorkflowId: newWorkflow.id,
        }));

        return newWorkflow;
      },

      updateWorkflow: (workflowId, updates) => {
        set((state) => ({
          workflows: state.workflows.map((w) =>
            w.id === workflowId
              ? { ...w, ...updates, updatedAt: new Date().toISOString() }
              : w
          ),
        }));
      },

      deleteWorkflow: (workflowId) => {
        set((state) => ({
          workflows: state.workflows.filter((w) => w.id !== workflowId),
          selectedWorkflowId:
            state.selectedWorkflowId === workflowId ? null : state.selectedWorkflowId,
        }));
      },

      setReducedMotion: (value) => set({ reducedMotion: value }),

      setBreadcrumbPersonaName: (name) => set({ breadcrumbPersonaName: name }),

      initialize: () => {
        const state = get();
        if (!state.org) {
          set({
            org: mockOrg,
            personas: mockPersonas,
            workflows: mockWorkflows,
            selectedWorkflowId: mockWorkflows[0]?.id || null,
          });
        }
      },
    }),
    {
      name: "flowbit-storage",
      partialize: (state) => ({
        reducedMotion: state.reducedMotion,
        selectedPersonaId: state.selectedPersonaId,
        breadcrumbPersonaName: state.breadcrumbPersonaName,
      }),
    }
  )
);
