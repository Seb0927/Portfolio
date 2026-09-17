import { defineHastPlugin } from "satteri";
import type { Element } from "hast";

/**
 * Wraps a paragraph that contains a single Markdown image with a caption
 * (`![alt](src "caption")`) into `<figure><img><figcaption>`.
 *
 * Runs before Astro's `image-marker` HAST plugin, so every property except
 * `title` is carried over untouched and local images are still optimized.
 */
export function figureCaptions() {
  return defineHastPlugin({
    name: "figure-captions",
    element: {
      filter: ["p"],
      visit(node, _ctx) {
        const content = node.children.filter(
          (child) => !(child.type === "text" && child.value.trim() === ""),
        );

        if (content.length !== 1) return;

        const image = content[0];
        if (image.type !== "element" || image.tagName !== "img") return;

        const { title, ...imageProperties } = image.properties;
        if (typeof title !== "string" || title.trim() === "") return;

        const figure: Element = {
          type: "element",
          tagName: "figure",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "img",
              properties: imageProperties,
              children: [],
            },
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: title }],
            },
          ],
        };

        return figure;
      },
    },
  });
}
