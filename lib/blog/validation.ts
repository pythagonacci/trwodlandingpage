import { z } from "zod";
import type { PostFormData, RichTextMark, RichTextNode } from "@/lib/blog";
import {
  BLOG_IMAGE_ALT_MAX_LENGTH,
  BLOG_IMAGE_CAPTION_MAX_LENGTH,
  BLOG_IMAGE_LAYOUTS,
  isSafeHref,
  isSafeImageSrc
} from "@/lib/blog/content";

const richTextMarkSchema: z.ZodType<RichTextMark> = z
  .object({
    type: z.string().max(40).optional(),
    attrs: z.record(z.string(), z.unknown()).optional()
  })
  .superRefine((mark, ctx) => {
    if (mark.type === "link") {
      const href = mark.attrs?.href;

      if (typeof href !== "string" || !isSafeHref(href)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Link marks must use a safe URL."
        });
      }
    }
  });

const richTextNodeSchema: z.ZodType<RichTextNode> = z.lazy(() =>
  z
    .object({
      type: z.string().max(40).optional(),
      text: z.string().max(50000).optional(),
      attrs: z.record(z.string(), z.unknown()).optional(),
      marks: z.array(richTextMarkSchema).max(32).optional(),
      content: z.array(richTextNodeSchema).max(1000).optional()
    })
    .superRefine((node, ctx) => {
      if (node.type === "text" && typeof node.text !== "string") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Text nodes must include text content."
        });
      }

      if (node.type === "heading") {
        const level = Number(node.attrs?.level);

        if (!Number.isInteger(level) || level < 1 || level > 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Heading nodes must use levels 1 through 3."
          });
        }
      }

      if (node.type === "orderedList" && node.attrs?.start !== undefined) {
        const start = Number(node.attrs.start);

        if (!Number.isInteger(start) || start < 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ordered list start values must be positive integers."
          });
        }
      }

      if (node.type === "image" || node.type === "blogImage") {
        const src = node.attrs?.src;
        const alt = node.attrs?.alt;
        const caption = node.attrs?.caption;
        const layout = node.attrs?.layout;

        if (typeof src !== "string" || !isSafeImageSrc(src)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Image nodes must use a safe source URL."
          });
        }

        if (alt !== undefined && (typeof alt !== "string" || alt.trim().length > BLOG_IMAGE_ALT_MAX_LENGTH)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Image alt text must be ${BLOG_IMAGE_ALT_MAX_LENGTH} characters or fewer.`
          });
        }

        if (
          caption !== undefined &&
          (typeof caption !== "string" || caption.trim().length > BLOG_IMAGE_CAPTION_MAX_LENGTH)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Image captions must be ${BLOG_IMAGE_CAPTION_MAX_LENGTH} characters or fewer.`
          });
        }

        if (
          node.type === "blogImage" &&
          layout !== undefined &&
          !BLOG_IMAGE_LAYOUTS.includes(layout as (typeof BLOG_IMAGE_LAYOUTS)[number])
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Blog image layout must be full, wrap-left, or wrap-right."
          });
        }
      }
    })
);

export const blogImageLayoutSchema = z.enum(BLOG_IMAGE_LAYOUTS);

export const postContentSchema = richTextNodeSchema
  .refine((content) => content.type === "doc", {
    message: "Post content must be a ProseMirror document."
  });

export const postFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(160, "Title must be 160 characters or fewer."),
  excerpt: z
    .string()
    .trim()
    .max(320, "Excerpt must be 320 characters or fewer.")
    .catch("")
    .transform((value) => value.trim()),
  slug: z
    .string()
    .trim()
    .max(160, "Slug must be 160 characters or fewer.")
    .catch("")
    .transform((value) => value.trim()),
  coverImageUrl: z
    .string()
    .trim()
    .max(2048, "Cover image URL is too long.")
    .catch("")
    .refine((value) => !value || isSafeImageSrc(value), {
      message: "Cover image URL must be a safe image URL."
    }),
  content: postContentSchema,
  isPublished: z.boolean()
});

export function validatePostFormData(data: PostFormData) {
  return postFormSchema.safeParse(data);
}
