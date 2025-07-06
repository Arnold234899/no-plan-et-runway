
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SalesAnalytics {
  id: string;
  date: string;
  period_type: string;
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
  new_customers: number;
  returning_customers: number;
  top_products: any[];
  top_categories: any[];
}

interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_name: string;
  created_at: string;
  properties: any;
}

export const AnalyticsDashboard = () => {
  const [salesData, setSalesData] = useState<SalesAnalytics[]>([]);
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch recent sales analytics
      const { data: salesAnalytics, error: salesError } = await supabase
        .from('sales_analytics')
        .select('*')
        .eq('period_type', 'daily')
        .order('date', { ascending: false })
        .limit(30);

      if (salesError) {
        console.error('Error fetching sales analytics:', salesError);
      } else {
        setSalesData(salesAnalytics || []);
      }

      // Fetch recent analytics events
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (eventsError) {
        console.error('Error fetching analytics events:', eventsError);
      } else {
        setRecentEvents(events || []);
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestMetrics = () => {
    if (salesData.length === 0) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        newCustomers: 0
      };
    }

    const latest = salesData[0];
    return {
      totalRevenue: latest.total_revenue,
      totalOrders: latest.total_orders,
      averageOrderValue: latest.average_order_value,
      newCustomers: latest.new_customers
    };
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return 'secondary';
      case 'purchase':
        return 'default';
      case 'add_to_cart':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return <div className="text-white">Loading analytics...</div>;
  }

  const metrics = getLatestMetrics();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${metrics.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${metrics.averageOrderValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-300">New Customers</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.newCustomers}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">
              No recent activity to display.
            </p>
          ) : (
            <div className="space-y-4">
              {recentEvents.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant={getEventTypeColor(event.event_type) as any}>
                      {event.event_type}
                    </Badge>
                    <span className="text-white">{event.event_name}</span>
                  </div>
                  <span className="text-zinc-400 text-sm">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
