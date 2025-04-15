
-- Add phone_number column to waitlist_registrations table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'waitlist_registrations'
        AND column_name = 'phone_number'
    ) THEN
        ALTER TABLE public.waitlist_registrations
        ADD COLUMN phone_number TEXT;
    END IF;
END
$$;
