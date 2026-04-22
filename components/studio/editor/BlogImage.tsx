"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import { useEffect, useRef, useState } from "react";
import { normalizeImageLayout, normalizeImageWidth } from "@/lib/cms/content";
import type { BlogImageLayout } from "@/lib/cms/types";

const MIN_RESIZE_WIDTH = 180;

function maxResizeWidthForLayout(layout: BlogImageLayout) {
  if (layout === "wide") {
    return 1180;
  }

  if (layout === "float-left" || layout === "float-right") {
    return 560;
  }

  return 980;
}

function layoutFromPointerX(clientX: number, figure: HTMLElement): BlogImageLayout {
  const editor = figure.closest(".blog-editor-prosemirror");
  const bounds = (editor ?? figure.parentElement ?? figure).getBoundingClientRect();
  const position = (clientX - bounds.left) / bounds.width;

  if (position < 0.4) {
    return "float-left";
  }

  if (position > 0.6) {
    return "float-right";
  }

  return "center";
}

function placementLabel(layout: BlogImageLayout) {
  if (layout === "float-left") {
    return "Left wrap";
  }

  if (layout === "float-right") {
    return "Right wrap";
  }

  if (layout === "wide") {
    return "Wide";
  }

  return "Center";
}

function BlogImageView({ editor, getPos, node, selected, updateAttributes }: NodeViewProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const layout = normalizeImageLayout(node.attrs.layout);
  const alt = typeof node.attrs.alt === "string" ? node.attrs.alt : "";
  const caption = typeof node.attrs.caption === "string" ? node.attrs.caption : "";
  const persistedWidth = normalizeImageWidth(node.attrs.width);
  const [displayWidth, setDisplayWidth] = useState<number | undefined>(persistedWidth);
  const [pendingLayout, setPendingLayout] = useState<BlogImageLayout | null>(null);

  useEffect(() => {
    setDisplayWidth(persistedWidth);
  }, [persistedWidth]);

  function startResize(event: React.PointerEvent<HTMLButtonElement>) {
    const figure = figureRef.current;

    if (!figure) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startWidth = figure.getBoundingClientRect().width;
    const maxWidth = maxResizeWidthForLayout(layout);
    const direction = event.currentTarget.dataset.direction === "left" ? -1 : 1;
    let nextWidth = startWidth;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const delta = (moveEvent.clientX - startX) * direction;
      nextWidth = Math.min(maxWidth, Math.max(MIN_RESIZE_WIDTH, startWidth + delta));
      setDisplayWidth(Math.round(nextWidth));
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      updateAttributes({
        width: Math.round(nextWidth)
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
  }

  function startPlacementMove(event: React.PointerEvent<HTMLDivElement>) {
    const figure = figureRef.current;

    if (!figure) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    let nextLayout = layoutFromPointerX(event.clientX, figure);
    setPendingLayout(nextLayout);

    const onPointerMove = (moveEvent: PointerEvent) => {
      nextLayout = layoutFromPointerX(moveEvent.clientX, figure);
      setPendingLayout(nextLayout);
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      setPendingLayout(null);

      if (nextLayout !== layout) {
        updateAttributes({
          layout: nextLayout
        });
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
  }

  function moveVertically(direction: "up" | "down") {
    if (typeof getPos !== "function") {
      return;
    }

    const position = getPos();

    if (typeof position !== "number") {
      return;
    }

    const { doc } = editor.state;
    const nodeSize = node.nodeSize;
    const resolvedPosition = doc.resolve(position);
    const index = resolvedPosition.index();
    const previousPosition =
      direction === "up" && index > 0
        ? position - resolvedPosition.parent.child(index - 1).nodeSize
        : null;
    const nextPosition = direction === "down" ? position + nodeSize : null;
    const sibling =
      direction === "up"
        ? previousPosition !== null && previousPosition >= 0
          ? doc.nodeAt(previousPosition)
          : null
        : nextPosition !== null && nextPosition < doc.content.size
          ? doc.nodeAt(nextPosition)
          : null;

    if (!sibling) {
      return;
    }

    const insertPosition = direction === "up" ? position - sibling.nodeSize : position + sibling.nodeSize;
    const transaction = editor.state.tr
      .delete(position, position + nodeSize)
      .insert(insertPosition, node.copy(node.content));

    transaction.setSelection(NodeSelection.create(transaction.doc, insertPosition));
    editor.view.dispatch(transaction.scrollIntoView());
    editor.view.focus();
  }

  const style = displayWidth
    ? ({
        "--blog-editor-image-width": `${displayWidth}px`
      } as React.CSSProperties)
    : undefined;

  return (
    <NodeViewWrapper
      as="figure"
      ref={figureRef}
      data-layout={layout}
      data-pending-layout={pendingLayout ?? undefined}
      className={`blog-editor-image blog-editor-image-${layout} ${
        pendingLayout ? `is-placement-dragging blog-editor-image-placement-${pendingLayout}` : ""
      } ${selected ? "is-selected" : ""}`}
      style={style}
    >
      <div
        className="blog-editor-image-drag-handle"
        contentEditable={false}
        title="Drag left or right to change text wrap side"
        onPointerDown={startPlacementMove}
      >
        {pendingLayout ? placementLabel(pendingLayout) : "Move"}
      </div>
      <div className="blog-editor-image-order-controls" contentEditable={false}>
        <button
          type="button"
          aria-label="Move image up"
          title="Move image up"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            moveVertically("up");
          }}
        >
          Up
        </button>
        <button
          type="button"
          aria-label="Move image down"
          title="Move image down"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            moveVertically("down");
          }}
        >
          Down
        </button>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.attrs.src} alt={alt} draggable={false} />
      {caption ? <figcaption>{caption}</figcaption> : null}
      <button
        type="button"
        className="blog-editor-image-resize-handle blog-editor-image-resize-left"
        data-direction="left"
        aria-label="Resize image from left"
        contentEditable={false}
        onPointerDown={startResize}
      />
      <button
        type="button"
        className="blog-editor-image-resize-handle blog-editor-image-resize-right"
        data-direction="right"
        aria-label="Resize image from right"
        contentEditable={false}
        onPointerDown={startResize}
      />
    </NodeViewWrapper>
  );
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogImage: {
      setBlogImage: (attrs: {
        src: string;
        alt?: string;
        caption?: string;
        layout?: BlogImageLayout;
        width?: number;
      }) => ReturnType;
    };
  }
}

