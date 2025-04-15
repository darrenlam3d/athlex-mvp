
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Notification function triggered at", new Date().toISOString());
    
    const { type, data } = await req.json();
    console.log(`Notification type: ${type}`);
    console.log(`Notification data:`, JSON.stringify(data, null, 2));
    
    let emailContent;
    let subject;

    if (type === 'waitlist') {
      subject = 'New Waitlist Registration';
      emailContent = `
        <h2>New Waitlist Registration</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone_number || 'Not provided'}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Feedback:</strong> ${data.feedback || 'No feedback provided'}</p>
        <p><strong>GDPR Consent:</strong> ${data.gdpr_consent ? 'Yes' : 'No'}</p>
        <p><em>Submitted at: ${new Date().toISOString()}</em></p>
      `;
      console.log("Processing waitlist registration notification");
    } else if (type === 'edge') {
      subject = 'New ATHLEX Edge Signup';
      emailContent = `
        <h2>New ATHLEX Edge Signup</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Interests:</strong> ${data.interests ? data.interests.join(', ') : 'None'}</p>
        <p><strong>Feedback:</strong> ${data.feedback || 'No feedback provided'}</p>
        <p><em>Submitted at: ${new Date().toISOString()}</em></p>
      `;
      console.log("Processing edge signup notification");
    } else {
      throw new Error(`Unknown notification type: ${type}`);
    }

    try {
      console.log(`Attempting to send email with subject: ${subject}`);
      console.log(`Sending to: nicholas@athlex.info`);
      
      const emailResponse = await resend.emails.send({
        from: 'ATHLEX Notifications <noreply@athlex.info>',
        to: 'nicholas@athlex.info',
        subject: subject,
        html: emailContent,
      });
      
      console.log("Email sent successfully:", JSON.stringify(emailResponse, null, 2));
      return new Response(JSON.stringify(emailResponse), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Still return a 200 to indicate the data was received
      return new Response(JSON.stringify({ 
        status: "notification-received", 
        emailError: emailError.message,
        message: "Signup data was received but email delivery failed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error in notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
