
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryAlerts } from "@/components/inventory/InventoryAlerts";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { EmailCampaigns } from "@/components/email/EmailCampaigns";
import { BarChart3, Mail, Package, AlertTriangle } from "lucide-react";

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Campaigns</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryAlerts />
          </TabsContent>

          <TabsContent value="email">
            <EmailCampaigns />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
