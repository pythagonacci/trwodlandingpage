import { z } from "zod";
import type { JSONContent } from "@tiptap/core";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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

export const postPayloadSchema = z.object({
  title: z.string().trim().min(3, "Add a title before saving.").max(180),
  slug: z.string().trim().min(1, "Add a slug.").regex(SLUG_PATTERN, "Use lowercase letters, numbers, and hyphens only."),
  excerpt: z.string().trim().max(420).optional().nullable(),
  categoryId: z.string().uuid("Choose a category."),
  coverImageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  coverImageAlt: z.string().trim().max(220).optional().nullable(),
  content: z.custom<JSONContent>((value) => Boolean(value && typeof value === "object")),
  authorName: z.string().trim().max(120).optional().nullable(),
  seoTitle: z.string().trim().max(70).optional().nullable(),
  seoDescription: z.string().trim().max(180).optional().nullable(),
  seoOgImageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  canonicalUrl: z.string().url().optional().or(z.literal("")).nullable(),
  featured: z.boolean().optional()
});

export type PostPayload = z.infer<typeof postPayloadSchema>;

export function cleanOptionalString(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function extractTextFromContent(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  const record = node as { text?: unknown; content?: unknown };
  const ownText = typeof record.text === "string" ? record.text : "";
  const children = Array.isArray(record.content)
    ? record.content.map(extractTextFromContent).join(" ")
    : "";

  return `${ownText} ${children}`.trim();
}

export function estimateReadingTime(content: JSONContent, excerpt?: string | null): number {
  const text = `${excerpt ?? ""} ${extractTextFromContent(content)}`.replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date: string | null | undefined): string {
  if (!date) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}
