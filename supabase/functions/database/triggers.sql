
-- Function to call the edge function for waitlist notifications 
CREATE OR REPLACE FUNCTION public.notify_waitlist_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://dndudgqkoiybenqnavoi.supabase.co/functions/v1/send-notification',
      body := json_build_object(
        'type', 'waitlist',
        'data', row_to_json(NEW)
      )::text
    );
  RETURN NEW;
END;
$$;

-- Create trigger for waitlist registrations
DROP TRIGGER IF EXISTS notify_waitlist_registration_trigger ON public.waitlist_registrations;
CREATE TRIGGER notify_waitlist_registration_trigger
  AFTER INSERT ON public.waitlist_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_waitlist_registration();

-- Function to send parental consent emails
CREATE OR REPLACE FUNCTION public.send_parental_consent_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  child_name text;
BEGIN
  -- Get the child's name
  SELECT 
    first_name || ' ' || last_name INTO child_name
  FROM 
    public.profiles
  WHERE 
    id = NEW.child_user_id;

  -- Call the edge function to send the email
  PERFORM
    net.http_post(
      url := 'https://dndudgqkoiybenqnavoi.supabase.co/functions/v1/send-parental-consent',
      body := json_build_object(
        'token', NEW.verification_token,
        'parentEmail', NEW.parent_email,
        'athleteName', child_name
      )::text,
      content_type := 'application/json'
    );
    
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't prevent registration
    RAISE WARNING 'Error in send_parental_consent_email: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger for parental consent
DROP TRIGGER IF EXISTS send_parental_consent_email_trigger ON public.parental_consent;
CREATE TRIGGER send_parental_consent_email_trigger
  AFTER INSERT ON public.parental_consent
  FOR EACH ROW
  EXECUTE FUNCTION public.send_parental_consent_email();
