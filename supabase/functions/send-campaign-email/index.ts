
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailCampaignRequest {
  campaignId: string;
  recipients: string[];
  subject: string;
  content: string;
  fromEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { campaignId, recipients, subject, content, fromEmail }: EmailCampaignRequest = await req.json();

    console.log(`Sending campaign ${campaignId} to ${recipients.length} recipients`);

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      batches.push(batch);
    }

    let totalSent = 0;
    let totalErrors = 0;

    for (const batch of batches) {
      try {
        const emailPromises = batch.map(email => 
          resend.emails.send({
            from: fromEmail || "Fashion Replay <noreply@fashionreplay.com>",
            to: [email],
            subject: subject,
            html: content,
          })
        );

        const results = await Promise.allSettled(emailPromises);
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            totalSent++;
            console.log(`Email sent successfully to ${batch[index]}`);
          } else {
            totalErrors++;
            console.error(`Failed to send email to ${batch[index]}:`, result.reason);
          }
        });

        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Batch sending error:', error);
        totalErrors += batch.length;
      }
    }

    console.log(`Campaign ${campaignId} completed: ${totalSent} sent, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({ 
        success: true,
        campaignId,
        totalSent,
        totalErrors,
        totalRecipients: recipients.length
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-campaign-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
