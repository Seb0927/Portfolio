---
title: "Hello, Markdown"
description: "A short demo post that exercises everything the blog supports: headings, lists, tables, code, blockquotes, footnotes and captioned images."
date: "2026-09-16"
image: "@/assets/images/blog/hello-markdown/cover.jpg"
imageAlt: "Green gradient placeholder cover art"
draft: false
---

This is a sample post that showcases what the blog can render. It exists so the
layout, the typography and the footnotes can be verified end to end[^1].

## What is supported

Most of what you would expect from GitHub-flavored Markdown:

- **Bold**, _italic_, ~~strikethrough~~ and `inline code`
- [Links](https://docs.astro.build) that follow the site theme
- Ordered and unordered lists

> Blockquotes are plain Markdown. They are styled with the page palette and
> need no special syntax.

### A small table

| Feature   | Supported |
| --------- | --------- |
| Footnotes | Yes       |
| Figures   | Yes       |
| Callouts  | No        |

### Some code

```js
const greeting = "Hello, world";
console.log(greeting);
```

## A captioned image

An image gets a caption when the Markdown title slot is set:

![Purple placeholder illustration](../../../assets/images/blog/hello-markdown/figure.png "The caption is read from the image title.")

## Footnotes

References collect at the bottom of the post, GitHub style.[^2]

[^1]: This footnote proves the GFM footnote pipeline is active.

[^2]: A second footnote, with a [link](https://example.com).
