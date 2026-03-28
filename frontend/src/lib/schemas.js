import { z } from 'zod';

export const CategorySchema = z.enum(["Security", "Reliability", "Performance", "Hygiene", "Architecture", "Style"]);

export const SeveritySchema = z.enum(["Critical", "High", "Medium", "Low"]);

export const FindingSchema = z.object({
  id: z.string(),
  category: CategorySchema,
  severity: SeveritySchema,
  file_path: z.string(),
  line_start: z.number().optional(),
  line_end: z.number().optional(),
  title: z.string(),
  description: z.string(),
  suggested_patch: z.string().optional(),
});

export const ReviewReportSchema = z.object({
  global_score: z.number().min(0).max(100),
  security_score: z.number().min(0).max(100),
  reliability_score: z.number().min(0).max(100),
  performance_score: z.number().min(0).max(100),
  hygiene_score: z.number().min(0).max(100),
  ai_summary: z.array(z.string()),
  findings: z.array(FindingSchema),
});

export const CustomRuleSchema = z.object({
  version: z.string().default("2.1"),
  name: z.string(),
  scope: z.object({
    paths: z.array(z.string()),
  }),
  rules: z.array(z.object({
    pattern: z.string().optional(),
    disallow: z.array(z.string()).optional(),
    when: z.string().optional(),
    reason: z.string(),
    severity: z.string().optional(),
  })),
});
