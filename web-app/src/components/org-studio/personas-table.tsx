"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
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
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Persona } from "@/mocks/types";

interface PersonasTableProps {
  isLoading?: boolean;
}

export function PersonasTable({ isLoading = false }: PersonasTableProps) {
  const reducedMotion = useReducedMotion();
  const { personas, setSelectedPersonaId } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Persona>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const departments = [...new Set(personas.map((p) => p.department))];

  const filteredPersonas = personas
    .filter((persona) => {
      const matchesSearch =
        persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        persona.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
        departmentFilter.length === 0 ||
        departmentFilter.includes(persona.department);
      return matchesSearch && matchesDepartment;
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

  const handleSort = (field: keyof Persona) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getAutomationBadgeVariant = (
    readiness: Persona["automationReadiness"]
  ) => {
    switch (readiness) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="rounded-lg border">
          <div className="space-y-3 p-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search personas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Department
              {departmentFilter.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {departmentFilter.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {departments.map((dept) => (
              <DropdownMenuCheckboxItem
                key={dept}
                checked={departmentFilter.includes(dept)}
                onCheckedChange={(checked) => {
                  setDepartmentFilter(
                    checked
                      ? [...departmentFilter, dept]
                      : departmentFilter.filter((d) => d !== dept)
                  );
                }}
              >
                {dept}
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
                  Persona
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("department")}
              >
                <div className="flex items-center gap-2">
                  Department
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-center"
                onClick={() => handleSort("taskCount")}
              >
                <div className="flex items-center justify-center gap-2">
                  Tasks
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-center">Automation Readiness</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredPersonas.map((persona, index) => (
                <motion.tr
                  key={persona.id}
                  initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  className="group border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {persona.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {persona.role}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {persona.department}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono text-sm">{persona.taskCount}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={getAutomationBadgeVariant(
                        persona.automationReadiness
                      )}
                      className={cn(
                        "capitalize",
                        persona.automationReadiness === "high" &&
                          "bg-success text-success-foreground"
                      )}
                    >
                      {persona.automationReadiness}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => setSelectedPersonaId(persona.id)}
                    >
                      <Link href={`/org-studio/personas/${persona.id}`}>
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {filteredPersonas.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No personas found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredPersonas.length} of {personas.length} personas
      </p>
    </div>
  );
}
