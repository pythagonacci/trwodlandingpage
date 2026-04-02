import { Node, mergeAttributes } from "@tiptap/core";
import type { BlogImageLayout } from "@/lib/blog/content";
import { normalizeBlogImageAttrs, normalizeBlogImageLayout } from "@/lib/blog/content";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogImage: {
      setBlogImage: (attrs: {
        src: string;
        alt?: string;
        caption?: string;
        layout?: BlogImageLayout;
      }) => ReturnType;
      updateBlogImage: (attrs: {
        alt?: string;
        caption?: string;
        layout?: BlogImageLayout;
      }) => ReturnType;
    };
  }
}

export const BlogImage = Node.create({
  name: "blogImage",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  defining: true,

  addAttributes() {
    return {
      src: {
        default: ""
      },
      alt: {
        default: ""
      },
      caption: {
        default: ""
      },
      layout: {
        default: "full"
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-layout]',
        getAttrs: (element) => {
          const figure = element as HTMLElement;
          const image = figure.querySelector("img");

          if (!image) {
            return false;
          }

          return {
            src: image.getAttribute("src") ?? "",
            alt: image.getAttribute("alt") ?? "",
            caption: figure.querySelector("figcaption")?.textContent ?? "",
            layout: normalizeBlogImageLayout(figure.dataset.layout)
          };
        }
      }
    ];
  },

  renderHTML({ node }) {
    const attrs = normalizeBlogImageAttrs(node.attrs);

    if (!attrs) {
      return ["figure", { "data-layout": "full", "data-blog-image": "true" }];
    }

    const children: any[] = [["img", mergeAttributes({ src: attrs.src, alt: attrs.alt })]];

    if (attrs.caption) {
      children.push(["figcaption", {}, attrs.caption]);
    }

    return ["figure", { "data-layout": attrs.layout, "data-blog-image": "true" }, ...children];
  },

  addCommands() {
    return {
      setBlogImage:
        (attrs) =>
        ({ commands }) => {
          const normalized = normalizeBlogImageAttrs(attrs);

          if (!normalized) {
            return false;
          }

          return commands.insertContent({
            type: this.name,
            attrs: normalized
          });
        },
      updateBlogImage:
        (attrs) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, {
            ...attrs,
            layout: attrs.layout ? normalizeBlogImageLayout(attrs.layout) : undefined
          })
    };
  }
});
