// logger.js — Pino structured logger
// Usage: const logger = require("./logger");
//        req.log.info({ codeLength: 200 }, "Review requested");

const pino = require("pino");
const config = require("./config");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  // In development: pretty-printed, coloured output.
  // In production: raw JSON (ready for Datadog / Logtail / CloudWatch).
  transport:
    config.nodeEnv !== "production"
      ? { target: "pino-pretty", options: { colorize: true, translateTime: "SYS:HH:MM:ss" } }
      : undefined,
  // Always include these fields on every log line.
  base: { service: "snapcode-api", env: config.nodeEnv },
});

module.exports = logger;
