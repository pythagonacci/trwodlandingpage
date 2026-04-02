import type { JSONContent } from "@tiptap/core";
import type { BlogImageLayout } from "@/lib/blog/content";
import {
  DEFAULT_BLOG_IMAGE_LAYOUT,
  deriveImageAltFromFileName,
  normalizeBlogImageLayout,
  sanitizeSrc
} from "@/lib/blog/content";

type UploadResponsePayload = {
  url?: string;
  error?: string;
};

export function createBlogImageNode(attrs: {
  src: string;
  alt?: string;
  caption?: string;
  layout?: BlogImageLayout;
}): JSONContent {
  return {
    type: "blogImage",
    attrs: {
      src: sanitizeSrc(attrs.src),
      alt: attrs.alt?.trim() ?? "",
      caption: attrs.caption?.trim() ?? "",
      layout: normalizeBlogImageLayout(attrs.layout ?? DEFAULT_BLOG_IMAGE_LAYOUT)
    }
  };
}

export async function parseUploadResponse(response: Response): Promise<{ url: string }> {
  let payload: UploadResponsePayload = {};

  try {
    payload = (await response.json()) as UploadResponsePayload;
  } catch {}

  const safeUrl = sanitizeSrc(payload.url);

  if (!response.ok || !safeUrl) {
    throw new Error(payload.error ?? "Upload failed.");
  }

  return {
    url: safeUrl
  };
}

export async function uploadBlogImage(
  file: File,
  options?: {
    endpoint?: string;
    folder?: "cover" | "inline";
  }
): Promise<{ url: string; suggestedAlt: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", options?.folder ?? "inline");

  const response = await fetch(options?.endpoint ?? "/api/upload", {
    method: "POST",
    body: formData
  });

  const payload = await parseUploadResponse(response);

  return {
    url: payload.url,
    suggestedAlt: deriveImageAltFromFileName(file.name)
  };
}
