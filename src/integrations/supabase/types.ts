export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      hero_banners: {
        Row: {
          active: boolean;
          button_link: string | null;
          button_text: string | null;
          created_at: string;
          id: string;
          image_url: string;
          order_position: number;
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string;
          id?: string;
          image_url: string;
          order_position?: number;
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string;
          order_position?: number;
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      homepage_categories: {
        Row: {
          active: boolean;
          color: string;
          created_at: string;
          icon: string;
          id: string;
          order_position: number;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          color?: string;
          created_at?: string;
          icon?: string;
          id?: string;
          order_position?: number;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          color?: string;
          created_at?: string;
          icon?: string;
          id?: string;
          order_position?: number;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      homepage_collections: {
        Row: {
          active: boolean;
          created_at: string;
          id: string;
          image_url: string;
          order_position: number;
          redirect_url: string | null;
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          id?: string;
          image_url: string;
          order_position?: number;
          redirect_url?: string | null;
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          id?: string;
          image_url?: string;
          order_position?: number;
          redirect_url?: string | null;
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          color: string | null;
          created_at: string;
          id: string;
          order_id: string;
          product_id: string | null;
          product_image: string | null;
          product_name: string;
          product_slug: string;
          quantity: number;
          size: string | null;
          unit_price: number;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_image?: string | null;
          product_name: string;
          product_slug: string;
          quantity: number;
          size?: string | null;
          unit_price: number;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_image?: string | null;
          product_name?: string;
          product_slug?: string;
          quantity?: number;
          size?: string | null;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          id: string;
          notes: string | null;
          order_number: string;
          payment_method: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"];
          shipping_cep: string;
          shipping_city: string;
          shipping_complement: string | null;
          shipping_cost: number;
          shipping_neighborhood: string;
          shipping_number: string;
          shipping_state: string;
          shipping_street: string;
          status: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          tracking_code: string | null;
          updated_at: string;
          user_id: string | null;
          payment_gateway: string | null;
          payment_gateway_id: string | null;
          transaction_id: string | null;
          pix_code: string | null;
          pix_qrcode: string | null;
          paid_at: string | null;
          webhook_payload: Json | null;
        };
        Insert: {
          created_at?: string;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          id?: string;
          notes?: string | null;
          order_number?: string;
          payment_method?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          shipping_cep: string;
          shipping_city: string;
          shipping_complement?: string | null;
          shipping_cost?: number;
          shipping_neighborhood: string;
          shipping_number: string;
          shipping_state: string;
          shipping_street: string;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          tracking_code?: string | null;
          updated_at?: string;
          user_id?: string | null;
          payment_gateway?: string | null;
          payment_gateway_id?: string | null;
          transaction_id?: string | null;
          pix_code?: string | null;
          pix_qrcode?: string | null;
          paid_at?: string | null;
          webhook_payload?: Json | null;
        };
        Update: {
          created_at?: string;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string;
          id?: string;
          notes?: string | null;
          order_number?: string;
          payment_method?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"];
          shipping_cep?: string;
          shipping_city?: string;
          shipping_complement?: string | null;
          shipping_cost?: number;
          shipping_neighborhood?: string;
          shipping_number?: string;
          shipping_state?: string;
          shipping_street?: string;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal?: number;
          total?: number;
          tracking_code?: string | null;
          updated_at?: string;
          user_id?: string | null;
          payment_gateway?: string | null;
          payment_gateway_id?: string | null;
          transaction_id?: string | null;
          pix_code?: string | null;
          pix_qrcode?: string | null;
          paid_at?: string | null;
          webhook_payload?: Json | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          cpf: string | null;
          created_at: string;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          cpf?: string | null;
          created_at?: string;
          id: string;
          name: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          cpf?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          category_id: string | null;
          colors: string[];
          created_at: string;
          description: string | null;
          id: string;
          images: string[];
          is_active: boolean;
          is_featured: boolean;
          is_new: boolean;
          is_on_sale: boolean;
          name: string;
          price: number;
          sale_price: number | null;
          sizes: string[];
          sku: string | null;
          slug: string;
          stock: number;
          updated_at: string;
        };
        Insert: {
          category_id?: string | null;
          colors?: string[];
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[];
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_on_sale?: boolean;
          name: string;
          price: number;
          sale_price?: number | null;
          sizes?: string[];
          sku?: string | null;
          slug: string;
          stock?: number;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          colors?: string[];
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: string[];
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
          is_on_sale?: boolean;
          name?: string;
          price?: number;
          sale_price?: number | null;
          sizes?: string[];
          sku?: string | null;
          slug?: string;
          stock?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      get_executive_financial_metrics: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_order_funnel: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_customer_insights: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      get_product_performance: {
        Args: {
          p_interval?: string;
        };
        Returns: Json;
      };
      get_sales_chart_data: {
        Args: {
          p_interval?: string;
        };
        Returns: Json;
      };
      get_dashboard_alerts: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
    Enums: {
      app_role: "admin" | "user";
      order_status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
      payment_status: "pending" | "paid" | "failed" | "refunded";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const;