export const BlogImage = Node.create({
  name: "blogImage",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: ""
      },
      caption: {
        default: ""
      },
      layout: {
        default: "center",
        parseHTML: (element) => normalizeImageLayout(element.getAttribute("data-layout")),
        renderHTML: (attrs) => ({
          "data-layout": normalizeImageLayout(attrs.layout)
        })
      },
      width: {
        default: null,
        parseHTML: (element) => normalizeImageWidth(element.getAttribute("data-width")) ?? null,
        renderHTML: (attrs) => {
          const width = normalizeImageWidth(attrs.width);
          return width ? { "data-width": String(width) } : {};
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='blog-image']"
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const layout = normalizeImageLayout(HTMLAttributes.layout);
    return [
      "figure",
      mergeAttributes(HTMLAttributes, {
        "data-type": "blog-image",
        "data-layout": layout
      }),
      ["img", { src: HTMLAttributes.src, alt: HTMLAttributes.alt ?? "" }],
      HTMLAttributes.caption ? ["figcaption", 0] : ""
    ];
  },

  addCommands() {
    return {
      setBlogImage:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              src: attrs.src,
              alt: attrs.alt ?? "",
              caption: attrs.caption ?? "",
              layout: normalizeImageLayout(attrs.layout),
              width: normalizeImageWidth(attrs.width)
            }
          })
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlogImageView);
  }
});
