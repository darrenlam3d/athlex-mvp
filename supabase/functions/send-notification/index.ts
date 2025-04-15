
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Notification function triggered");
    
    const { type, data } = await req.json();
    console.log(`Notification type: ${type}`);
    console.log(`Notification data:`, data);
    
    let emailContent;
    let subject;

    if (type === 'waitlist') {
      subject = 'New Waitlist Signup';
      emailContent = `
        <h2>New Waitlist Registration</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Feedback:</strong> ${data.feedback || 'No feedback provided'}</p>
        <p><em>Submitted at: ${data.created_at}</em></p>
      `;
      console.log("Processing waitlist registration notification");
    } else if (type === 'edge') {
      subject = 'New ATHLEX Edge Signup';
      emailContent = `
        <h2>New ATHLEX Edge Signup</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Interests:</strong> ${data.interests.join(', ')}</p>
        <p><strong>Feedback:</strong> ${data.feedback || 'No feedback provided'}</p>
        <p><em>Submitted at: ${data.created_at}</em></p>
      `;
      console.log("Processing edge signup notification");
    } else {
      throw new Error(`Unknown notification type: ${type}`);
    }

    console.log(`Sending email with subject: ${subject}`);
    const emailResponse = await resend.emails.send({
      from: 'noreply@athlex.info',
      to: 'nicholas@athlex.info',
      subject: subject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
