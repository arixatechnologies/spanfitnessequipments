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
  title: z.string().trim().min(5).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(20).max(500),
  content: z.string().trim().min(100),
  status: z.enum(["draft", "published"]),
  metaTitle: z.string().trim().max(70).optional(),
  metaDescription: z.string().trim().max(170).optional()
});
