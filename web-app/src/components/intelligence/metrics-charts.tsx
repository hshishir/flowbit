"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { mockChartData } from "@/mocks/data";

export function AutomationTrendChart() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Automation Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData.automationTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="automated"
                  name="Automated"
                  stroke="var(--success)"
                  strokeWidth={2}
                  dot={{ fill: "var(--success)" }}
                  animationDuration={reducedMotion ? 0 : 1000}
                />
                <Line
                  type="monotone"
                  dataKey="manual"
                  name="Manual"
                  stroke="var(--muted-foreground)"
                  strokeWidth={2}
                  dot={{ fill: "var(--muted-foreground)" }}
                  animationDuration={reducedMotion ? 0 : 1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TimeSavedByDepartmentChart() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Time Saved by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData.timeSavedByDepartment}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="department"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  unit="h"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="hours"
                  name="Hours/Week"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={reducedMotion ? 0 : 800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WorkflowPerformanceChart() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workflow Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockChartData.workflowPerformance}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  type="number"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="runs"
                  name="Total Runs"
                  fill="var(--chart-2)"
                  radius={[0, 4, 4, 0]}
                  animationDuration={reducedMotion ? 0 : 800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
