"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { NodeSelection } from "@tiptap/pm/state";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArticleBody } from "@/components/blog/ArticleBody";
import styles from "@/components/studio/post-editor.module.css";
import { BlogEditorToolbar } from "@/components/studio/editor/BlogEditorToolbar";
import { BlogImage } from "@/components/studio/editor/BlogImage";
import { Callout } from "@/components/studio/editor/Callout";
import { savePost } from "@/app/(studio)/studio/posts/actions";
import {
  createBlogImageNode,
  createEmptyDoc,
  normalizeBlogImageAttrs,
  normalizeEditorContent
} from "@/lib/cms/content";
import { slugify } from "@/lib/cms/validation";
import type { BlogImageAttrs, BlogImageLayout, Category, MediaAsset, Post, PostStatus } from "@/lib/cms/types";

type PostEditorProps = {
  post: Post | null;
  categories: Category[];
};

type SaveState = {
  status: "idle" | "saving" | "saved" | "error";
  message: string;
};

const IMAGE_LAYOUTS: Array<{ value: BlogImageLayout; label: string }> = [
  { value: "center", label: "Centered" },
  { value: "wide", label: "Wide" },
  { value: "float-left", label: "Wrap left" },
  { value: "float-right", label: "Wrap right" }
];

function hasImageNodeWithSrc(content: JSONContent): boolean {
  if (content.type === "blogImage") {
    return typeof content.attrs?.src === "string" && content.attrs.src.length > 0;
  }

  return (content.content ?? []).some(hasImageNodeWithSrc);
}

function hasImageNodeWithUrl(content: JSONContent, url: string): boolean {
  if (content.type === "blogImage") {
    return content.attrs?.src === url;
  }

  return (content.content ?? []).some((child) => hasImageNodeWithUrl(child, url));
}

function hasBrokenImageNode(content: JSONContent): boolean {
  if (content.type === "blogImage") {
    return typeof content.attrs?.src !== "string" || content.attrs.src.length === 0;
  }

  return (content.content ?? []).some(hasBrokenImageNode);
}

function serializeEditorContent(content: JSONContent): JSONContent {
  return JSON.parse(JSON.stringify(content)) as JSONContent;
}

async function uploadStudioImage(file: File, intent: "cover" | "body", altText?: string): Promise<MediaAsset> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("intent", intent);
  formData.append("altText", altText ?? "");

  const response = await fetch("/api/studio/upload", {
    method: "POST",
    body: formData
  });

  const payload = (await response.json()) as { asset?: MediaAsset; error?: string };

  if (!response.ok || !payload.asset) {
    throw new Error(payload.error ?? "Upload failed.");
  }

  return payload.asset;
}

