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
      companies: {
        Row: {
          created_at: string
          domain: string
          id: string
          name: string
          status: string
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          name: string
          status?: string
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          name?: string
          status?: string
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      compliance_standards: {
        Row: {
          category: string
          checklist_items: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string
          checklist_items?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          checklist_items?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          company_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          created_at: string
          html_body: string
          id: string
          sent_at: string | null
          status: string
          subject: string
          text_body: string | null
          to_email: string
        }
        Insert: {
          created_at?: string
          html_body: string
          id?: string
          sent_at?: string | null
          status?: string
          subject: string
          text_body?: string | null
          to_email: string
        }
        Update: {
          created_at?: string
          html_body?: string
          id?: string
          sent_at?: string | null
          status?: string
          subject?: string
          text_body?: string | null
          to_email?: string
        }
        Relationships: []
      }
      employee_groups: {
        Row: {
          created_at: string
          group_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_groups_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_groups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          component: string
          created_at: string
          id: string
          message: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          component: string
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          component?: string
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      groups: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_applications: {
        Row: {
          collaboration_ideas: string | null
          created_at: string
          email: string
          followers_count: number | null
          id: string
          instagram_handle: string | null
          name: string
          tiktok_handle: string | null
          user_id: string | null
          why_interested: string | null
        }
        Insert: {
          collaboration_ideas?: string | null
          created_at?: string
          email: string
          followers_count?: number | null
          id?: string
          instagram_handle?: string | null
          name: string
          tiktok_handle?: string | null
          user_id?: string | null
          why_interested?: string | null
        }
        Update: {
          collaboration_ideas?: string | null
          created_at?: string
          email?: string
          followers_count?: number | null
          id?: string
          instagram_handle?: string | null
          name?: string
          tiktok_handle?: string | null
          user_id?: string | null
          why_interested?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          active: boolean
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          active?: boolean
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          active?: boolean
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      pending_payments: {
        Row: {
          created_at: string
          email: string
          id: string
          price: number
          reference: string
          status: string
          ticket_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          price: number
          reference: string
          status?: string
          ticket_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          price?: number
          reference?: string
          status?: string
          ticket_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          category: string
          company_id: string | null
          compliance_standards: Json | null
          content_text: string | null
          created_at: string
          created_by: string | null
          description: string | null
          file_name: string | null
          file_size: number | null
          file_url: string | null
          id: string
          iso_clause: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          version: string
        }
        Insert: {
          category: string
          company_id?: string | null
          compliance_standards?: Json | null
          content_text?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          iso_clause?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: string
        }
        Update: {
          category?: string
          company_id?: string | null
          compliance_standards?: Json | null
          content_text?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          iso_clause?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_charts: {
        Row: {
          chart_data: Json | null
          chart_index: number
          chart_type: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          policy_id: string | null
          section_id: string | null
          title: string | null
        }
        Insert: {
          chart_data?: Json | null
          chart_index?: number
          chart_type: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          policy_id?: string | null
          section_id?: string | null
          title?: string | null
        }
        Update: {
          chart_data?: Json | null
          chart_index?: number
          chart_type?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          policy_id?: string | null
          section_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_charts_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_charts_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "policy_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_compliance: {
        Row: {
          acknowledged: boolean
          acknowledged_at: string | null
          created_at: string
          id: string
          policy_id: string | null
          training_completed: boolean
          training_completed_at: string | null
          user_id: string | null
        }
        Insert: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          created_at?: string
          id?: string
          policy_id?: string | null
          training_completed?: boolean
          training_completed_at?: string | null
          user_id?: string | null
        }
        Update: {
          acknowledged?: boolean
          acknowledged_at?: string | null
          created_at?: string
          id?: string
          policy_id?: string | null
          training_completed?: boolean
          training_completed_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_compliance_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_sections: {
        Row: {
          content: string | null
          created_at: string
          id: string
          order_index: number
          parent_section_id: string | null
          policy_id: string | null
          section_number: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          order_index?: number
          parent_section_id?: string | null
          policy_id?: string | null
          section_number?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          order_index?: number
          parent_section_id?: string | null
          policy_id?: string | null
          section_number?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_sections_parent_section_id_fkey"
            columns: ["parent_section_id"]
            isOneToOne: false
            referencedRelation: "policy_sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_sections_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_standard_compliance: {
        Row: {
          checklist_completion: Json | null
          company_id: string
          completed_at: string | null
          completed_by: string | null
          created_at: string
          id: string
          policy_id: string
          standard_id: string
        }
        Insert: {
          checklist_completion?: Json | null
          company_id: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          policy_id: string
          standard_id: string
        }
        Update: {
          checklist_completion?: Json | null
          company_id?: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          id?: string
          policy_id?: string
          standard_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "policy_standard_compliance_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_standard_compliance_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_standard_compliance_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_standard_compliance_standard_id_fkey"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "compliance_standards"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_tables: {
        Row: {
          created_at: string
          headers: string[]
          id: string
          policy_id: string | null
          rows: Json
          section_id: string | null
          table_index: number
          title: string | null
        }
        Insert: {
          created_at?: string
          headers: string[]
          id?: string
          policy_id?: string | null
          rows: Json
          section_id?: string | null
          table_index?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          headers?: string[]
          id?: string
          policy_id?: string | null
          rows?: Json
          section_id?: string | null
          table_index?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_tables_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_tables_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "policy_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_training_modules: {
        Row: {
          auto_generated: boolean
          created_at: string
          id: string
          last_sync: string
          module_id: string
          policy_id: string | null
        }
        Insert: {
          auto_generated?: boolean
          created_at?: string
          id?: string
          last_sync?: string
          module_id: string
          policy_id?: string | null
        }
        Update: {
          auto_generated?: boolean
          created_at?: string
          id?: string
          last_sync?: string
          module_id?: string
          policy_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_training_modules_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string
          department_id: string | null
          email: string
          first_name: string | null
          id: string
          is_company_admin: boolean | null
          last_login: string | null
          last_name: string | null
          manager_id: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          department_id?: string | null
          email: string
          first_name?: string | null
          id: string
          is_company_admin?: boolean | null
          last_login?: string | null
          last_name?: string | null
          manager_id?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          department_id?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_company_admin?: boolean | null
          last_login?: string | null
          last_name?: string | null
          manager_id?: string | null
          phone?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          content: string
          created_at: string
          email: string
          id: string
          is_resolved: boolean
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          email: string
          id?: string
          is_resolved?: boolean
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          email?: string
          id?: string
          is_resolved?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      ticket_notifications: {
        Row: {
          created_at: string
          email: string
          id: string
          notified: boolean
          ticket_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          notified?: boolean
          ticket_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          notified?: boolean
          ticket_type?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          checked_in: boolean
          created_at: string
          email: string
          event_date: string
          id: string
          price: number
          ticket_number: string
          ticket_type: string
          user_id: string | null
        }
        Insert: {
          checked_in?: boolean
          created_at?: string
          email: string
          event_date: string
          id?: string
          price: number
          ticket_number: string
          ticket_type: string
          user_id?: string | null
        }
        Update: {
          checked_in?: boolean
          created_at?: string
          email?: string
          event_date?: string
          id?: string
          price?: number
          ticket_number?: string
          ticket_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      training_completions: {
        Row: {
          company_id: string
          completed_at: string
          id: string
          policy_id: string
          score: number | null
          signed_off: boolean | null
          signed_off_at: string | null
          time_spent_minutes: number | null
          user_id: string
        }
        Insert: {
          company_id: string
          completed_at?: string
          id?: string
          policy_id: string
          score?: number | null
          signed_off?: boolean | null
          signed_off_at?: string | null
          time_spent_minutes?: number | null
          user_id: string
        }
        Update: {
          company_id?: string
          completed_at?: string
          id?: string
          policy_id?: string
          score?: number | null
          signed_off?: boolean | null
          signed_off_at?: string | null
          time_spent_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_completions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_completions_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      website_users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
