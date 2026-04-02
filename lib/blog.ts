export type RichTextMark = {
  type?: string;
  attrs?: Record<string, unknown>;
};

export type RichTextNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: RichTextMark[];
  content?: RichTextNode[];
};

export type PostRecord = {
  id: string;
  title: string;
  slug: string;
  content: RichTextNode | Record<string, unknown>;
  cover_image_url: string | null;
  excerpt: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostFormData = {
  title: string;
  excerpt: string;
  slug: string;
  content: RichTextNode | Record<string, unknown>;
  coverImageUrl: string;
  isPublished: boolean;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatPostDate(date: string | null | undefined): string {
  if (!date) {
    return "Unpublished";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}