export function PostEditor({ post, categories }: PostEditorProps) {
  const router = useRouter();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLInputElement>(null);
  const initialContent = normalizeEditorContent(post?.editor_content_json ?? createEmptyDoc());
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [categoryId, setCategoryId] = useState(post?.category_id ?? categories[0]?.id ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(post?.cover_image_alt ?? "");
  const [authorName, setAuthorName] = useState(post?.author_name ?? "Trak Editorial");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seo_description ?? "");
  const [seoOgImageUrl, setSeoOgImageUrl] = useState(post?.seo_og_image_url ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [postId, setPostId] = useState(post?.id ?? null);
  const [postStatus, setPostStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [previewContent, setPreviewContent] = useState<JSONContent>(initialContent);
  const [selectedImage, setSelectedImage] = useState<BlogImageAttrs | null>(null);
  const [selectedImagePos, setSelectedImagePos] = useState<number | null>(null);
  const [activePanel, setActivePanel] = useState<"write" | "preview">("write");
  const [uploadMessage, setUploadMessage] = useState("");
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle", message: "" });
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Underline,
      LinkExtension.configure({
        autolink: true,
        defaultProtocol: "https",
        openOnClick: false
      }),
      Placeholder.configure({
        placeholder: "Write the post. Add images, callouts, quotes, and structure as it should publish."
      }),
      BlogImage,
      Callout
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "blog-editor-prosemirror"
      },
      handleDrop: (_view, event) => {
        const file = Array.from(event.dataTransfer?.files ?? []).find((entry) => entry.type.startsWith("image/"));

        if (!file) {
          return false;
        }

        event.preventDefault();
        void insertBodyImage(file);
        return true;
      },
      handlePaste: (_view, event) => {
        const file = Array.from(event.clipboardData?.files ?? []).find((entry) => entry.type.startsWith("image/"));

        if (!file) {
          return false;
        }

        event.preventDefault();
        void insertBodyImage(file);
        return true;
      }
    },
    onUpdate: ({ editor: updatedEditor }) => {
      setPreviewContent(updatedEditor.getJSON());
    }
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const syncSelectedImage = () => {
      const selection = editor.state.selection;

      if (!(selection instanceof NodeSelection) || selection.node.type.name !== "blogImage") {
        setSelectedImage(null);
        setSelectedImagePos(null);
        return;
      }

      setSelectedImage(normalizeBlogImageAttrs(selection.node.attrs));
      setSelectedImagePos(selection.from);
    };

    syncSelectedImage();
    editor.on("selectionUpdate", syncSelectedImage);
    editor.on("transaction", syncSelectedImage);

    return () => {
      editor.off("selectionUpdate", syncSelectedImage);
      editor.off("transaction", syncSelectedImage);
    };
  }, [editor]);

  function updateTitle(nextTitle: string) {
    setTitle(nextTitle);

    if (!slugEdited) {
      setSlug(slugify(nextTitle));
    }
  }

  async function uploadCover(file: File) {
    setUploadMessage("Uploading cover image...");

    try {
      const asset = await uploadStudioImage(file, "cover", coverImageAlt);
      setCoverImageUrl(asset.public_url);
      setCoverImageAlt((current) => current || asset.alt_text || "");
      setUploadMessage("Cover image uploaded.");
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "Cover upload failed.");
    } finally {
      if (coverInputRef.current) {
        coverInputRef.current.value = "";
      }
    }
  }

  async function insertBodyImage(file: File) {
    if (!editor) {
      return;
    }

    setUploadMessage("Uploading body image...");

    try {
      const asset = await uploadStudioImage(file, "body");

      if (!asset.public_url) {
        throw new Error("Upload succeeded but Supabase did not return a public image URL.");
      }

      const imageNode = createBlogImageNode({
        src: asset.public_url,
        alt: asset.alt_text ?? "",
        caption: "",
        layout: "center"
      });
      const schemaNode = editor.schema.nodes.blogImage.create(imageNode.attrs);
      const transaction = editor.state.tr.replaceSelectionWith(schemaNode).scrollIntoView();

      editor.view.dispatch(transaction);
      editor.view.focus();

      const nextContent = serializeEditorContent(editor.getJSON());

      if (!hasImageNodeWithSrc(nextContent) || !hasImageNodeWithUrl(nextContent, asset.public_url)) {
        throw new Error("Image uploaded, but the editor did not attach the image URL. Try refreshing Studio and inserting it again.");
      }

      setPreviewContent(nextContent);
      setUploadMessage("Image inserted.");
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      if (bodyInputRef.current) {
        bodyInputRef.current.value = "";
      }
    }
  }

  function updateSelectedImage(attrs: Partial<BlogImageAttrs>) {
    if (!editor || selectedImagePos === null || !selectedImage) {
      return;
    }

    const nextAttrs = { ...selectedImage, ...attrs };
    editor.chain().focus().setNodeSelection(selectedImagePos).updateAttributes("blogImage", nextAttrs).run();
    setSelectedImage(nextAttrs);
    setPreviewContent(editor.getJSON());
  }

  function persist(nextStatus: PostStatus) {
    if (!editor) {
      return;
    }

    const content = serializeEditorContent(editor.getJSON());

    if (hasBrokenImageNode(content)) {
      setSaveState({
        status: "error",
        message: "One or more image blocks are missing their image URL. Delete and reinsert those images before publishing."
      });
      return;
    }

    setSaveState({ status: "saving", message: nextStatus === "published" ? "Publishing..." : "Saving..." });

    startTransition(async () => {
      const result = await savePost(
        postId,
        {
          title,
          slug,
          excerpt,
          categoryId,
          coverImageUrl,
          coverImageAlt,
          content,
          authorName,
          seoTitle,
          seoDescription,
          seoOgImageUrl,
          canonicalUrl,
          featured
        },
        nextStatus
      );

      if (!result.ok) {
        setSaveState({ status: "error", message: result.message });
        return;
      }

      setPostId(result.postId ?? postId);
      setPostStatus(result.status ?? nextStatus);
      setSaveState({ status: "saved", message: result.message });
      router.refresh();

      if (!postId && result.postId) {
        router.replace(`/studio/posts/${result.postId}`);
      }
    });
  }

  const selectedCategory = categories.find((category) => category.id === categoryId);
  const publicHref = selectedCategory && slug ? `/blog/${selectedCategory.slug}/${slug}` : null;

  return (
    <div className={styles.editorShell}>
      <div className={styles.mainColumn}>
        <div className={styles.titlePanel}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
                {postStatus === "published" ? "Published article" : "Draft article"}
              </p>
              <p className="mt-1 text-[13px] text-stone">
                {postId ? "Edit and update this post." : "Create a new post."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {publicHref && postStatus === "published" ? (
                <a
                  href={publicHref}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.secondaryButton}
                >
                  View live
                </a>
              ) : null}
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={isPending}
                onClick={() => persist("draft")}
              >
                {postStatus === "published" ? "Unpublish to draft" : "Save draft"}
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={isPending || !categories.length}
                onClick={() => persist("published")}
              >
                Publish
              </button>
            </div>
          </div>
          {saveState.message ? (
            <p className={saveState.status === "error" ? styles.errorText : styles.statusText}>
              {saveState.message}
            </p>
          ) : null}
          <input
            className={styles.titleInput}
            value={title}
            onChange={(event) => updateTitle(event.target.value)}
            placeholder="Article title"
          />
          <textarea
            className={styles.excerptInput}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Dek / excerpt for cards, SEO fallbacks, and the article header"
            rows={3}
          />
        </div>

        <div className={styles.editorCard}>
          <div className={styles.panelTabs}>
            <button
              type="button"
              className={activePanel === "write" ? styles.activeTab : styles.tab}
              onClick={() => setActivePanel("write")}
            >
              Write
            </button>
            <button
              type="button"
              className={activePanel === "preview" ? styles.activeTab : styles.tab}
              onClick={() => {
                setPreviewContent(editor?.getJSON() ?? previewContent);
                setActivePanel("preview");
              }}
            >
              Preview
            </button>
          </div>

          {activePanel === "write" ? (
            <>
              <BlogEditorToolbar editor={editor} onInsertImage={() => bodyInputRef.current?.click()} />
              <EditorContent editor={editor} className={styles.editorContent} />
            </>
          ) : (
            <div className={styles.previewPane}>
              <ArticleBody content={previewContent} />
            </div>
          )}
        </div>
      </div>

      <aside className={styles.sideColumn}>
        <section className={styles.sidePanel}>
          <h2>Publishing</h2>
          <label>
            Category
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Slug
            <input
              value={slug}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(slugify(event.target.value));
              }}
              placeholder="launch-teardown"
            />
          </label>
          <label>
            Author
            <input value={authorName} onChange={(event) => setAuthorName(event.target.value)} />
          </label>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
            />
            Featured on blog index
          </label>
        </section>

        <section className={styles.sidePanel}>
          <h2>Cover</h2>
          {coverImageUrl ? (
            <div className={styles.coverPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImageUrl} alt={coverImageAlt || ""} />
            </div>
          ) : null}
          <button type="button" className={styles.secondaryButton} onClick={() => coverInputRef.current?.click()}>
            Upload cover
          </button>
          <label>
            Cover URL
            <input value={coverImageUrl} onChange={(event) => setCoverImageUrl(event.target.value)} />
          </label>
          <label>
            Cover alt text
            <input value={coverImageAlt} onChange={(event) => setCoverImageAlt(event.target.value)} />
          </label>
          {uploadMessage ? <p className={styles.statusText}>{uploadMessage}</p> : null}
        </section>

        {selectedImage ? (
          <section className={styles.sidePanel}>
            <h2>Selected image</h2>
            <div className={styles.layoutGrid}>
              {IMAGE_LAYOUTS.map((layout) => (
                <button
                  key={layout.value}
                  type="button"
                  className={selectedImage.layout === layout.value ? styles.activeLayout : styles.layoutButton}
                  onClick={() => updateSelectedImage({ layout: layout.value })}
                >
                  {layout.label}
                </button>
              ))}
            </div>
            <label>
              Width
              <div className={styles.widthControlRow}>
                <span>{selectedImage.width ? `${selectedImage.width}px` : "Auto"}</span>
                <button
                  type="button"
                  className={styles.miniButton}
                  onClick={() => updateSelectedImage({ width: undefined })}
                >
                  Reset
                </button>
              </div>
            </label>
            <label>
              Alt text
              <input
                value={selectedImage.alt}
                onChange={(event) => updateSelectedImage({ alt: event.target.value })}
              />
            </label>
            <label>
              Caption
              <textarea
                value={selectedImage.caption ?? ""}
                rows={3}
                onChange={(event) => updateSelectedImage({ caption: event.target.value })}
              />
            </label>
          </section>
        ) : null}

        <section className={styles.sidePanel}>
          <h2>SEO</h2>
          <label>
            SEO title
            <input value={seoTitle} onChange={(event) => setSeoTitle(event.target.value)} maxLength={70} />
          </label>
          <label>
            SEO description
            <textarea
              value={seoDescription}
              onChange={(event) => setSeoDescription(event.target.value)}
              rows={4}
              maxLength={180}
            />
          </label>
          <label>
            OG image URL
            <input value={seoOgImageUrl} onChange={(event) => setSeoOgImageUrl(event.target.value)} />
          </label>
          <label>
            Canonical URL
            <input value={canonicalUrl} onChange={(event) => setCanonicalUrl(event.target.value)} />
          </label>
        </section>
      </aside>

      <input
        ref={coverInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadCover(file);
          }
        }}
      />
      <input
        ref={bodyInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void insertBodyImage(file);
          }
        }}
      />
    </div>
  );
}
