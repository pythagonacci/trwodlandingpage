import type { JSONContent } from "@tiptap/core";

export type PostStatus = "draft" | "published";
export type BlogImageLayout = "center" | "wide" | "float-left" | "float-right";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category_id: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  editor_content_json: JSONContent;
  editor_content_html: string | null;
  status: PostStatus;
  published_at: string | null;
  author_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_og_image_url: string | null;
  canonical_url: string | null;
  reading_time: number;
  featured: boolean;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PostWithCategory = Post & {
  categories: Pick<Category, "id" | "name" | "slug" | "description"> | null;
};

export type MediaAsset = {
  id: string;
  bucket: string;
  path: string;
  public_url: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
};

export type BlogImageAttrs = {
  src: string;
  alt: string;
  caption?: string;
  layout: BlogImageLayout;
  width?: number;
};

export type Database = {
  public: {
    Tables: {
      admin_allowlist: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<Category, "id" | "created_at">>;
        Relationships: [];
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Post, "id" | "created_at" | "updated_at">>;
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      media_assets: {
        Row: MediaAsset;
        Insert: Omit<MediaAsset, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<MediaAsset, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin_user: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      post_status: PostStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
