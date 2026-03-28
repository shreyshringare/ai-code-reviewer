// middleware/validate.js — Zod-based request validation middleware factory

const { z } = require("zod");

/**
 * Validates req.body against a Zod schema.
 * On failure: 400 with { success, status, message, error }.
 * On success: replaces req.body with the parsed (coerced) value and calls next().
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.errors
        .map((e) => `${e.path.join(".") || "body"}: ${e.message}`)
        .join("; ");
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation failed",
        error,
      });
    }
    req.body = result.data;
    next();
  };
}

/**
 * Validates req.query against a Zod schema.
 * On failure: 400. On success: replaces req.query with parsed value.
 */
function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const error = result.error.errors
        .map((e) => `${e.path.join(".") || "query"}: ${e.message}`)
        .join("; ");
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid query parameters",
        error,
      });
    }
    req.query = result.data;
    next();
  };
}

// ── Schemas ──────────────────────────────────────────────────────────────────

const reviewSchema = z.object({
  code: z
    .string({ required_error: "code is required" })
    .min(1, "Code cannot be empty")
    .max(100_000, "Code exceeds the 100,000 character limit"),
  language: z.string().max(50).optional().default("javascript"),
});

const githubReviewSchema = z.object({
  repo_url: z
    .string({ required_error: "repo_url is required" })
    .url("Must be a valid URL")
    .regex(
      /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+/,
      "Must be a valid GitHub repository URL (https://github.com/owner/repo)"
    ),
});

const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  page: z.coerce.number().int().min(1).optional().default(1),
});

module.exports = { validate, validateQuery, reviewSchema, githubReviewSchema, paginationQuerySchema };
