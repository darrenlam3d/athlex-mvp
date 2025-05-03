
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, approved } = await req.json();
    
    if (!token) {
      throw new Error("Missing verification token");
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find the consent record with this token
    const { data, error: findError } = await supabase
      .from('parental_consent')
      .select('child_user_id, consent_status')
      .eq('verification_token', token)
      .single();

    if (findError || !data) {
      throw new Error("Invalid or expired verification token");
    }

    // If already processed, just return the status
    if (data.consent_status !== 'pending') {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "This consent request has already been processed", 
        status: data.consent_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    }

    // Update the consent record
    const { error: updateError } = await supabase
      .from('parental_consent')
      .update({
        consent_status: approved ? 'approved' : 'rejected',
        consent_date: new Date().toISOString()
      })
      .eq('verification_token', token);
      
    if (updateError) throw updateError;
    
    // If approved, update the user's age_verified status
    if (approved) {
      await supabase
        .from('profiles')
        .update({ age_verified: true })
        .eq('id', data.child_user_id);
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: approved ? "Parental consent provided successfully" : "Parental consent denied" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error verifying parental consent:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
