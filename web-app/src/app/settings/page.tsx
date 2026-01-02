"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Workflow,
  Palette,
  Bell,
  Shield,
  Save,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/stores/app-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { toast } from "sonner";

export default function SettingsPage() {
  const reducedMotion = useReducedMotion();
  const { org, reducedMotion: storeReducedMotion, setReducedMotion } =
    useAppStore();

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const topBarActions = (
    <Button size="sm" onClick={handleSave}>
      <Save className="mr-2 h-4 w-4" />
      Save Changes
    </Button>
  );

  return (
    <AppShell title="Settings" actions={topBarActions}>
      <PageTransition>
        <motion.div
          initial="initial"
          animate="enter"
          variants={reducedMotion ? {} : staggerContainer}
          className="mx-auto max-w-3xl space-y-6 p-6"
        >
          {/* Organization Settings */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Organization</CardTitle>
                    <CardDescription>
                      Manage your organization settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      defaultValue={org?.name || ""}
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue={org?.industry || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select defaultValue={org?.size || ""}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="50-200">50-200</SelectItem>
                      <SelectItem value="200-500">200-500</SelectItem>
                      <SelectItem value="500-1000">500-1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Persona Management */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Persona Management</CardTitle>
                    <CardDescription>
                      Configure persona-related settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-detect tasks</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically suggest tasks based on role patterns
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI confidence threshold</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimum confidence for automation recommendations
                    </p>
                  </div>
                  <Select defaultValue="70">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Workflow Defaults */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Workflow Defaults</CardTitle>
                    <CardDescription>
                      Default settings for new workflows
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all workflow executions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Retry on failure</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically retry failed steps
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Default approval timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-escalate after this duration
                    </p>
                  </div>
                  <Select defaultValue="24">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Display Preferences */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Display Preferences</CardTitle>
                    <CardDescription>
                      Customize your visual experience
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Reduce animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize motion for accessibility
                    </p>
                  </div>
                  <Switch
                    checked={storeReducedMotion}
                    onCheckedChange={setReducedMotion}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing for denser layouts
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage notification preferences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Workflow alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when workflows need attention
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Approval requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify for pending approvals
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly performance summary
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div variants={reducedMotion ? {} : staggerItem}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Security and compliance settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all user actions for compliance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data retention</Label>
                    <p className="text-sm text-muted-foreground">
                      How long to keep execution logs
                    </p>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </PageTransition>
    </AppShell>
  );
}
