import { useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import ReactMarkdown from "react-markdown";

export default function GithubReview({ user, setReview }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const [showFiles, setShowFiles] = useState(false);

    const languageColors = {
        python: "#3572A5", javascript: "#f1e05a", typescript: "#2b7489",
        cpp: "#f34b7d", c: "#555555", csharp: "#178600", java: "#b07219",
        go: "#00ADD8", rust: "#dea584", html: "#e34c26", css: "#563d7c",
        default: "#6366f1"
    };
    const getLangColor = (lang) => languageColors[lang?.toLowerCase()] || languageColors.default;

    async function handleReview(e) {
        e.preventDefault();
        if (!repoUrl.trim()) return;

        setError("");
        setResult(null);
        setShowFiles(false);
        setLoading(true);

        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            const response = await axios.post("http://127.0.0.1:8000/github-review", {
                repo_url: repoUrl.trim(),
                user_id: currentUser?.id || user?.id || null
            });
            setResult(response.data);
            // Push the review text up to App so ReviewOutput renders it
            if (setReview && response.data?.review) {
                setReview(response.data.review);
            }
        } catch (err) {
            const detail = err.response?.data?.detail;
            if (err.response?.status === 404)
                setError("Repository not found. Is it public?");
            else if (err.response?.status === 429)
                setError("GitHub rate limit exceeded. Add a GITHUB_TOKEN to the backend .env.");
            else if (err.response?.status === 422)
                setError("No reviewable source code files found in this repository.");
            else
                setError(detail || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: "'Inter', sans-serif",
            color: "#e6edf3"
        }}>
            {/* Header */}
            <Box display="flex" alignItems="center" gap={1.5} mb={0.5}>
                <div style={{
                    width: "30px", height: "30px",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px"
                }}>🐙</div>
                <Typography fontWeight="800" sx={{
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}>
                    GitHub Repo Review
                </Typography>
            </Box>

            {/* URL Input */}
            <form onSubmit={handleReview}>
                <Box display="flex" gap={1.5} alignItems="center">
                    <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/owner/repo"
                        disabled={loading}
                        style={{
                            flex: 1,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            borderRadius: "8px",
                            padding: "10px 14px",
                            color: "#e6edf3",
                            fontSize: "14px",
                            fontFamily: "'Inter', sans-serif",
                            outline: "none",
                            transition: "border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                        onBlur={e => e.target.style.borderColor = "rgba(99,102,241,0.25)"}
                    />
                    <button
                        type="submit"
                        disabled={loading || !repoUrl.trim()}
                        style={{
                            background: loading ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.85)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: loading || !repoUrl.trim() ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "background 0.2s",
                            whiteSpace: "nowrap",
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={14} sx={{ color: "#fff" }} />
                                Analysing...
                            </>
                        ) : "⚡ Review Repo"}
                    </button>
                </Box>
            </form>

            {/* Error */}
            {error && (
                <Box sx={{
                    padding: "10px 14px",
                    background: "rgba(255,123,114,0.08)",
                    border: "1px solid rgba(255,123,114,0.25)",
                    borderRadius: "8px",
                    color: "#ff7b72",
                    fontSize: "13px"
                }}>
                    ⚠ {error}
                </Box>
            )}

            {/* Loading progress */}
            {loading && (
                <Box sx={{ color: "#8b949e", fontSize: "13px", display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={12} sx={{ color: "#6366f1" }} />
                    Checking cache, then fetching and analysing repo… this may take a moment.
                </Box>
            )}

            {/* Results */}
            {result && (
                <Box>
                    {/* Summary bar */}
                    <Box display="flex" alignItems="center" gap={2} mb={1.5} flexWrap="wrap">
                        {result.cached ? (
                            <Chip label="⚡ Cached" size="small" sx={{
                                background: "rgba(34,197,94,0.1)",
                                color: "#4ade80",
                                border: "1px solid rgba(34,197,94,0.25)",
                                fontWeight: 700, fontSize: "11px"
                            }} />
                        ) : (
                            <Typography variant="caption" color="#8b949e">
                                ✅ {result.files_reviewed} file{result.files_reviewed !== 1 ? "s" : ""} reviewed in 1 Gemini call
                            </Typography>
                        )}
                        <Chip
                            label={new URL(result.repo_url).pathname.slice(1)}
                            size="small"
                            sx={{
                                background: "rgba(99,102,241,0.1)",
                                color: "#a5b4fc",
                                border: "1px solid rgba(99,102,241,0.2)",
                                fontSize: "11px", fontWeight: 700
                            }}
                        />
                        <Typography
                            variant="caption"
                            color="#6366f1"
                            sx={{ cursor: "pointer", "&:hover": { color: "#a5b4fc" } }}
                            onClick={() => setShowFiles(f => !f)}
                        >
                            {showFiles ? "▲ Hide files" : "▼ Files included"}
                        </Typography>
                    </Box>

                    {/* File list (collapsible) */}
                    {showFiles && (
                        <Box sx={{
                            background: "rgba(10,12,20,0.8)",
                            border: "1px solid rgba(99,102,241,0.1)",
                            borderRadius: "8px",
                            padding: "10px 14px",
                            marginBottom: "12px",
                            maxHeight: "160px",
                            overflowY: "auto"
                        }}>
                            {result.file_paths.map((p, i) => (
                                <Typography key={i} variant="caption" color="#8b949e"
                                    sx={{ display: "block", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
                                    📄 {p}
                                </Typography>
                            ))}
                        </Box>
                    )}

                    {/* Unified review output */}
                    <Box sx={{
                        background: "rgba(22,27,34,0.8)",
                        border: "1px solid rgba(99,102,241,0.15)",
                        borderRadius: "10px",
                        padding: "18px",
                        fontSize: "13px", lineHeight: "1.75",
                        color: "#c9d1d9",
                        "& h1,h2,h3": { color: "#e6edf3", fontWeight: 800, fontSize: "15px", marginTop: "16px" },
                        "& strong": { color: "#e6edf3" },
                        "& code": {
                            background: "rgba(99,102,241,0.2)",
                            padding: "2px 6px", borderRadius: "4px",
                            fontFamily: "monospace", fontSize: "12px"
                        },
                        "& pre": {
                            background: "#010409", padding: "12px",
                            borderRadius: "6px", overflow: "auto"
                        },
                        "& ul, ol": { paddingLeft: "20px" },
                        "& p": { margin: "6px 0" }
                    }}>
                        <ReactMarkdown>{result.review}</ReactMarkdown>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
