
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'newsletter' | 'contact' | 'influencer';
  to: string;
  data: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    instagram_handle?: string;
    tiktok_handle?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    const { type, to, data } = emailRequest;

    let emailContent = {};

    switch (type) {
      case 'newsletter':
        emailContent = {
          from: "NO PLAN-ET B <hello@noplanetb.com>",
          to: [to],
          subject: "Welcome to the NO PLAN-ET B Revolution! 🌍",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; border-radius: 12px; overflow: hidden;">
              <div style="padding: 40px 30px; text-align: center;">
                <h1 style="font-size: 32px; font-weight: bold; background: linear-gradient(45deg, #10b981, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px;">
                  NO PLAN-ET B
                </h1>
                <h2 style="color: #10b981; margin-bottom: 30px;">Welcome to the Fashion Revolution!</h2>
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; color: #e2e8f0;">
                  Thank you for joining our mission to transform the fashion industry. Where consciousness meets couture, and sustainability shapes style.
                </p>
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <p style="color: #10b981; font-weight: bold; margin-bottom: 15px;">What's Next?</p>
                  <ul style="text-align: left; color: #cbd5e1; line-height: 1.8;">
                    <li>🌱 Be the first to know about new sustainable collections</li>
                    <li>✨ Exclusive access to limited edition pieces</li>
                    <li>🎯 Behind-the-scenes content from our design process</li>
                    <li>🌍 Updates on our environmental impact initiatives</li>
                  </ul>
                </div>
                <p style="color: #94a3b8; font-size: 16px; margin-top: 30px;">
                  The future of fashion is sustainable, and it starts with you.
                </p>
                <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                  Follow us on Instagram @no.plan_etb
                </p>
              </div>
            </div>
          `,
        };
        break;

      case 'contact':
        emailContent = {
          from: "NO PLAN-ET B <hello@noplanetb.com>",
          to: [to],
          subject: "We've Received Your Message - NO PLAN-ET B",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; border-radius: 12px; overflow: hidden;">
              <div style="padding: 40px 30px;">
                <h1 style="font-size: 28px; font-weight: bold; background: linear-gradient(45deg, #10b981, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; text-align: center;">
                  NO PLAN-ET B
                </h1>
                <h2 style="color: #10b981; margin-bottom: 20px;">Thank you for reaching out, ${data.name}!</h2>
                <p style="color: #e2e8f0; line-height: 1.6; margin-bottom: 25px;">
                  We've received your message about "${data.subject}" and our team will get back to you within 24-48 hours.
                </p>
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <p style="color: #10b981; font-weight: bold; margin-bottom: 10px;">Your Message:</p>
                  <p style="color: #cbd5e1; font-style: italic;">"${data.message}"</p>
                </div>
                <p style="color: #94a3b8; margin-top: 25px;">
                  In the meantime, follow our journey on Instagram @no.plan_etb for the latest updates on our sustainable fashion revolution.
                </p>
                <p style="color: #64748b; font-size: 14px; margin-top: 20px; text-align: center;">
                  Where consciousness meets couture 🌍
                </p>
              </div>
            </div>
          `,
        };
        break;

      case 'influencer':
        emailContent = {
          from: "NO PLAN-ET B <hello@noplanetb.com>",
          to: [to],
          subject: "Your Influencer Application - NO PLAN-ET B",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; border-radius: 12px; overflow: hidden;">
              <div style="padding: 40px 30px;">
                <h1 style="font-size: 28px; font-weight: bold; background: linear-gradient(45deg, #10b981, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; text-align: center;">
                  NO PLAN-ET B
                </h1>
                <h2 style="color: #10b981; margin-bottom: 20px;">Thank you for your interest, ${data.name}! 🌟</h2>
                <p style="color: #e2e8f0; line-height: 1.6; margin-bottom: 25px;">
                  We've received your influencer application and are excited about the possibility of collaborating with you!
                </p>
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <p style="color: #10b981; font-weight: bold; margin-bottom: 15px;">Application Details:</p>
                  <ul style="color: #cbd5e1; line-height: 1.6;">
                    ${data.instagram_handle ? `<li>Instagram: @${data.instagram_handle}</li>` : ''}
                    ${data.tiktok_handle ? `<li>TikTok: @${data.tiktok_handle}</li>` : ''}
                  </ul>
                </div>
                <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <p style="color: #3b82f6; font-weight: bold; margin-bottom: 10px;">What's Next?</p>
                  <p style="color: #cbd5e1; line-height: 1.6;">
                    Our partnerships team will review your application within 5-7 business days. We'll reach out if your profile aligns with our mission to revolutionize sustainable fashion.
                  </p>
                </div>
                <p style="color: #94a3b8; margin-top: 25px;">
                  Continue following our journey and showcasing sustainable fashion on your platforms!
                </p>
                <p style="color: #64748b; font-size: 14px; margin-top: 20px; text-align: center;">
                  Together, we're building a more conscious future 🌱
                </p>
              </div>
            </div>
          `,
        };
        break;

      default:
        throw new Error('Invalid email type');
    }

    console.log(`Sending ${type} email to ${to}`);
    
    const emailResponse = await resend.emails.send(emailContent);

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
