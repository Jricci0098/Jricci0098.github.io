import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(["completed", "in-progress", "concept"]),
    featured: z.boolean().default(false),
    /** Visual treatment key used to pick a local SVG/CSS art variant for the card + hero. */
    visual: z.enum(["azure-policy", "devsecops-pipeline", "ai-assistant", "homelab", "generic"]),
    tags: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    sourceUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    /** Optional override; when absent, reading time is calculated from word count. */
    readingTimeMinutes: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
