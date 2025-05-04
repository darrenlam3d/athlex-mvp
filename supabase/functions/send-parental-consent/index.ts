
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://dndudgqkoiybenqnavoi.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, parentEmail, athleteId } = await req.json();
    
    if (!token || !parentEmail || !athleteId) {
      throw new Error("Missing required parameters");
    }

    // Get the athlete's name
    const { data: athlete, error: athleteError } = await supabase
      .from('athletes')
      .select('first_name, last_name')
      .eq('id', athleteId)
      .single();

    if (athleteError || !athlete) {
      throw new Error("Could not find athlete information");
    }

    const athleteName = `${athlete.first_name} ${athlete.last_name}`;
    console.log(`Processing parental consent email for ${athleteName}`);

    // Create verification URL with token
    const baseUrl = req.headers.get("origin") || Deno.env.get("PUBLIC_URL") || "https://athlex.info";
    const verificationUrl = `${baseUrl}/auth/verify-consent/${token}`;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'ATHLEX <noreply@athlex.info>',
      to: parentEmail,
      subject: `Parental Consent Required for ${athleteName}'s ATHLEX Account`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://athlex.info/lovable-uploads/8d80a549-8677-40a4-b998-647de9823d7b.png" alt="ATHLEX Logo" style="height: 50px; width: auto;">
          </div>
          
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">Parental Consent Required</h1>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Your child, <strong>${athleteName}</strong>, has created an account on ATHLEX, a platform for athlete 
            performance tracking and talent discovery.
          </p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            As required by PDPA regulations, we need your consent before allowing users under 13 years old 
            to use our platform.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">ATHLEX collects the following data:</h3>
            <ul style="color: #555; padding-left: 20px;">
              <li>Basic profile information (name, age, sports interests)</li>
              <li>Athletic performance metrics</li>
              <li>Optional health data (such as height, weight)</li>
              <li>Training logs and goals</li>
            </ul>
          </div>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Please use the button below to provide or deny your consent.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Review Consent Request
            </a>
          </div>
          
          <p style="color: #777; font-size: 14px; margin-top: 30px; text-align: center;">
            If you have any questions, please contact us at <a href="mailto:support@athlex.info" style="color: #0284c7;">support@athlex.info</a>
          </p>
        </div>
      `
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error sending parental consent email:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
