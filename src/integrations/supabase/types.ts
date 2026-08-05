export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          slug: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          slug: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          slug?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      customer_reviews: {
        Row: {
          approved: boolean | null;
          city: string | null;
          comment: string;
          created_at: string | null;
          customer_name: string;
          customer_photo: string | null;
          id: string;
          order_id: string | null;
          product_id: string | null;
          rating: number;
          state: string | null;
        };
        Insert: {
          approved?: boolean | null;
          city?: string | null;
          comment: string;
          created_at?: string | null;
          customer_name: string;
          customer_photo?: string | null;
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          rating: number;
          state?: string | null;
        };
        Update: {
          approved?: boolean | null;
          city?: string | null;
          comment?: string;
          created_at?: string | null;
          customer_name?: string;
          customer_photo?: string | null;
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          rating?: number;
          state?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "customer_reviews_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "customer_reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      hero_banners: {
        Row: {
          active: boolean | null;
          button_link: string | null;
          button_text: string | null;
          created_at: string | null;
          id: string;
          image_url: string;
          order_position: number;
          subtitle: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          active?: boolean | null;
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string | null;
          id?: string;
          image_url: string;
          order_position?: number;
          subtitle?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          active?: boolean | null;
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string | null;
          id?: string;
          image_url?: string;
          order_position?: number;
          subtitle?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      homepage_categories: {
        Row: {
          active: boolean | null;
          color: string;
          created_at: string | null;
          icon: string;
          id: string;
          order_position: number;
          slug: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          active?: boolean | null;
          color?: string;
          created_at?: string | null;
          icon?: string;
          id?: string;
          order_position?: number;
          slug: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          active?: boolean | null;
          color?: string;
          created_at?: string | null;
          icon?: string;
          id?: string;
          order_position?: number;
          slug?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      homepage_collections: {
        Row: {
          active: boolean | null;
          created_at: string | null;
          id: string;
          image_url: string;
          order_position: number;
          redirect_url: string | null;
          subtitle: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string | null;
          id?: string;
          image_url: string;
          order_position?: number;
          redirect_url?: string | null;
          subtitle?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          active?: boolean | null;
          created_at?: string | null;
          id?: string;
          image_url?: string;
          order_position?: number;
          redirect_url?: string | null;
          subtitle?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          color: string | null;
          created_at: string | null;
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
          created_at?: string | null;
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
          created_at?: string | null;
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
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string | null;
          customer_cpf: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          external_reference: string | null;
          id: string;
          notes: string | null;
          order_number: string;
          paid_at: string | null;
          payment_gateway: string | null;
          payment_gateway_id: string | null;
          payment_method: string | null;
          payment_status: Database["public"]["Enums"]["payment_status"] | null;
          pix_code: string | null;
          pix_qrcode: string | null;
          shipping_cep: string;
          shipping_city: string;
          shipping_complement: string | null;
          shipping_cost: number | null;
          shipping_neighborhood: string;
          shipping_number: string;
          shipping_state: string;
          shipping_street: string;
          status: Database["public"]["Enums"]["order_status"] | null;
          subtotal: number;
          total: number;
          tracking_code: string | null;
          transaction_id: string | null;
          updated_at: string | null;
          user_id: string | null;
          webhook_payload: Json | null;
        };
        Insert: {
          created_at?: string | null;
          customer_cpf?: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string;
          external_reference?: string | null;
          id?: string;
          notes?: string | null;
          order_number?: string;
          paid_at?: string | null;
          payment_gateway?: string | null;
          payment_gateway_id?: string | null;
          payment_method?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"] | null;
          pix_code?: string | null;
          pix_qrcode?: string | null;
          shipping_cep: string;
          shipping_city: string;
          shipping_complement?: string | null;
          shipping_cost?: number | null;
          shipping_neighborhood: string;
          shipping_number: string;
          shipping_state: string;
          shipping_street: string;
          status?: Database["public"]["Enums"]["order_status"] | null;
          subtotal: number;
          total: number;
          tracking_code?: string | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          webhook_payload?: Json | null;
        };
        Update: {
          created_at?: string | null;
          customer_cpf?: string | null;
          customer_email?: string;
          customer_name?: string;
          customer_phone?: string;
          external_reference?: string | null;
          id?: string;
          notes?: string | null;
          order_number?: string;
          paid_at?: string | null;
          payment_gateway?: string | null;
          payment_gateway_id?: string | null;
          payment_method?: string | null;
          payment_status?: Database["public"]["Enums"]["payment_status"] | null;
          pix_code?: string | null;
          pix_qrcode?: string | null;
          shipping_cep?: string;
          shipping_city?: string;
          shipping_complement?: string | null;
          shipping_cost?: number | null;
          shipping_neighborhood?: string;
          shipping_number?: string;
          shipping_state?: string;
          shipping_street?: string;
          status?: Database["public"]["Enums"]["order_status"] | null;
          subtotal?: number;
          total?: number;
          tracking_code?: string | null;
          transaction_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          webhook_payload?: Json | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category_id: string | null;
          colors: string[] | null;
          created_at: string | null;
          description: string | null;
          id: string;
          images: string[] | null;
          is_active: boolean | null;
          is_featured: boolean | null;
          is_new: boolean | null;
          is_on_sale: boolean | null;
          name: string;
          price: number;
          sale_price: number | null;
          sizes: string[] | null;
          sku: string | null;
          slug: string;
          stock: number | null;
          updated_at: string | null;
        };
        Insert: {
          category_id?: string | null;
          colors?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          images?: string[] | null;
          is_active?: boolean | null;
          is_featured?: boolean | null;
          is_new?: boolean | null;
          is_on_sale?: boolean | null;
          name: string;
          price: number;
          sale_price?: number | null;
          sizes?: string[] | null;
          sku?: string | null;
          slug: string;
          stock?: number | null;
          updated_at?: string | null;
        };
        Update: {
          category_id?: string | null;
          colors?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          images?: string[] | null;
          is_active?: boolean | null;
          is_featured?: boolean | null;
          is_new?: boolean | null;
          is_on_sale?: boolean | null;
          name?: string;
          price?: number;
          sale_price?: number | null;
          sizes?: string[] | null;
          sku?: string | null;
          slug?: string;
          stock?: number | null;
          updated_at?: string | null;
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
      profiles: {
        Row: {
          cpf: string | null;
          created_at: string | null;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          cpf?: string | null;
          created_at?: string | null;
          id: string;
          name?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          cpf?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string | null;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string | null;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string | null;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string | null;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string | null;
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
      create_order_transaction: {
        Args: { p_items_data: Json; p_order_data: Json; p_user_id: string };
        Returns: Json;
      };
      get_customer_insights: { Args: never; Returns: Json };
      get_dashboard_alerts: { Args: never; Returns: Json };
      get_executive_financial_metrics: { Args: never; Returns: Json };
      get_order_funnel: { Args: never; Returns: Json };
      get_product_performance: { Args: { p_interval?: string }; Returns: Json };
      get_sales_chart_data: { Args: { p_interval?: string }; Returns: Json };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "user"],
      order_status: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const;
