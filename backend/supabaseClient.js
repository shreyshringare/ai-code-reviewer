// supabaseClient.js — Supabase persistence layer

const { createClient } = require("@supabase/supabase-js");
const config = require("./config");

let supabase = null;
if (config.supabaseUrl && config.supabaseKey) {
  supabase = createClient(config.supabaseUrl, config.supabaseKey);
} else {
  console.warn("⚠  Supabase credentials not set — database features will be unavailable.");
}

function requireSupabase() {
  if (!supabase) throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_KEY in .env.");
  return supabase;
}

/**
 * Inserts a review record into the "reviews" table.
 * Throws on database error.
 */
async function saveReview({ code, review, language, userId = null, repoUrl = null }) {
  const row = { code, review, language, user_id: userId };
  if (repoUrl) row.repo_url = repoUrl;

  const { data, error } = await requireSupabase().from("reviews").insert(row).select();
  if (error) throw error;
  return data;
}

/**
 * Fetches a paginated list of reviews for a user, most recent first.
 * Returns { reviews, total, page, limit, totalPages }.
 */
async function getUserReviews(userId, { limit = 20, page = 1 } = {}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await requireSupabase()
    .from("reviews")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return {
    reviews: data || [],
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  };
}

/**
 * Returns the most recent cached review for a GitHub repo URL, or null if none.
 */
async function getCachedRepoReview(repoUrl, userId = null) {
  let query = requireSupabase()
    .from("reviews")
    .select("*")
    .eq("language", "github-repo")
    .eq("repo_url", repoUrl)
    .order("created_at", { ascending: false })
    .limit(1);

  if (userId) query = query.eq("user_id", userId);

  const { data, error } = await query;
  if (error) throw error;
  return data?.[0] ?? null;
}

module.exports = { saveReview, getUserReviews, getCachedRepoReview };
