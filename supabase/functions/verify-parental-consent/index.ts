
// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.5.0"
import { Resend } from "npm:resend@2.0.0";

// Initialize environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const resendApiKey = Deno.env.get("RESEND_API_KEY") || '';

// Initialize Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Verification token is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { data: consent, error: consentError } = await supabase
      .from('parental_consent')
      .select('*')
      .eq('verification_token', token)
      .single()

    if (consentError || !consent) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification token' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update consent status
    const { error: updateError } = await supabase
      .from('parental_consent')
      .update({ 
        consent_status: 'approved',
        consent_date: new Date().toISOString()
      })
      .eq('id', consent.id)

    if (updateError) {
      throw updateError
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'ATHLEX <noreply@athlex.info>',
      to: [consent.parent_email],
      subject: 'Parental Consent Confirmed - ATHLEX',
      html: `
        <h1>Parental Consent Confirmed</h1>
        <p>Your parental consent has been successfully recorded for your child's ATHLEX account.</p>
        <p>Thank you for helping us maintain a safe environment for young athletes.</p>
      `
    });

    return new Response(
      JSON.stringify({ success: true }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error processing consent:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
