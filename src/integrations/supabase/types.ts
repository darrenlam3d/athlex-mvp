export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assigned_training: {
        Row: {
          athlete_id: string
          coach_id: string
          completion_status:
            | Database["public"]["Enums"]["completion_status"]
            | null
          created_at: string | null
          description: string | null
          id: string
          scheduled_date: string
          title: string
          training_plan_id: string | null
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          coach_id: string
          completion_status?:
            | Database["public"]["Enums"]["completion_status"]
            | null
          created_at?: string | null
          description?: string | null
          id?: string
          scheduled_date: string
          title: string
          training_plan_id?: string | null
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          coach_id?: string
          completion_status?:
            | Database["public"]["Enums"]["completion_status"]
            | null
          created_at?: string | null
          description?: string | null
          id?: string
          scheduled_date?: string
          title?: string
          training_plan_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assigned_training_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assigned_training_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assigned_training_training_plan_id_fkey"
            columns: ["training_plan_id"]
            isOneToOne: false
            referencedRelation: "training_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_profiles: {
        Row: {
          athlete_id: string
          birth_date: string | null
          country: string | null
          created_at: string
          experience_years: number | null
          height_cm: number | null
          primary_sport: string
          school_name: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          athlete_id: string
          birth_date?: string | null
          country?: string | null
          created_at?: string
          experience_years?: number | null
          height_cm?: number | null
          primary_sport: string
          school_name?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          athlete_id?: string
          birth_date?: string | null
          country?: string | null
          created_at?: string
          experience_years?: number | null
          height_cm?: number | null
          primary_sport?: string
          school_name?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_stats: {
        Row: {
          age: number | null
          athlete_id: string
          created_at: string | null
          deleted_at: string | null
          experience_years: number | null
          height: number | null
          id: string
          position: string | null
          sport: string
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          athlete_id: string
          created_at?: string | null
          deleted_at?: string | null
          experience_years?: number | null
          height?: number | null
          id?: string
          position?: string | null
          sport: string
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          athlete_id?: string
          created_at?: string | null
          deleted_at?: string | null
          experience_years?: number | null
          height?: number | null
          id?: string
          position?: string | null
          sport?: string
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_stats_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          age_verified: boolean | null
          birth_date: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          sport: string
          updated_at: string | null
        }
        Insert: {
          age_verified?: boolean | null
          birth_date?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          sport: string
          updated_at?: string | null
        }
        Update: {
          age_verified?: boolean | null
          birth_date?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          sport?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      coach_athletes: {
        Row: {
          athlete_id: string
          coach_id: string
          created_at: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          coach_id: string
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          coach_id?: string
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coach_athletes_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coach_athletes_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_profiles: {
        Row: {
          age_groups: string[]
          coaching_level: Database["public"]["Enums"]["coaching_level"]
          country: string
          created_at: string
          id: string
          sport: string
          team_name: string | null
          updated_at: string
        }
        Insert: {
          age_groups?: string[]
          coaching_level?: Database["public"]["Enums"]["coaching_level"]
          country: string
          created_at?: string
          id: string
          sport: string
          team_name?: string | null
          updated_at?: string
        }
        Update: {
          age_groups?: string[]
          coaching_level?: Database["public"]["Enums"]["coaching_level"]
          country?: string
          created_at?: string
          id?: string
          sport?: string
          team_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      coaches: {
        Row: {
          coach_role: Database["public"]["Enums"]["coach_role"] | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          organization: string | null
          updated_at: string | null
        }
        Insert: {
          coach_role?: Database["public"]["Enums"]["coach_role"] | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          organization?: string | null
          updated_at?: string | null
        }
        Update: {
          coach_role?: Database["public"]["Enums"]["coach_role"] | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          organization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          athlete_id: string
          created_at: string | null
          current_value: number | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: string
          start_date: string
          status: Database["public"]["Enums"]["goal_status"] | null
          target_value: number | null
          title: string
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          created_at?: string | null
          current_value?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_value?: number | null
          title: string
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          created_at?: string | null
          current_value?: number | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["goal_status"] | null
          target_value?: number | null
          title?: string
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthkit_activity_energy: {
        Row: {
          created_at: string
          energy_burned: number
          id: string
          source: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          energy_burned: number
          id?: string
          source: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          energy_burned?: number
          id?: string
          source?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthkit_activity_energy_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthkit_heart_rate: {
        Row: {
          bpm: number
          created_at: string
          id: string
          source: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bpm: number
          created_at?: string
          id?: string
          source: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bpm?: number
          created_at?: string
          id?: string
          source?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthkit_heart_rate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthkit_sleep_analysis: {
        Row: {
          created_at: string
          duration: number
          id: string
          quality: string | null
          source: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration: number
          id?: string
          quality?: string | null
          source: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration?: number
          id?: string
          quality?: string | null
          source?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthkit_sleep_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthkit_steps: {
        Row: {
          created_at: string
          id: string
          source: string
          steps_count: number
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          source: string
          steps_count: number
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          source?: string
          steps_count?: number
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthkit_steps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthkit_vo2max: {
        Row: {
          created_at: string
          id: string
          source: string
          timestamp: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          source: string
          timestamp?: string
          updated_at?: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          source?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "healthkit_vo2max_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_logs: {
        Row: {
          athlete_id: string
          calories: number | null
          carbs: number | null
          coach_id: string | null
          consumed_at: string
          created_at: string | null
          description: string
          fat: number | null
          id: string
          meal_type: Database["public"]["Enums"]["meal_type"] | null
          protein: number | null
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          calories?: number | null
          carbs?: number | null
          coach_id?: string | null
          consumed_at?: string
          created_at?: string | null
          description: string
          fat?: number | null
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"] | null
          protein?: number | null
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          calories?: number | null
          carbs?: number | null
          coach_id?: string | null
          consumed_at?: string
          created_at?: string | null
          description?: string
          fat?: number | null
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type"] | null
          protein?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_logs_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrition_logs_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parental_consent: {
        Row: {
          child_user_id: string
          consent_date: string | null
          consent_status: Database["public"]["Enums"]["consent_status"]
          created_at: string
          id: string
          parent_email: string
          updated_at: string
          verification_token: string
        }
        Insert: {
          child_user_id: string
          consent_date?: string | null
          consent_status?: Database["public"]["Enums"]["consent_status"]
          created_at?: string
          id?: string
          parent_email: string
          updated_at?: string
          verification_token: string
        }
        Update: {
          child_user_id?: string
          consent_date?: string | null
          consent_status?: Database["public"]["Enums"]["consent_status"]
          created_at?: string
          id?: string
          parent_email?: string
          updated_at?: string
          verification_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "parental_consent_child_user_id_fkey"
            columns: ["child_user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parental_consents: {
        Row: {
          athlete_id: string
          consent_granted_at: string | null
          consent_status: boolean | null
          created_at: string | null
          id: string
          parent_email: string
          updated_at: string | null
          verification_token: string
        }
        Insert: {
          athlete_id: string
          consent_granted_at?: string | null
          consent_status?: boolean | null
          created_at?: string | null
          id?: string
          parent_email: string
          updated_at?: string | null
          verification_token: string
        }
        Update: {
          athlete_id?: string
          consent_granted_at?: string | null
          consent_status?: boolean | null
          created_at?: string | null
          id?: string
          parent_email?: string
          updated_at?: string | null
          verification_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "parental_consents_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          athlete_id: string
          created_at: string | null
          deleted_at: string | null
          id: string
          metric_type: string
          notes: string | null
          recorded_at: string
          unit: string
          updated_at: string | null
          value: number
        }
        Insert: {
          athlete_id: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          metric_type: string
          notes?: string | null
          recorded_at?: string
          unit: string
          updated_at?: string | null
          value: number
        }
        Update: {
          athlete_id?: string
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          metric_type?: string
          notes?: string | null
          recorded_at?: string
          unit?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age_verified: boolean | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          age_verified?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          age_verified?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      scout_notes: {
        Row: {
          athlete_id: string
          content: string
          created_at: string | null
          id: string
          scout_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          content: string
          created_at?: string | null
          id?: string
          scout_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          content?: string
          created_at?: string | null
          id?: string
          scout_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scout_notes_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scout_notes_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scout_profiles: {
        Row: {
          country: string
          created_at: string
          id: string
          organization: string | null
          preferred_positions: string[]
          scouting_level: Database["public"]["Enums"]["scouting_level"]
          scouting_region: string
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          id: string
          organization?: string | null
          preferred_positions?: string[]
          scouting_level?: Database["public"]["Enums"]["scouting_level"]
          scouting_region: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          organization?: string | null
          preferred_positions?: string[]
          scouting_level?: Database["public"]["Enums"]["scouting_level"]
          scouting_region?: string
          updated_at?: string
        }
        Relationships: []
      }
      scout_shortlist: {
        Row: {
          athlete_id: string
          created_at: string | null
          id: string
          notes: string | null
          rating: number | null
          scout_id: string
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          scout_id: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          scout_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scout_shortlist_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scout_shortlist_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scouting_reports: {
        Row: {
          athlete_id: string
          content: string
          created_at: string | null
          id: string
          scout_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          content: string
          created_at?: string | null
          id?: string
          scout_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          content?: string
          created_at?: string | null
          id?: string
          scout_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scouting_reports_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scouting_reports_scout_id_fkey"
            columns: ["scout_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plans: {
        Row: {
          coach_id: string
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          coach_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          coach_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_plans_coach_id_fkey"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_sessions: {
        Row: {
          athlete_id: string
          created_at: string | null
          date: string
          deleted_at: string | null
          description: string | null
          duration: number
          id: string
          intensity: Database["public"]["Enums"]["intensity_level"] | null
          notes: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          athlete_id: string
          created_at?: string | null
          date: string
          deleted_at?: string | null
          description?: string | null
          duration: number
          id?: string
          intensity?: Database["public"]["Enums"]["intensity_level"] | null
          notes?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          athlete_id?: string
          created_at?: string | null
          date?: string
          deleted_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          intensity?: Database["public"]["Enums"]["intensity_level"] | null
          notes?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_consent_history: {
        Row: {
          consent_date: string
          consent_given: boolean
          consent_type: string
          created_at: string
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          consent_date?: string
          consent_given: boolean
          consent_type: string
          created_at?: string
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          consent_date?: string
          consent_given?: boolean
          consent_type?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_consent_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_registrations: {
        Row: {
          created_at: string
          email: string
          feedback: string | null
          gdpr_consent: boolean
          id: string
          interests: string[] | null
          name: string | null
          phone_number: string | null
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          feedback?: string | null
          gdpr_consent?: boolean
          id?: string
          interests?: string[] | null
          name?: string | null
          phone_number?: string | null
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          feedback?: string | null
          gdpr_consent?: boolean
          id?: string
          interests?: string[] | null
          name?: string | null
          phone_number?: string | null
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      coach_role: "head_coach" | "assistant_coach" | "trainer"
      coaching_level: "beginner" | "club" | "academy" | "pro"
      completion_status: "not_started" | "in_progress" | "completed" | "missed"
      consent_status: "pending" | "approved" | "rejected"
      goal_status: "not_started" | "in_progress" | "completed" | "failed"
      intensity_level: "low" | "medium" | "high"
      meal_type: "breakfast" | "lunch" | "dinner" | "snack"
      scouting_level: "youth" | "semi_pro" | "pro" | "national"
      user_role: "athlete" | "scout" | "coach"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      coach_role: ["head_coach", "assistant_coach", "trainer"],
      coaching_level: ["beginner", "club", "academy", "pro"],
      completion_status: ["not_started", "in_progress", "completed", "missed"],
      consent_status: ["pending", "approved", "rejected"],
      goal_status: ["not_started", "in_progress", "completed", "failed"],
      intensity_level: ["low", "medium", "high"],
      meal_type: ["breakfast", "lunch", "dinner", "snack"],
      scouting_level: ["youth", "semi_pro", "pro", "national"],
      user_role: ["athlete", "scout", "coach"],
    },
  },
} as const
