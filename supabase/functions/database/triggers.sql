
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
