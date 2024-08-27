import { z } from "zod";

const articleSchema = z.object({
  source: z.object({ name: z.string(), id: z.string() }),
  author: z.string().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  urlToImage: z.string().optional().nullable(),
  publishedAt: z.string().datetime(),
  content: z.string().optional().nullable(),
})

const topHeadlinesSchema = z.object({
  status: z.literal("ok"),
  totalResults: z.number().int().positive(),
  articles: z.array(
    articleSchema
  ),
});

// const headlinesErrorSchema = z.object({ status: z.literal("error"), code: z.number(), message: z.string()})

type TopHeadlinesModel = z.infer<typeof topHeadlinesSchema>

export type ArticleModel = z.infer<typeof articleSchema>

export default TopHeadlinesModel;
