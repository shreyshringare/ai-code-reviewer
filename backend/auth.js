// auth.js — JWT authentication middleware

const { createRemoteJWKSet, jwtVerify } = require("jose");
const config = require("./config");

// Lazily initialised — requires config.supabaseUrl to be set.
let _jwks = null;
function getJWKS() {
  if (!_jwks) {
    _jwks = createRemoteJWKSet(
      new URL(`${config.supabaseUrl}/auth/v1/.well-known/jwks.json`)
    );
  }
  return _jwks;
}

/**
 * Extracts the user ID (sub claim) from a Supabase Bearer token.
 * Returns null if the token is absent, invalid, or expired — never throws.
 */
async function getUserIdFromToken(authorizationHeader) {
  if (!authorizationHeader) return null;
  if (!config.supabaseUrl) {
    console.warn("AUTH: SUPABASE_URL is not configured");
    return null;
  }
  try {
    const token = authorizationHeader.replace(/^Bearer\s+/i, "");
    const { payload } = await jwtVerify(token, getJWKS());
    return payload.sub || null;
  } catch {
    // Expired / invalid token — treat as unauthenticated, not an error
    return null;
  }
}

/** Requires a valid JWT. Sets req.user_id or returns 401. */
async function requireAuth(req, res, next) {
  const userId = await getUserIdFromToken(req.headers.authorization);
  if (!userId) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Unauthorized",
      error: "A valid authentication token is required.",
    });
  }
  req.user_id = userId;
  next();
}

/** Optionally parses a JWT if present. Sets req.user_id (UUID or null). Never rejects. */
async function optionalAuth(req, res, next) {
  req.user_id = await getUserIdFromToken(req.headers.authorization);
  next();
}

module.exports = { getUserIdFromToken, requireAuth, optionalAuth };
