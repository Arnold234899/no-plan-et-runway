
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface InventoryAlert {
  id: string;
  product_id: string | null;
  variant_id: string | null;
  alert_type: string;
  threshold_quantity: number;
  current_quantity: number;
  is_active: boolean;
  last_triggered: string | null;
  created_at: string;
  products?: {
    name: string;
    image_url: string | null;
  };
  product_variants?: {
    size: string | null;
    color: string | null;
    products: {
      name: string;
      image_url: string | null;
    };
  };
}

export const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_alerts')
        .select(`
          *,
          products (name, image_url),
          product_variants (
            size,
            color,
            products (name, image_url)
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching alerts:', error);
        return;
      }

      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return <Package className="w-5 h-5 text-red-500" />;
      case 'low_stock':
        return <TrendingDown className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'out_of_stock':
        return 'destructive';
      case 'low_stock':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return <div className="text-white">Loading inventory alerts...</div>;
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6" />
          <span>Inventory Alerts</span>
          {alerts.length > 0 && (
            <Badge variant="destructive">{alerts.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-zinc-400 text-center py-8">
            No inventory alerts at the moment. All products are well-stocked!
          </p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const product = alert.products || alert.product_variants?.products;
              const productName = product?.name || 'Unknown Product';
              const variantInfo = alert.product_variants 
                ? `${alert.product_variants.size || ''} ${alert.product_variants.color || ''}`.trim()
                : '';

              return (
                <div key={alert.id} className="flex items-center space-x-4 p-4 bg-zinc-800 rounded-lg">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.alert_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-semibold">{productName}</h4>
                      {variantInfo && (
                        <span className="text-zinc-400 text-sm">({variantInfo})</span>
                      )}
                      <Badge variant={getAlertColor(alert.alert_type) as any}>
                        {alert.alert_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-zinc-400">
                      <span>Current Stock: {alert.current_quantity}</span>
                      <span>Threshold: {alert.threshold_quantity}</span>
                      {alert.last_triggered && (
                        <span>Last Alert: {new Date(alert.last_triggered).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
