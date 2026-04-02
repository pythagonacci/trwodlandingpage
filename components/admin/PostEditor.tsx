"use client";

import Link from "next/link";
import type { Route } from "next";
import type { JSONContent } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { NodeSelection } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePost } from "@/app/admin/posts/actions";
import { BlogEditorToolbar } from "@/components/admin/editor/BlogEditorToolbar";
import { BlogImage } from "@/components/admin/editor/extensions/BlogImage";
import articleStyles from "@/components/blog/article-content.module.css";
import editorStyles from "@/components/admin/post-editor.module.css";
import { formatPostDate, slugify, type PostRecord } from "@/lib/blog";
import {
  createEmptyRichTextDoc,
  normalizeBlogImageLayout,
  normalizeBlogImageAttrs,
  normalizeRichTextForEditor,
  type BlogImageAttrs
} from "@/lib/blog/content";
import { createBlogImageNode, uploadBlogImage } from "@/lib/blog/upload";

type PostEditorProps = {
  post: PostRecord | null;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

type PostMeta = {
  id: string | null;
  slug: string;
  isPublished: boolean;
  publishedAt: string | null;
};

type SelectedImageState = {
  pos: number;
  attrs: BlogImageAttrs;
};

function getEditorContent(post: PostRecord | null): JSONContent {
  return normalizeRichTextForEditor((post?.content ?? createEmptyRichTextDoc()) as Record<string, unknown>) as JSONContent;
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const inlineImageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [postMeta, setPostMeta] = useState<PostMeta>({
    id: post?.id ?? null,
    slug: post?.slug ?? "",
    isPublished: post?.is_published ?? false,
    publishedAt: post?.published_at ?? null
  });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [coverUploadMessage, setCoverUploadMessage] = useState("");
  const [inlineUploadMessage, setInlineUploadMessage] = useState("");
  const [isUploadingInlineImage, setIsUploadingInlineImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImageState | null>(null);
  const [isPending, startTransition] = useTransition();

  const isPublished = postMeta.isPublished;
  const livePostHref = isPublished && postMeta.slug ? (`/blog/${postMeta.slug}` as Route) : null;
  const saveStatusLabel =
    saveStatus === "saving"
      ? "Saving draft…"
      : saveStatus === "saved"
        ? saveMessage || "Saved."
        : saveStatus === "error"
          ? saveMessage || "Something went wrong."
          : "";

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      BlogImage,
      Placeholder.configure({
        placeholder: "Write the article exactly as it should read on the live blog…"
      }),
      Underline,
      LinkExtension.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https"
      })
    ],
    content: getEditorContent(post),
    editorProps: {
      attributes: {
        class: "blog-editor-prosemirror"
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) => file.type.startsWith("image/"));

        if (!files.length) {
          return false;
        }

        event.preventDefault();

        const coordinates = editor?.view.posAtCoords({
          left: event.clientX,
          top: event.clientY
        });

        void handleInlineImageFile(files[0], coordinates?.pos);
        return true;
      },
      handlePaste: (_view, event) => {
        const file = Array.from(event.clipboardData?.files ?? []).find((entry) => entry.type.startsWith("image/"));

        if (!file) {
          return false;
        }

        event.preventDefault();
        void handleInlineImageFile(file);
        return true;
      }
    }
  });

  useEffect(() => {
    setTitle(post?.title ?? "");
    setExcerpt(post?.excerpt ?? "");
    setSlug(post?.slug ?? "");
    setCoverImageUrl(post?.cover_image_url ?? "");
    setSlugEdited(Boolean(post?.slug));
    setPostMeta({
      id: post?.id ?? null,
      slug: post?.slug ?? "",
      isPublished: post?.is_published ?? false,
      publishedAt: post?.published_at ?? null
    });
    setSaveStatus("idle");
    setSaveMessage("");
    setCoverUploadMessage("");
    setInlineUploadMessage("");
    setSelectedImage(null);
  }, [post?.id, post?.title, post?.excerpt, post?.slug, post?.cover_image_url, post?.is_published, post?.published_at]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.commands.setContent(getEditorContent(post));
  }, [editor, post]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const syncSelectedImage = () => {
      const { selection } = editor.state;

      if (!(selection instanceof NodeSelection) || selection.node.type.name !== "blogImage") {
        setSelectedImage(null);
        return;
      }

      const attrs = normalizeBlogImageAttrs(selection.node.attrs);

      if (!attrs) {
        setSelectedImage(null);
        return;
      }

      setSelectedImage({
        pos: selection.from,
        attrs
      });
    };

    syncSelectedImage();
    editor.on("selectionUpdate", syncSelectedImage);
    editor.on("transaction", syncSelectedImage);

    return () => {
      editor.off("selectionUpdate", syncSelectedImage);
      editor.off("transaction", syncSelectedImage);
    };
  }, [editor]);

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSave(nextPublishedState: boolean) {
    if (!editor) {
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("");

    startTransition(async () => {
      const result = await savePost(postMeta.id ?? post?.id ?? null, {
        title,
        excerpt,
        slug,
        coverImageUrl,
        content: editor.getJSON(),
        isPublished: nextPublishedState
      });

      if (!result.success) {
        setSaveStatus("error");
        setSaveMessage(result.error ?? "Unable to save post.");
        return;
      }

      const nextMeta = {
        id: result.postId ?? postMeta.id,
        slug: result.slug ?? slug,
        isPublished: result.isPublished ?? nextPublishedState,
        publishedAt: result.publishedAt ?? null
      };

      setSaveStatus("saved");
      setSaveMessage(nextMeta.isPublished ? "Post published." : "Draft saved.");
      setPostMeta(nextMeta);
      setSlug(nextMeta.slug);
      setSlugEdited(true);

      if (!post?.id && result.postId) {
        router.replace(`/admin/posts/${result.postId}/edit` as Route);
      }

      router.refresh();
    });
  }

  async function handleCoverImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setCoverUploadMessage("Uploading featured image…");

    try {
      const uploaded = await uploadBlogImage(file, {
        folder: "cover"
      });

      setCoverImageUrl(uploaded.url);
      setCoverUploadMessage("Featured image uploaded.");
    } catch (error) {
      setCoverUploadMessage(error instanceof Error ? error.message : "Featured image upload failed.");
    } finally {
      event.target.value = "";
    }
  }

  async function handleInlineImageFile(file: File, insertionPos?: number) {
    if (!editor) {
      return;
    }

    setIsUploadingInlineImage(true);
    setInlineUploadMessage("Uploading inline image…");

    try {
      const uploaded = await uploadBlogImage(file, {
        folder: "inline"
      });
      const imageNode = createBlogImageNode({
        src: uploaded.url,
        alt: uploaded.suggestedAlt,
        layout: "full"
      });

      if (typeof insertionPos === "number") {
        editor.chain().focus().insertContentAt(insertionPos, imageNode).run();
      } else {
        editor.chain().focus().insertContent(imageNode).run();
      }

      setInlineUploadMessage("Inline image uploaded.");
    } catch (error) {
      setInlineUploadMessage(error instanceof Error ? error.message : "Inline image upload failed.");
    } finally {
      setIsUploadingInlineImage(false);
    }
  }

  function updateSelectedImageAttrs(patch: Partial<BlogImageAttrs>) {
    if (!editor || !selectedImage) {
      return;
    }

    const targetNode = editor.state.doc.nodeAt(selectedImage.pos);

    if (!targetNode || targetNode.type.name !== "blogImage") {
      return;
    }

    const nextAttrs = normalizeBlogImageAttrs({
      ...targetNode.attrs,
      ...patch
    });

    if (!nextAttrs) {
      return;
    }

    const tr = editor.state.tr.setNodeMarkup(selectedImage.pos, undefined, nextAttrs);
    tr.setSelection(NodeSelection.create(tr.doc, selectedImage.pos));
    editor.view.dispatch(tr);
  }

  function removeSelectedImage() {
    if (!editor || !selectedImage) {
      return;
    }

    const node = editor.state.doc.nodeAt(selectedImage.pos);

    if (!node) {
      return;
    }

    const tr = editor.state.tr.delete(selectedImage.pos, selectedImage.pos + node.nodeSize);
    editor.view.dispatch(tr);
  }

  const actionButtons = (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={isPending || !editor}
        onClick={() => handleSave(isPublished)}
        className="rounded-full border border-[rgba(232,227,216,0.96)] bg-[rgba(255,255,255,0.84)] px-5 py-3 text-sm font-medium text-ink transition hover:border-stone hover:bg-white/95 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {isPublished ? "Save changes" : "Save draft"}
      </button>
      <button
        type="button"
        disabled={isPending || !editor}
        onClick={() => handleSave(!isPublished)}
        className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>
    </div>
  );

  return (
    <main className={editorStyles.page}>
      <section className={editorStyles.topbar}>
        <div>
          <p className={editorStyles.eyebrow}>Editorial studio</p>
          <h1 className={editorStyles.pageTitle}>{post ? "Edit journal post" : "Write a new journal post"}</h1>
          <p className={editorStyles.pageSubtitle}>
            Write directly into the same reading column, rhythm, and image system the published post uses.
          </p>
          <div className={editorStyles.statusRow}>
            <span
              className={`${editorStyles.statusPill} ${
                isPublished ? editorStyles.statusPublished : editorStyles.statusDraft
              }`}
            >
              {isPublished ? "Published" : "Draft"}
            </span>
            <span className="text-sm text-ink-2">
              {isPublished && postMeta.publishedAt
                ? `Live since ${formatPostDate(postMeta.publishedAt)}`
                : "Not visible on the public site yet."}
            </span>
            <Link href={"/admin" as Route} className="text-sm font-medium text-ink transition hover:text-accent">
              Back to posts
            </Link>
            <Link href={"/blog" as Route} className="text-sm font-medium text-ink transition hover:text-accent">
              View blog index
            </Link>
            {livePostHref ? (
              <Link href={livePostHref} className="text-sm font-medium text-accent transition hover:opacity-80">
                View live post
              </Link>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-right text-ink-3">{saveStatusLabel}</p>
          {actionButtons}
        </div>
      </section>

      <section className={editorStyles.surface}>
        <div className={editorStyles.metaCard}>
          <div className={editorStyles.metaGrid}>
            <div className={editorStyles.fieldGroup}>
              <label htmlFor="post-title" className={editorStyles.fieldLabel}>
                Title
              </label>
              <textarea
                id="post-title"
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="A sharp, editorial title"
                className={editorStyles.titleInput}
                rows={2}
              />
            </div>

            <div className="grid gap-4">
              <div className={editorStyles.fieldGroup}>
                <label htmlFor="post-slug" className={editorStyles.fieldLabel}>
                  Slug
                </label>
                <input
                  id="post-slug"
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    setSlug(event.target.value);
                  }}
                  placeholder="post-url"
                  className={editorStyles.quietInput}
                />
              </div>

              <div className={editorStyles.fieldGroup}>
                <span className={editorStyles.fieldLabel}>Featured image</span>
                <div className={editorStyles.linkRow}>
                  <button
                    type="button"
                    onClick={() => coverImageInputRef.current?.click()}
                    className="rounded-full border border-[rgba(232,227,216,0.96)] bg-[rgba(255,255,255,0.84)] px-4 py-2 text-sm font-medium text-ink transition hover:border-stone hover:bg-white/95"
                  >
                    {coverImageUrl ? "Replace image" : "Upload image"}
                  </button>
                  {coverImageUrl ? (
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl("")}
                      className="rounded-full border border-[rgba(232,227,216,0.96)] px-4 py-2 text-sm font-medium text-ink transition hover:border-stone hover:bg-white/95"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <input
                  ref={coverImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className={editorStyles.hiddenInput}
                />
                {coverUploadMessage ? <p className={editorStyles.helperText}>{coverUploadMessage}</p> : null}
              </div>
            </div>
          </div>

          <div className={editorStyles.fieldGroup}>
            <label htmlFor="post-excerpt" className={editorStyles.fieldLabel}>
              Excerpt
            </label>
            <textarea
              id="post-excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="A quieter summary for cards, metadata, and the opening deck."
              className={editorStyles.excerptInput}
              rows={3}
            />
          </div>
        </div>

        <div className={editorStyles.articleShell}>
          <div className={editorStyles.editorToolbarSlot}>
            <BlogEditorToolbar
              editor={editor}
              isUploading={isUploadingInlineImage}
              onPickImage={() => inlineImageInputRef.current?.click()}
            />
          </div>

          <div className={editorStyles.articleViewport}>
            <header className={`${articleStyles.articleColumn} ${articleStyles.articleHeader}`}>
              <p className={articleStyles.articleEyebrow}>
                {isPublished && postMeta.publishedAt ? formatPostDate(postMeta.publishedAt) : "Draft preview"}
              </p>
              <h2 className={articleStyles.articleTitle}>{title || "Untitled story"}</h2>
              {excerpt ? <p className={articleStyles.articleExcerpt}>{excerpt}</p> : null}
            </header>

            <div className={articleStyles.articleColumn}>
              <div className={editorStyles.heroActions}>
                <span className={editorStyles.helperText}>Featured image appears above the article body on the live post.</span>
              </div>

              {coverImageUrl ? (
                <figure className={articleStyles.heroFigure}>
                  <img src={coverImageUrl} alt="" className={articleStyles.heroImage} />
                </figure>
              ) : (
                <div className={articleStyles.heroFigure}>
                  <div className={articleStyles.heroEmpty}>
                    <div>
                      <p className={articleStyles.heroEmptyTitle}>Optional featured image</p>
                      <p className="mt-2 max-w-md text-sm leading-7 text-ink-3">
                        Add a hero image to anchor the story. The article layout stays clean if you leave it empty.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={inlineImageInputRef}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];

                  if (file) {
                    await handleInlineImageFile(file);
                  }

                  event.target.value = "";
                }}
                className={editorStyles.hiddenInput}
              />

              <div className={`${articleStyles.bodyCard} ${articleStyles.editorBodyCard}`}>
                <div className={articleStyles.body}>
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-ink-3">
                  Drop images into the article, paste from clipboard, or use the toolbar to upload inline.
                </p>
                {inlineUploadMessage ? <p className="text-sm text-ink-2">{inlineUploadMessage}</p> : null}
              </div>

              {selectedImage ? (
                <section className={editorStyles.imageInspector}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className={editorStyles.fieldLabel}>Selected inline image</p>
                      <p className={editorStyles.helperText}>
                        Alt text, caption, and layout update the real published figure markup.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="rounded-full border border-[rgba(161,47,27,0.2)] bg-[rgba(161,47,27,0.06)] px-4 py-2 text-sm font-medium text-[rgba(161,47,27,0.92)] transition hover:opacity-85"
                    >
                      Remove image
                    </button>
                  </div>

                  <div className={editorStyles.imageInspectorGrid}>
                    <div className={editorStyles.fieldGroup}>
                      <label htmlFor="image-alt" className={editorStyles.fieldLabel}>
                        Alt text
                      </label>
                      <input
                        id="image-alt"
                        value={selectedImage.attrs.alt}
                        onChange={(event) => updateSelectedImageAttrs({ alt: event.target.value })}
                        className={editorStyles.quietInput}
                        placeholder="Describe the image for screen readers"
                      />
                    </div>

                    <div className={editorStyles.fieldGroup}>
                      <label htmlFor="image-layout" className={editorStyles.fieldLabel}>
                        Layout
                      </label>
                      <select
                        id="image-layout"
                        value={selectedImage.attrs.layout}
                        onChange={(event) =>
                          updateSelectedImageAttrs({
                            layout: normalizeBlogImageLayout(event.target.value)
                          })
                        }
                        className={editorStyles.quietInput}
                      >
                        <option value="full">Full width</option>
                        <option value="wrap-left">Wrap left</option>
                        <option value="wrap-right">Wrap right</option>
                      </select>
                    </div>

                    <div className={editorStyles.fieldGroup}>
                      <label htmlFor="image-src" className={editorStyles.fieldLabel}>
                        Source
                      </label>
                      <input id="image-src" value={selectedImage.attrs.src} disabled className={editorStyles.quietInput} />
                    </div>
                  </div>

                  <div className={editorStyles.fieldGroup}>
                    <label htmlFor="image-caption" className={editorStyles.fieldLabel}>
                      Caption
                    </label>
                    <textarea
                      id="image-caption"
                      value={selectedImage.attrs.caption}
                      onChange={(event) => updateSelectedImageAttrs({ caption: event.target.value })}
                      className={editorStyles.captionInput}
                      placeholder="Add an optional figure caption"
                      rows={3}
                    />
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>

        <div className={`${editorStyles.actions} mt-6 border-t border-[rgba(232,227,216,0.92)] pt-5`}>
          <p className={editorStyles.helperText}>
            Saving preserves the same Tiptap JSON structure used by the public blog renderer.
          </p>
          {actionButtons}
        </div>
      </section>
    </main>
  );
}
