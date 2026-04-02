"use client";

import { useState } from "react";
import type { Editor } from "@tiptap/react";

type BlogEditorToolbarProps = {
  editor: Editor | null;
  isUploading: boolean;
  onPickImage: () => void;
};

const buttonClassName =
  "inline-flex min-w-[2.5rem] items-center justify-center rounded-full border px-3 py-2 text-xs font-medium transition";

function ToolbarButton({
  label,
  onClick,
  active = false,
  disabled = false
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  const className = active
    ? `${buttonClassName} border-[rgba(29,78,216,0.26)] bg-[rgba(239,246,255,0.9)] text-accent`
    : `${buttonClassName} border-[rgba(232,227,216,0.95)] bg-[rgba(255,255,255,0.82)] text-ink hover:border-[rgba(154,145,132,0.66)] hover:bg-[rgba(255,255,255,0.98)]`;

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${className} disabled:cursor-not-allowed disabled:opacity-45`}>
      {label}
    </button>
  );
}

export function BlogEditorToolbar({ editor, isUploading, onPickImage }: BlogEditorToolbarProps) {
  const [linkValue, setLinkValue] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const applyLink = () => {
    if (!editor) {
      return;
    }

    const nextUrl = linkValue.trim();

    if (!nextUrl) {
      editor.chain().focus().unsetLink().run();
      setShowLinkInput(false);
      setLinkValue("");
      return;
    }

    editor.chain().focus().setLink({ href: nextUrl }).run();
    setShowLinkInput(false);
    setLinkValue("");
  };

  return (
    <div className="sticky top-4 z-20 rounded-[24px] border border-[rgba(232,227,216,0.95)] bg-[rgba(250,248,244,0.84)] p-3 shadow-[0_18px_36px_rgba(28,25,23,0.06)] backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-2">
        <ToolbarButton label="B" onClick={() => editor?.chain().focus().toggleBold().run()} active={Boolean(editor?.isActive("bold"))} disabled={!editor} />
        <ToolbarButton label="I" onClick={() => editor?.chain().focus().toggleItalic().run()} active={Boolean(editor?.isActive("italic"))} disabled={!editor} />
        <ToolbarButton label="U" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={Boolean(editor?.isActive("underline"))} disabled={!editor} />
        <ToolbarButton label="S" onClick={() => editor?.chain().focus().toggleStrike().run()} active={Boolean(editor?.isActive("strike"))} disabled={!editor} />
        <ToolbarButton label="H1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={Boolean(editor?.isActive("heading", { level: 1 }))} disabled={!editor} />
        <ToolbarButton label="H2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={Boolean(editor?.isActive("heading", { level: 2 }))} disabled={!editor} />
        <ToolbarButton label="• List" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={Boolean(editor?.isActive("bulletList"))} disabled={!editor} />
        <ToolbarButton label="1. List" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={Boolean(editor?.isActive("orderedList"))} disabled={!editor} />
        <ToolbarButton label="Quote" onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={Boolean(editor?.isActive("blockquote"))} disabled={!editor} />
        <ToolbarButton label="Rule" onClick={() => editor?.chain().focus().setHorizontalRule().run()} disabled={!editor} />
        <ToolbarButton label="Code" onClick={() => editor?.chain().focus().toggleCode().run()} active={Boolean(editor?.isActive("code"))} disabled={!editor} />
        <ToolbarButton label="Code block" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={Boolean(editor?.isActive("codeBlock"))} disabled={!editor} />
        <ToolbarButton
          label="Link"
          onClick={() => {
            const nextValue = typeof editor?.getAttributes("link").href === "string" ? editor.getAttributes("link").href : "";
            setLinkValue(nextValue);
            setShowLinkInput((current) => !current);
          }}
          active={Boolean(editor?.isActive("link"))}
          disabled={!editor}
        />
        <ToolbarButton label={isUploading ? "Uploading..." : "Image"} onClick={onPickImage} disabled={!editor || isUploading} />
        <ToolbarButton
          label="Undo"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor || !editor.can().chain().focus().undo().run()}
        />
        <ToolbarButton
          label="Redo"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor || !editor.can().chain().focus().redo().run()}
        />
      </div>

      {showLinkInput ? (
        <div className="mt-3 flex flex-col gap-2 rounded-[18px] border border-[rgba(232,227,216,0.95)] bg-[rgba(255,255,255,0.84)] p-3 sm:flex-row sm:items-center">
          <input
            value={linkValue}
            onChange={(event) => setLinkValue(event.target.value)}
            placeholder="https://example.com"
            className="min-w-0 flex-1 rounded-full border border-[rgba(232,227,216,0.95)] bg-white/90 px-4 py-2 text-sm text-ink outline-none transition focus:border-stone"
          />
          <div className="flex gap-2">
            <button type="button" onClick={applyLink} className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-95">
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkValue("");
              }}
              className="rounded-full border border-[rgba(232,227,216,0.95)] px-4 py-2 text-sm font-medium text-ink transition hover:border-stone hover:bg-white/90"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
