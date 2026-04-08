import test from "node:test";
import assert from "node:assert/strict";
import { createBlogImageNode, parseUploadResponse } from "../lib/blog/upload";

test("parses successful upload responses", async () => {
  const response = new Response(JSON.stringify({ url: "https://cdn.example.com/inline.jpg" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });

  const payload = await parseUploadResponse(response);

  assert.deepEqual(payload, {
    url: "https://cdn.example.com/inline.jpg"
  });
});

test("throws on invalid upload responses", async () => {
  const response = new Response(JSON.stringify({ error: "Upload failed." }), {
    status: 500,
    headers: {
      "Content-Type": "application/json"
    }
  });

  await assert.rejects(() => parseUploadResponse(response), /Upload failed\./);
});

test("creates the blog image insertion node shape", () => {
  const node = createBlogImageNode({
    src: "https://cdn.example.com/inline.jpg",
    alt: "Writer at desk",
    caption: "The first draft.",
    layout: "wrap-right"
  });

  assert.deepEqual(node, {
    type: "blogImage",
    attrs: {
      src: "https://cdn.example.com/inline.jpg",
      alt: "Writer at desk",
      caption: "The first draft.",
      layout: "wrap-right"
    }
  });
});
