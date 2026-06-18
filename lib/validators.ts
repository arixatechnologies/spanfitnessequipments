import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,20}$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email.").or(z.literal("")),
  requirement: z.string().trim().min(2).max(160),
  message: z.string().trim().max(2000).default(""),
  productId: z.string().uuid().optional().or(z.literal("")),
  sourcePage: z.string().trim().max(300).default("/"),
  website: z.string().max(0, "Spam detected.").optional().default("")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(5, "Enter a title with at least 5 characters.").max(180, "Keep the title within 180 characters."),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use only lowercase letters, numbers and hyphens."),
  excerpt: z.string().trim().min(20, "Enter an excerpt with at least 20 characters.").max(500, "Keep the excerpt within 500 characters."),
  content: z.string().trim().min(100, "Enter blog content with at least 100 characters."),
  status: z.enum(["draft", "published"]),
  metaTitle: z.string().trim().max(70, "Keep the SEO title within 70 characters.").optional(),
  metaDescription: z.string().trim().max(170, "Keep the SEO description within 170 characters.").optional()
});
