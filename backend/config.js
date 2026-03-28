// config.js — single source of truth for all backend environment configuration
// Loaded once at startup; all other modules import from here rather than process.env directly.

require("dotenv").config();

const config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",

  geminiApiKey: process.env.GEMINI_API_KEY || null,

  supabaseUrl: process.env.SUPABASE_URL || null,
  supabaseKey: process.env.SUPABASE_KEY || null,

  githubToken: process.env.GITHUB_TOKEN || null,

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  sentryDsn: process.env.SENTRY_DSN || null,

  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisPassword: process.env.REDIS_PASSWORD || null,
};

// Warn on startup about missing vars — don't crash so partial dev setups still work.
const REQUIRED = {
  geminiApiKey: "GEMINI_API_KEY",
  supabaseUrl: "SUPABASE_URL",
  supabaseKey: "SUPABASE_KEY",
};

const missing = Object.entries(REQUIRED)
  .filter(([key]) => !config[key])
  .map(([, name]) => name);

if (missing.length > 0) {
  console.warn(`\n⚠  Missing env vars: ${missing.join(", ")}`);
  console.warn("   Set them in .env (see .env.example) and restart.\n");
}

module.exports = config;
