import test from "node:test";
import assert from "node:assert/strict";
import { renderTiptapContent } from "../lib/tiptap/render";

test("renders paragraph content safely", () => {
  const html = renderTiptapContent({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: 'Hello <script>alert("x")</script>'
          }
        ]
      }
    ]
  });

  assert.equal(html, "<p>Hello &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</p>");
});

test("renders legacy image nodes", () => {
  const html = renderTiptapContent({
    type: "doc",
    content: [
      {
        type: "image",
        attrs: {
          src: "https://cdn.example.com/photo.jpg",
          alt: "Cover",
          title: "Legacy title"
        }
      }
    ]
  });

  assert.equal(
    html,
    '<img src="https://cdn.example.com/photo.jpg" alt="Cover" title="Legacy title" />'
  );
});

test("renders blog image nodes as semantic figures", () => {
  const html = renderTiptapContent({
    type: "doc",
    content: [
      {
        type: "blogImage",
        attrs: {
          src: "https://cdn.example.com/inline.jpg",
          alt: "A notebook on a desk",
          caption: "Launch notes in progress.",
          layout: "wrap-right"
        }
      }
    ]
  });

  assert.equal(
    html,
    '<figure data-layout="wrap-right"><img src="https://cdn.example.com/inline.jpg" alt="A notebook on a desk" /><figcaption>Launch notes in progress.</figcaption></figure>'
  );
});

test("sanitizes unsafe urls", () => {
  const html = renderTiptapContent({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Read more",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "javascript:alert(1)"
                }
              }
            ]
          }
        ]
      },
      {
        type: "blogImage",
        attrs: {
          src: "javascript:alert(1)",
          alt: "Bad",
          layout: "full"
        }
      }
    ]
  });

  assert.equal(html, '<p><a href="#">Read more</a></p>');
});
