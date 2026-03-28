// middleware/rateLimiter.js — per-route rate limiting configurations

const rateLimit = require("express-rate-limit");

function rateLimitHandler(_req, res) {
  res.status(429).json({
    success: false,
    status: 429,
    message: "Too many requests",
    error: "Rate limit exceeded. Please slow down and try again.",
  });
}

/** Broad limit applied to all routes (100 req / 15 min per IP). */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

/** Tighter limit for AI code review (20 req / 15 min per IP). */
const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

/** Strictest limit for GitHub repo review — slow and expensive (5 req / 15 min per IP). */
const githubReviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

module.exports = { generalLimiter, reviewLimiter, githubReviewLimiter };
