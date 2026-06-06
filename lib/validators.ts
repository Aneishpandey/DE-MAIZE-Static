import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
})

export const serviceSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  fullDescription: z.string().min(1),
  features: z.array(z.string()),
  technologies: z.array(z.string()),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
})

export const projectSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  fullDescription: z.string().min(1),
  imageUrl: z.string().nullable().optional(),
  gradient: z.string().nullable().optional(),
  client: z.string().min(1),
  duration: z.string().min(1),
  results: z.array(z.string()),
  technologies: z.array(z.string()),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
})

export const blogPostSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  publishedAt: z.string().datetime().or(z.string().min(1)),
  readTime: z.string().min(1),
  gradient: z.string().min(1),
  author: z.string().min(1),
  authorRole: z.string().min(1),
  isPublished: z.boolean().default(true),
})

export const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  gradient: z.string().min(1),
  linkedinUrl: z.string().nullable().optional(),
  twitterUrl: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
})

export const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  content: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
})

export const siteStatSchema = z.object({
  value: z.number().int().min(0),
  label: z.string().min(1),
  suffix: z.string().default(''),
  sortOrder: z.number().int().default(0),
})

export const processStepSchema = z.object({
  stepNumber: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  sortOrder: z.number().int().default(0),
})

export const navigationSchema = z.object({
  location: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
})

export const sectionSchema = z.object({
  sectionKey: z.string().min(1),
  badge: z.string().nullable().optional(),
  heading: z.string().nullable().optional(),
  subheading: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  ctaPrimaryLabel: z.string().nullable().optional(),
  ctaPrimaryUrl: z.string().nullable().optional(),
  ctaSecondaryLabel: z.string().nullable().optional(),
  ctaSecondaryUrl: z.string().nullable().optional(),
  extra: z.record(z.string(), z.unknown()).nullable().optional(),
})

export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
})
