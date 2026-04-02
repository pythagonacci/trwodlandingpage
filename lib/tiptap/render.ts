import type { RichTextMark, RichTextNode } from "@/lib/blog";
import {
  escapeHtml,
  normalizeBlogImageAttrs,
  sanitizeHref,
  sanitizeSrc
} from "@/lib/blog/content";

function applyMarks(text: string, marks: RichTextMark[] = []): string {
  return marks.reduce((current, mark) => {
    switch (mark.type) {
      case "bold":
        return `<strong>${current}</strong>`;
      case "italic":
        return `<em>${current}</em>`;
      case "underline":
        return `<u>${current}</u>`;
      case "strike":
        return `<s>${current}</s>`;
      case "code":
        return `<code>${current}</code>`;
      case "link": {
        const href = sanitizeHref(mark.attrs?.href);
        const target = mark.attrs?.target === "_blank" ? ' target="_blank" rel="noreferrer"' : "";

        return `<a href="${escapeHtml(href)}"${target}>${current}</a>`;
      }
      default:
        return current;
    }
  }, escapeHtml(text));
}

function renderChildren(content: RichTextNode[] = []): string {
  return content.map((node) => renderNode(node)).join("");
}

function renderImageFigure(node: RichTextNode): string {
  const normalized = normalizeBlogImageAttrs(node.attrs);

  if (!normalized) {
    return "";
  }

  const caption = normalized.caption
    ? `<figcaption>${escapeHtml(normalized.caption)}</figcaption>`
    : "";

  return `<figure data-layout="${escapeHtml(normalized.layout)}"><img src="${escapeHtml(normalized.src)}" alt="${escapeHtml(normalized.alt)}" />${caption}</figure>`;
}

function renderLegacyImage(node: RichTextNode): string {
  const src = sanitizeSrc(node.attrs?.src);
  const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt.trim() : "";
  const title = typeof node.attrs?.title === "string" ? node.attrs.title.trim() : "";
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";

  if (!src) {
    return "";
  }

  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"${titleAttr} />`;
}

function renderNode(node: RichTextNode | null | undefined): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  switch (node.type) {
    case "doc":
      return renderChildren(node.content);
    case "paragraph":
      return `<p>${renderChildren(node.content)}</p>`;
    case "text":
      return applyMarks(node.text ?? "", node.marks);
    case "heading": {
      const level = Number(node.attrs?.level);
      const tag = level >= 1 && level <= 3 ? `h${level}` : "h2";

      return `<${tag}>${renderChildren(node.content)}</${tag}>`;
    }
    case "bulletList":
      return `<ul>${renderChildren(node.content)}</ul>`;
    case "orderedList": {
      const start = Number(node.attrs?.start);
      const startAttr = Number.isFinite(start) && start > 1 ? ` start="${start}"` : "";

      return `<ol${startAttr}>${renderChildren(node.content)}</ol>`;
    }
    case "listItem":
      return `<li>${renderChildren(node.content)}</li>`;
    case "blockquote":
      return `<blockquote>${renderChildren(node.content)}</blockquote>`;
    case "hardBreak":
      return "<br />";
    case "horizontalRule":
      return "<hr />";
    case "codeBlock":
      return `<pre><code>${renderChildren(node.content)}</code></pre>`;
    case "blogImage":
      return renderImageFigure(node);
    case "image":
      return renderLegacyImage(node);
    default:
      return renderChildren(node.content);
  }
}

export function renderTiptapContent(content: unknown): string {
  if (!content || typeof content !== "object") {
    return "";
  }

  return renderNode(content as RichTextNode);
}
