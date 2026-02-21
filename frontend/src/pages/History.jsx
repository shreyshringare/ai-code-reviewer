import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ReactMarkdown from "react-markdown";

export default function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        loadReviews();
    }, []);

    async function loadReviews() {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setError("You must be logged in to view your review history.");
                return;
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/reviews?user_id=${user.id}`
            );

            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                setError(response.data.error || "Failed to load reviews.");
            }
        } catch (err) {
            console.error(err);
            setError("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    function formatDate(isoString) {
        if (!isoString) return "";
        const d = new Date(isoString);
        return d.toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    }

    const languageColors = {
        python: "#3572A5",
        javascript: "#f1e05a",
        typescript: "#2b7489",
        cpp: "#f34b7d",
        csharp: "#178600",
        java: "#b07219",
        go: "#00ADD8",
        rust: "#dea584",
        html: "#e34c26",
        css: "#563d7c",
        sql: "#e38c00",
        default: "#6366f1"
    };

    const getLangColor = (lang) => languageColors[lang?.toLowerCase()] || languageColors.default;

    return (
        <Box sx={{
            minHeight: "100vh",
            backgroundColor: "#0a0c14",
            color: "#e6edf3",
            fontFamily: "'Inter', sans-serif",
            padding: "40px 48px",
            position: "relative",
            zIndex: 1
        }}>
            {/* Header */}
            <Box sx={{ marginBottom: "32px" }}>
                <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                    <div style={{
                        width: "36px", height: "36px",
                        background: "rgba(99, 102, 241,0.15)",
                        border: "1px solid rgba(99, 102, 241,0.3)",
                        borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px"
                    }}>📋</div>
                    <Typography variant="h5" fontWeight="800" sx={{
                        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        Review History
                    </Typography>
                </Box>
                <Typography variant="body2" color="#8b949e">
                    Your past code reviews, ordered by most recent
                </Typography>
            </Box>

            {/* Loading State */}
            {loading && (
                <Box display="flex" alignItems="center" gap={2} mt={4}>
                    <CircularProgress size={20} sx={{ color: "#6366f1" }} />
                    <Typography color="#8b949e">Loading your reviews...</Typography>
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Alert severity="error" sx={{ borderRadius: "8px", maxWidth: "500px" }}>
                    {error}
                </Alert>
            )}

            {/* Empty State */}
            {!loading && !error && reviews.length === 0 && (
                <Box sx={{
                    textAlign: "center", marginTop: "80px",
                    color: "#8b949e"
                }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗂️</div>
                    <Typography variant="h6" fontWeight="600" color="#e6edf3">No reviews yet</Typography>
                    <Typography variant="body2" mt={1}>
                        Submit your first code review from the home page!
                    </Typography>
                </Box>
            )}

            {/* Review Cards */}
            {reviews.map((r, index) => (
                <Box
                    key={r.id}
                    sx={{
                        background: "rgba(10, 12, 20,0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(99, 102, 241,0.15)",
                        borderRadius: "12px",
                        marginBottom: "16px",
                        overflow: "hidden",
                        transition: "border-color 0.2s",
                        "&:hover": { borderColor: "rgba(99, 102, 241,0.35)" }
                    }}
                >
                    {/* Card Header */}
                    <Box
                        onClick={() => setExpanded(expanded === index ? null : index)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px 20px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <Chip
                                label={r.language || "unknown"}
                                size="small"
                                sx={{
                                    background: `${getLangColor(r.language)}22`,
                                    color: getLangColor(r.language),
                                    border: `1px solid ${getLangColor(r.language)}44`,
                                    fontWeight: 700,
                                    fontSize: "11px",
                                    textTransform: "uppercase"
                                }}
                            />
                            <Typography
                                variant="body2"
                                color="#e6edf3"
                                sx={{
                                    maxWidth: "400px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontSize: "13px",
                                    fontFamily: "'JetBrains Mono', monospace"
                                }}
                            >
                                {r.code?.split("\n")[0]?.trim() || "—"}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="caption" color="#8b949e">
                                {formatDate(r.created_at)}
                            </Typography>
                            <span style={{ color: "#8b949e", fontSize: "12px", transition: "transform 0.2s", display: "inline-block", transform: expanded === index ? "rotate(180deg)" : "none" }}>▼</span>
                        </Box>
                    </Box>

                    {/* Expanded Content */}
                    {expanded === index && (
                        <Box sx={{ borderTop: "1px solid rgba(99, 102, 241,0.1)" }}>
                            {/* Code */}
                            <Box sx={{ padding: "16px 20px" }}>
                                <Typography variant="caption" color="#8b949e" sx={{ fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                                    Code
                                </Typography>
                                <Box sx={{
                                    mt: 1, background: "#010409",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: "8px", padding: "16px",
                                    overflow: "auto", maxHeight: "250px"
                                }}>
                                    <pre style={{
                                        margin: 0, fontSize: "13px",
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        color: "#e6edf3", whiteSpace: "pre-wrap",
                                        wordBreak: "break-word"
                                    }}>
                                        {r.code}
                                    </pre>
                                </Box>
                            </Box>

                            {/* Review */}
                            <Box sx={{ padding: "0 20px 20px" }}>
                                <Typography variant="caption" color="#8b949e" sx={{ fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                                    AI Review
                                </Typography>
                                <Box sx={{
                                    mt: 1, background: "rgba(99, 102, 241,0.04)",
                                    border: "1px solid rgba(99, 102, 241,0.1)",
                                    borderRadius: "8px", padding: "16px",
                                    fontSize: "14px", lineHeight: "1.7",
                                    color: "#e6edf3",
                                    "& h1, h2, h3": { color: "#e6edf3", fontWeight: 700 },
                                    "& code": {
                                        background: "rgba(99, 102, 241,0.2)",
                                        padding: "2px 6px", borderRadius: "4px",
                                        fontFamily: "monospace"
                                    },
                                    "& pre": {
                                        background: "#010409", padding: "12px",
                                        borderRadius: "6px", overflow: "auto"
                                    }
                                }}>
                                    <ReactMarkdown>{r.review}</ReactMarkdown>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
}
