"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  AlertTriangle,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Task } from "@/mocks/types";

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskTable({ tasks, onTaskClick }: TaskTableProps) {
  const reducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<Task["type"][]>([]);
  const [potentialFilter, setPotentialFilter] = useState<
    Task["automationPotential"][]
  >([]);
  const [sortField, setSortField] = useState<keyof Task>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const taskTypes: Task["type"][] = ["repetitive", "decision", "high-context"];
  const potentialLevels: Task["automationPotential"][] = ["high", "medium", "low"];

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter.length === 0 || typeFilter.includes(task.type);
      const matchesPotential =
        potentialFilter.length === 0 ||
        potentialFilter.includes(task.automationPotential);
      return matchesSearch && matchesType && matchesPotential;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  const handleSort = (field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getTypeBadgeVariant = (type: Task["type"]) => {
    switch (type) {
      case "repetitive":
        return "default";
      case "decision":
        return "secondary";
      case "high-context":
        return "outline";
    }
  };

  const getPotentialColor = (potential: Task["automationPotential"]) => {
    switch (potential) {
      case "high":
        return "text-success";
      case "medium":
        return "text-warning";
      case "low":
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Type
              {typeFilter.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {typeFilter.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {taskTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={typeFilter.includes(type)}
                onCheckedChange={(checked) => {
                  setTypeFilter(
                    checked
                      ? [...typeFilter, type]
                      : typeFilter.filter((t) => t !== type)
                  );
                }}
                className="capitalize"
              >
                {type.replace("-", " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Potential
              {potentialFilter.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {potentialFilter.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {potentialLevels.map((level) => (
              <DropdownMenuCheckboxItem
                key={level}
                checked={potentialFilter.includes(level)}
                onCheckedChange={(checked) => {
                  setPotentialFilter(
                    checked
                      ? [...potentialFilter, level]
                      : potentialFilter.filter((l) => l !== level)
                  );
                }}
                className="capitalize"
              >
                {level}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Task
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead
                className="cursor-pointer select-none text-center"
                onClick={() => handleSort("timePerWeek")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  Hours/Week
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead>Pain Points</TableHead>
              <TableHead className="text-center">Automation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, index) => (
                <motion.tr
                  key={task.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  onClick={() => onTaskClick(task)}
                  className="group cursor-pointer border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{task.name}</p>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getTypeBadgeVariant(task.type)}
                      className="capitalize"
                    >
                      {task.type.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono text-sm">{task.timePerWeek}h</span>
                  </TableCell>
                  <TableCell>
                    {task.painPoints.length > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                        <span className="text-sm text-muted-foreground">
                          {task.painPoints.length} issues
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "font-medium capitalize",
                        getPotentialColor(task.automationPotential)
                      )}
                    >
                      {task.automationPotential}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {filteredTasks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No tasks found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
    </div>
  );
}
