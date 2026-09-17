import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      icons: z.array(z.string()),
      demoVideo: z
        .object({
          mp4: z.string(),
          webm: z.string(),
        })
        .optional(),
      url: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((data) => !data.image || data.imageAlt, {
        message: "`imageAlt` is required when `image` is set.",
        path: ["imageAlt"],
      }),
});

export const collections = { experience, projects, blog };
