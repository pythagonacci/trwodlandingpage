import type { JSONContent } from "@tiptap/core";
import type { BlogImageAttrs, BlogImageLayout } from "@/lib/cms/types";

const IMAGE_LAYOUTS = new Set<BlogImageLayout>(["center", "wide", "float-left", "float-right"]);
const MIN_IMAGE_WIDTH = 180;
const MAX_IMAGE_WIDTH = 1180;

export function createEmptyDoc(): JSONContent {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph"
      }
    ]
  };
}

export function normalizeImageLayout(value: unknown): BlogImageLayout {
  return typeof value === "string" && IMAGE_LAYOUTS.has(value as BlogImageLayout)
    ? (value as BlogImageLayout)
    : "center";
}

export function normalizeImageWidth(value: unknown): number | undefined {
  const width = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(width)) {
    return undefined;
  }

  return Math.min(MAX_IMAGE_WIDTH, Math.max(MIN_IMAGE_WIDTH, Math.round(width)));
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && Object.prototype.toString.call(value) === "[object Object]";
}

function readStringAttr(attrs: Record<string, unknown>, key: string): string {
  try {
    const value = attrs[key];
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

function readUnknownAttr(attrs: Record<string, unknown>, key: string): unknown {
  try {
    return attrs[key];
  } catch {
    return undefined;
  }
}

export function normalizeBlogImageAttrs(attrs: Record<string, unknown>): BlogImageAttrs | null {
  if (!isPlainRecord(attrs)) {
    return null;
  }

  const src = readStringAttr(attrs, "src");

  if (!src) {
    return null;
  }

  return {
    src,
    alt: readStringAttr(attrs, "alt"),
    caption: readStringAttr(attrs, "caption"),
    layout: normalizeImageLayout(readUnknownAttr(attrs, "layout")),
    width: normalizeImageWidth(readUnknownAttr(attrs, "width"))
  };
}

export function createBlogImageNode(attrs: Partial<BlogImageAttrs> & Pick<BlogImageAttrs, "src">): JSONContent {
  return {
    type: "blogImage",
    attrs: {
      src: attrs.src,
      alt: attrs.alt ?? "",
      caption: attrs.caption ?? "",
      layout: normalizeImageLayout(attrs.layout),
      width: normalizeImageWidth(attrs.width)
    }
  };
}

export function sanitizeEditorContent(value: JSONContent): JSONContent {
  const node = toPlainEditorContent(value);

  if (!node || typeof node !== "object") {
    return { type: "paragraph" };
  }

  if (node.type !== "doc" && node.type !== "paragraph" && typeof node.type !== "string") {
    return { type: "paragraph" };
  }

  if (node.type === "blogImage") {
    const attrs = normalizeBlogImageAttrs((node.attrs ?? {}) as Record<string, unknown>);
    return attrs ? createBlogImageNode(attrs) : { type: "paragraph" };
  }

  if (!node.content?.length) {
    return node;
  }

  return {
    ...node,
    content: node.content.map(sanitizeEditorContent)
  };
}

export function toPlainEditorContent(value: unknown): JSONContent {
  return JSON.parse(JSON.stringify(value)) as JSONContent;
}

export function normalizeEditorContent(value: unknown): JSONContent {
  if (!value || typeof value !== "object") {
    return createEmptyDoc();
  }

  const node = value as JSONContent;
  if (node.type !== "doc") {
    return createEmptyDoc();
  }

  return node.content?.length ? node : createEmptyDoc();
}
