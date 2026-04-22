import type { JSONContent } from "@tiptap/core";
import styles from "@/components/blog/article-content.module.css";
import { normalizeBlogImageAttrs } from "@/lib/cms/content";

type ArticleBodyProps = {
  content: JSONContent;
};

function renderMarks(text: string, marks: JSONContent["marks"] | undefined, key: string): React.ReactNode {
  return (marks ?? []).reduce<React.ReactNode>((children, mark) => {
    if (mark.type === "bold") {
      return <strong key={`${key}-bold`}>{children}</strong>;
    }

    if (mark.type === "italic") {
      return <em key={`${key}-italic`}>{children}</em>;
    }

    if (mark.type === "underline") {
      return <u key={`${key}-underline`}>{children}</u>;
    }

    if (mark.type === "code") {
      return <code key={`${key}-code`}>{children}</code>;
    }

    if (mark.type === "link") {
      const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          key={`${key}-link`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return children;
  }, text);
}

function renderChildren(node: JSONContent, path: string): React.ReactNode[] {
  return (node.content ?? []).map((child, index) => renderNode(child, `${path}-${index}`));
}

function renderImage(node: JSONContent, key: string) {
  const attrs = normalizeBlogImageAttrs((node.attrs ?? {}) as Record<string, unknown>);

  if (!attrs) {
    return null;
  }

  return (
    <figure
      key={key}
      className={styles.image}
      data-layout={attrs.layout}
      style={
        attrs.width
          ? ({
              "--blog-image-width": `${attrs.width}px`
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={attrs.src} alt={attrs.alt} loading="lazy" />
      {attrs.caption ? <figcaption>{attrs.caption}</figcaption> : null}
    </figure>
  );
}

function renderNode(node: JSONContent, key: string): React.ReactNode {
  switch (node.type) {
    case "text":
      return renderMarks(node.text ?? "", node.marks, key);
    case "paragraph":
      if (!node.content?.length) {
        return <p key={key} />;
      }
      return <p key={key}>{renderChildren(node, key)}</p>;
    case "heading": {
      const level = node.attrs?.level === 3 ? 3 : 2;
      return level === 3 ? (
        <h3 key={key}>{renderChildren(node, key)}</h3>
      ) : (
        <h2 key={key}>{renderChildren(node, key)}</h2>
      );
    }
    case "bulletList":
      return <ul key={key}>{renderChildren(node, key)}</ul>;
    case "orderedList":
      return <ol key={key}>{renderChildren(node, key)}</ol>;
    case "listItem":
      return <li key={key}>{renderChildren(node, key)}</li>;
    case "blockquote":
      return <blockquote key={key}>{renderChildren(node, key)}</blockquote>;
    case "horizontalRule":
      return <hr key={key} />;
    case "hardBreak":
      return <br key={key} />;
    case "codeBlock":
      return (
        <pre key={key}>
          <code>{(node.content ?? []).map((child) => child.text ?? "").join("\n")}</code>
        </pre>
      );
    case "callout":
      return (
        <aside key={key} className={styles.callout}>
          {renderChildren(node, key)}
        </aside>
      );
    case "blogImage":
      return renderImage(node, key);
    default:
      return <div key={key}>{renderChildren(node, key)}</div>;
  }
}

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className={styles.articleBody}>
      {(content.content ?? []).map((node, index) => renderNode(node, `node-${index}`))}
      <div className={styles.clearFloat} />
    </div>
  );
}
