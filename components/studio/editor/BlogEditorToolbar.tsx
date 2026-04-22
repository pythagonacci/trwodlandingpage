"use client";

import type { Editor } from "@tiptap/react";

type BlogEditorToolbarProps = {
  editor: Editor | null;
  onInsertImage: () => void;
};

function ToolbarButton({
  active,
  children,
  disabled,
  onClick,
  title
}: {
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      className={`rounded-md border px-2.5 py-1.5 text-[12px] font-medium transition ${
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-white"
          : "border-[rgba(144,144,144,0.26)] bg-white text-ink-2 hover:border-stone hover:text-ink"
      } disabled:cursor-not-allowed disabled:opacity-40`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}

export function BlogEditorToolbar({ editor, onInsertImage }: BlogEditorToolbarProps) {
  const disabled = !editor;

  function setLink() {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Paste a URL", previousUrl ?? "https://");

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-1.5 border-b border-[rgba(144,144,144,0.18)] bg-[rgba(255,255,255,0.94)] p-3 backdrop-blur">
      <ToolbarButton
        title="Paragraph"
        disabled={disabled}
        active={editor?.isActive("paragraph")}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      >
        P
      </ToolbarButton>
      {[2, 3].map((level) => (
        <ToolbarButton
          key={level}
          title={`Heading ${level}`}
          disabled={disabled}
          active={editor?.isActive("heading", { level })}
          onClick={() => editor?.chain().focus().toggleHeading({ level: level as 2 | 3 }).run()}
        >
          H{level}
        </ToolbarButton>
      ))}
      <ToolbarButton
        title="Bold"
        disabled={disabled}
        active={editor?.isActive("bold")}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        disabled={disabled}
        active={editor?.isActive("italic")}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        I
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        disabled={disabled}
        active={editor?.isActive("underline")}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        U
      </ToolbarButton>
      <ToolbarButton
        title="Link"
        disabled={disabled}
        active={editor?.isActive("link")}
        onClick={setLink}
      >
        Link
      </ToolbarButton>
      <ToolbarButton
        title="Bullet list"
        disabled={disabled}
        active={editor?.isActive("bulletList")}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        Bullets
      </ToolbarButton>
      <ToolbarButton
        title="Ordered list"
        disabled={disabled}
        active={editor?.isActive("orderedList")}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>
      <ToolbarButton
        title="Blockquote"
        disabled={disabled}
        active={editor?.isActive("blockquote")}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        Quote
      </ToolbarButton>
      <ToolbarButton
        title="Callout"
        disabled={disabled}
        active={editor?.isActive("callout")}
        onClick={() => editor?.chain().focus().toggleWrap("callout").run()}
      >
        Callout
      </ToolbarButton>
      <ToolbarButton
        title="Divider"
        disabled={disabled}
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      >
        Divider
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        disabled={disabled}
        active={editor?.isActive("codeBlock")}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
      >
        Code
      </ToolbarButton>
      <ToolbarButton title="Insert image" disabled={disabled} onClick={onInsertImage}>
        Image
      </ToolbarButton>
    </div>
  );
}
