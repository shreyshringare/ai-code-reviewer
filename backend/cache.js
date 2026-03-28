// cache.js — Redis-backed cache for AI review responses
//
// Every successful AI review is stored for 6 hours keyed by a hash of the
// submitted code.  Cache misses and Redis errors are always non-fatal so the
// app degrades gracefully when Redis is unavailable.

const { createClient } = require("redis");
const config = require("./config");
const logger = require("./logger");

const client = createClient({
  socket: {
    host: config.redisHost,
    port: config.redisPort,
    reconnectStrategy: (retries) => Math.min(retries * 500, 5_000),
  },
  ...(config.redisPassword ? { password: config.redisPassword } : {}),
});

client.on("error", (err) =>
  logger.warn({ err: err.message }, "Redis cache error (non-fatal)")
);

// Connect once at module load; don't crash the server if Redis is unreachable.
client.connect().catch((err) =>
  logger.warn({ err: err.message }, "Redis unavailable — caching disabled")
);

const REVIEW_TTL_SECONDS = 6 * 60 * 60; // 6 hours

/**
 * A fast, collision-resistant integer hash of a string.
 * Used to produce a compact Redis key without storing 100 KB of code as a key.
 */
function hashCode(str) {
  let h = 0x811c9dc5; // FNV-1a 32-bit offset basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (Math.imul(h, 0x01000193)) >>> 0; // FNV prime, keep unsigned
  }
  return h.toString(16);
}

/**
 * Returns the cached review string for this code, or null on miss / error.
 */
async function getCachedReview(code) {
  try {
    if (!client.isReady) return null;
    const value = await client.get(`review:${hashCode(code)}`);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    logger.warn({ err: err.message }, "Cache GET failed — proceeding without cache");
    return null;
  }
}

/**
 * Stores a review in Redis with a 6-hour TTL.  Fire-and-forget — never throws.
 */
async function setCachedReview(code, review) {
  try {
    if (!client.isReady) return;
    await client.setEx(
      `review:${hashCode(code)}`,
      REVIEW_TTL_SECONDS,
      JSON.stringify(review)
    );
  } catch (err) {
    logger.warn({ err: err.message }, "Cache SET failed — review not cached");
  }
}

module.exports = { getCachedReview, setCachedReview };
