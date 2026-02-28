import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().default(""),
    minutes: z.number().default(1),
  }),
});

export const collections = { blog };
