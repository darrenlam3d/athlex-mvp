
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { isSupabaseConfigured } from "@/lib/supabase";

const SupabaseConfigWarning = () => {
  const [showSupabaseWarning, setShowSupabaseWarning] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    if (!isSupabaseConfigured() && showSupabaseWarning && location.pathname !== "/") {
      toast.custom(
        (id) => (
          <div className="bg-red-950 border border-red-700 rounded-lg px-6 py-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white font-medium">
                  Supabase configuration is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.
                </p>
              </div>
              <button 
                onClick={() => {
                  toast.dismiss(id);
                  setShowSupabaseWarning(false);
                }}
                className="text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          id: "supabase-config-error",
        }
      );
    }
  }, [location.pathname, showSupabaseWarning]);

  return null;
};

export default SupabaseConfigWarning;
