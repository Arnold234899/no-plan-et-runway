
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsEventData {
  event_type: string;
  event_name: string;
  properties?: Record<string, any>;
  page_url?: string;
  referrer?: string;
}

export const trackEvent = async (eventData: AnalyticsEventData) => {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        ...eventData,
        session_id: getSessionId(),
        user_agent: navigator.userAgent,
        page_url: eventData.page_url || window.location.href,
        referrer: eventData.referrer || document.referrer,
        properties: eventData.properties || {}
      }]);

    if (error) {
      console.error('Error tracking event:', error);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent({
    event_type: 'page_view',
    event_name: `Page View: ${pageName}`,
    properties: {
      page_name: pageName
    }
  });
};

export const trackPurchase = (orderId: string, value: number, items: any[]) => {
  trackEvent({
    event_type: 'purchase',
    event_name: 'Purchase Completed',
    properties: {
      order_id: orderId,
      value: value,
      items: items
    }
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number) => {
  trackEvent({
    event_type: 'add_to_cart',
    event_name: 'Product Added to Cart',
    properties: {
      product_id: productId,
      product_name: productName,
      price: price
    }
  });
};

export const trackProductView = (productId: string, productName: string, category: string) => {
  trackEvent({
    event_type: 'product_view',
    event_name: 'Product Viewed',
    properties: {
      product_id: productId,
      product_name: productName,
      category: category
    }
  });
};

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track cart abandonment
export const trackCartAbandonment = async (cartData: any[], totalValue: number, email?: string) => {
  try {
    const { error } = await supabase
      .from('abandoned_carts')
      .insert([{
        session_id: getSessionId(),
        email: email || null,
        cart_data: cartData,
        total_value: totalValue
      }]);

    if (error) {
      console.error('Error tracking cart abandonment:', error);
    }
  } catch (error) {
    console.error('Error tracking cart abandonment:', error);
  }
};
