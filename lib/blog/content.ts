import type { RichTextNode } from "@/lib/blog";

export const BLOG_IMAGE_LAYOUTS = ["full", "wrap-left", "wrap-right"] as const;
export const BLOG_IMAGE_ALT_MAX_LENGTH = 160;
export const BLOG_IMAGE_CAPTION_MAX_LENGTH = 280;
export const DEFAULT_BLOG_IMAGE_LAYOUT = "full";

export type BlogImageLayout = (typeof BLOG_IMAGE_LAYOUTS)[number];

export type BlogImageAttrs = {
  src: string;
  alt: string;
  caption: string;
  layout: BlogImageLayout;
};

export function createEmptyRichTextDoc(): RichTextNode {
  return {
    type: "doc",
    content: []
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(value: unknown, allowedProtocols: string[], fallback: string): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallback;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    if (allowedProtocols.includes(parsed.protocol)) {
      return parsed.toString();
    }
  } catch {}

  return fallback;
}

export function sanitizeHref(value: unknown): string {
  return sanitizeUrl(value, ["http:", "https:", "mailto:", "tel:"], "#");
}

export function sanitizeSrc(value: unknown): string {
  return sanitizeUrl(value, ["http:", "https:"], "");
}

export function isSafeHref(value: string): boolean {
  return sanitizeHref(value) === value.trim();
}

export function isSafeImageSrc(value: string): boolean {
  return sanitizeSrc(value) === value.trim();
}

export function normalizeBlogImageLayout(value: unknown): BlogImageLayout {
  return BLOG_IMAGE_LAYOUTS.includes(value as BlogImageLayout)
    ? (value as BlogImageLayout)
    : DEFAULT_BLOG_IMAGE_LAYOUT;
}

function normalizeOptionalText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export function normalizeBlogImageAttrs(attrs: Record<string, unknown> | null | undefined): BlogImageAttrs | null {
  const src = sanitizeSrc(attrs?.src);

  if (!src) {
    return null;
  }

  return {
    src,
    alt: normalizeOptionalText(attrs?.alt, BLOG_IMAGE_ALT_MAX_LENGTH),
    caption: normalizeOptionalText(attrs?.caption, BLOG_IMAGE_CAPTION_MAX_LENGTH),
    layout: normalizeBlogImageLayout(attrs?.layout)
  };
}

export function deriveImageAltFromFileName(fileName: string): string {
  return fileName
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, BLOG_IMAGE_ALT_MAX_LENGTH);
}

export function normalizeRichTextForEditor(node: RichTextNode | Record<string, unknown>): RichTextNode {
  const contentNode = node as RichTextNode;

  if (!contentNode || typeof contentNode !== "object") {
    return createEmptyRichTextDoc();
  }

  if (contentNode.type === "image") {
    const normalized = normalizeBlogImageAttrs(contentNode.attrs);

    if (!normalized) {
      return {
        type: "paragraph",
        content: []
      };
    }

    return {
      type: "blogImage",
      attrs: {
        ...normalized,
        caption:
          typeof contentNode.attrs?.title === "string" && !normalized.caption
            ? contentNode.attrs.title.trim().slice(0, BLOG_IMAGE_CAPTION_MAX_LENGTH)
            : normalized.caption
      }
    };
  }

  return {
    ...contentNode,
    content: contentNode.content?.map((child) => normalizeRichTextForEditor(child))
  };
}
