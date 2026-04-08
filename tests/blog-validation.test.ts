import test from "node:test";
import assert from "node:assert/strict";
import { validatePostFormData } from "../lib/blog/validation";

function createBasePostData() {
  return {
    title: "A production editor",
    excerpt: "Short summary",
    slug: "production-editor",
    coverImageUrl: "https://cdn.example.com/cover.jpg",
    isPublished: false,
    content: {
      type: "doc",
      content: []
    }
  };
}

test("rejects invalid blog image layout values", () => {
  const result = validatePostFormData({
    ...createBasePostData(),
    content: {
      type: "doc",
      content: [
        {
          type: "blogImage",
          attrs: {
            src: "https://cdn.example.com/photo.jpg",
            alt: "Desk",
            caption: "Caption",
            layout: "sideways"
          }
        }
      ]
    }
  });

  assert.equal(result.success, false);
});

test("accepts valid blog image attributes", () => {
  const result = validatePostFormData({
    ...createBasePostData(),
    content: {
      type: "doc",
      content: [
        {
          type: "blogImage",
          attrs: {
            src: "https://cdn.example.com/photo.jpg",
            alt: "Notebook on table",
            caption: "Editorial planning in progress.",
            layout: "wrap-left"
          }
        }
      ]
    }
  });

  assert.equal(result.success, true);
});

test("handles optional caption and empty alt text", () => {
  const result = validatePostFormData({
    ...createBasePostData(),
    content: {
      type: "doc",
      content: [
        {
          type: "blogImage",
          attrs: {
            src: "https://cdn.example.com/photo.jpg",
            alt: "",
            layout: "full"
          }
        }
      ]
    }
  });

  assert.equal(result.success, true);
});
