import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ReactMarkdown from "react-markdown";

export default function HistorySidebar({ open, onClose, user }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [filesExpanded, setFilesExpanded] = useState(new Set());

    useEffect(() => {
        if (open && user) {
            loadReviews();
        }
    }, [open, user]);

    async function loadReviews() {
        try {
            setLoading(true);
            setError("");
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
            day: "2-digit", month: "short",
            hour: "2-digit", minute: "2-digit"
        });
    }

    const languageColors = {
        python: "#3572A5", javascript: "#f1e05a", typescript: "#2b7489",
        cpp: "#f34b7d", csharp: "#178600", java: "#b07219", c: "#555555",
        go: "#00ADD8", rust: "#dea584", html: "#e34c26", css: "#563d7c",
        sql: "#e38c00", default: "#6366f1"
    };
    const getLangColor = (lang) => languageColors[lang?.toLowerCase()] || languageColors.default;

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed", inset: 0,
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(2px)",
                        zIndex: 200,
                        transition: "opacity 0.3s"
                    }}
                />
            )}

            {/* Sidebar Panel */}
            <Box sx={{
                position: "fixed",
                top: 0, right: 0,
                height: "100vh",
                width: "420px",
                background: "rgba(10, 12, 20,0.97)",
                backdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(99, 102, 241,0.2)",
                zIndex: 300,
                display: "flex",
                flexDirection: "column",
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.6)",
            }}>
                {/* Header */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 20px 16px",
                    borderBottom: "1px solid rgba(99, 102, 241,0.15)",
                    flexShrink: 0
                }}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <div style={{
                            width: "32px", height: "32px",
                            background: "rgba(99, 102, 241,0.15)",
                            border: "1px solid rgba(99, 102, 241,0.3)",
                            borderRadius: "8px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "16px"
                        }}>📋</div>
                        <Typography fontWeight="800" sx={{
                            background: "linear-gradient(135deg, #6366f1, #a855f7)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            Review History
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: "#8b949e",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            "&:hover": { color: "#e6edf3", background: "rgba(255,255,255,0.08)" }
                        }}
                    >
                        ✕
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>

                    {/* Loading */}
                    {loading && (
                        <Box display="flex" alignItems="center" gap={1.5} p={2}>
                            <CircularProgress size={16} sx={{ color: "#6366f1" }} />
                            <Typography variant="body2" color="#8b949e">Loading reviews...</Typography>
                        </Box>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <Box sx={{
                            padding: "12px 16px",
                            background: "rgba(255,123,114,0.08)",
                            border: "1px solid rgba(255,123,114,0.2)",
                            borderRadius: "8px", margin: "8px 0"
                        }}>
                            <Typography variant="body2" color="#ff7b72">{error}</Typography>
                        </Box>
                    )}

                    {/* Not Logged In */}
                    {!user && !loading && (
                        <Box sx={{ textAlign: "center", mt: 4, color: "#8b949e" }}>
                            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔒</div>
                            <Typography variant="body2">Log in to view your review history</Typography>
                        </Box>
                    )}

                    {/* Empty */}
                    {!loading && !error && user && reviews.length === 0 && (
                        <Box sx={{ textAlign: "center", mt: 6, color: "#8b949e" }}>
                            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗂️</div>
                            <Typography variant="body2" fontWeight="600" color="#e6edf3">No reviews yet</Typography>
                            <Typography variant="caption" mt={0.5} display="block">
                                Submit a code review to get started!
                            </Typography>
                        </Box>
                    )}

                    {/* Review Cards */}
                    {reviews.map((r, index) => {
                        const isGithubRepo = r.language === "github-repo";
                        let filePaths = [];
                        if (isGithubRepo) {
                            try { filePaths = JSON.parse(r.code)?.files || []; } catch { filePaths = []; }
                        }
                        const isExpanded = expanded === index;
                        const areFilesExpanded = filesExpanded.has(index);
                        const toggleFiles = (e) => {
                            e.stopPropagation();
                            setFilesExpanded(prev => {
                                const next = new Set(prev);
                                next.has(index) ? next.delete(index) : next.add(index);
                                return next;
                            });
                        };

                        return (
                            <Box
                                key={r.id}
                                sx={{
                                    background: isGithubRepo ? "rgba(16,22,34,0.9)" : "rgba(10, 12, 20,0.8)",
                                    border: isGithubRepo
                                        ? "1px solid rgba(99, 102, 241,0.22)"
                                        : "1px solid rgba(99, 102, 241,0.12)",
                                    borderRadius: "10px",
                                    marginBottom: "8px",
                                    overflow: "hidden",
                                    transition: "border-color 0.2s",
                                    "&:hover": { borderColor: "rgba(99, 102, 241,0.35)" }
                                }}
                            >
                                {/* Card Header */}
                                <Box
                                    onClick={() => setExpanded(isExpanded ? null : index)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 14px",
                                        cursor: "pointer",
                                        userSelect: "none",
                                        gap: 1
                                    }}
                                >
                                    <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
                                        {isGithubRepo ? (
                                            <>
                                                <span style={{ fontSize: "16px", flexShrink: 0 }}>🐙</span>
                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography variant="body2" color="#e6edf3" fontWeight={700} fontSize="12px">
                                                        GitHub Repo Review
                                                    </Typography>
                                                    {r.repo_url && (
                                                        <Typography variant="caption" color="#8b949e"
                                                            sx={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace", fontSize: "10px" }}>
                                                            {new URL(r.repo_url).pathname.slice(1)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Chip
                                                    label={r.language || "?"}
                                                    size="small"
                                                    sx={{
                                                        background: `${getLangColor(r.language)}22`,
                                                        color: getLangColor(r.language),
                                                        border: `1px solid ${getLangColor(r.language)}55`,
                                                        fontWeight: 700, fontSize: "10px",
                                                        textTransform: "uppercase", flexShrink: 0
                                                    }}
                                                />
                                                <Typography variant="body2" color="#e6edf3"
                                                    sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
                                                    {r.code?.split("\n")[0]?.trim() || "—"}
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1} sx={{ flexShrink: 0 }}>
                                        <Typography variant="caption" color="#8b949e" fontSize="11px">
                                            {formatDate(r.created_at)}
                                        </Typography>
                                        <span style={{
                                            color: "#8b949e", fontSize: "10px",
                                            transition: "transform 0.2s", display: "inline-block",
                                            transform: isExpanded ? "rotate(180deg)" : "none"
                                        }}>▼</span>
                                    </Box>
                                </Box>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <Box sx={{ borderTop: "1px solid rgba(99, 102, 241,0.1)" }}>

                                        {/* GITHUB REPO: file list dropdown + unified review */}
                                        {isGithubRepo ? (
                                            <Box sx={{ padding: "12px 14px 14px" }}>
                                                {/* Files dropdown */}
                                                {filePaths.length > 0 && (
                                                    <Box mb={1.5}>
                                                        <Box
                                                            display="flex" alignItems="center" gap={1}
                                                            onClick={toggleFiles}
                                                            sx={{ cursor: "pointer", mb: 0.5 }}
                                                        >
                                                            <Typography variant="caption" color="#6366f1" fontWeight={700} letterSpacing="0.5px" textTransform="uppercase">
                                                                📁 {filePaths.length} Files Reviewed
                                                            </Typography>
                                                            <span style={{ color: "#6366f1", fontSize: "9px", transition: "transform 0.2s", display: "inline-block", transform: areFilesExpanded ? "rotate(180deg)" : "none" }}>▼</span>
                                                        </Box>
                                                        {areFilesExpanded && (
                                                            <Box sx={{
                                                                background: "#010409",
                                                                border: "1px solid rgba(99, 102, 241,0.1)",
                                                                borderRadius: "6px",
                                                                padding: "8px 10px",
                                                                maxHeight: "140px", overflowY: "auto"
                                                            }}>
                                                                {filePaths.map((f, i) => (
                                                                    <Typography key={i} variant="caption" color="#8b949e"
                                                                        sx={{ display: "block", fontFamily: "monospace", lineHeight: 1.8, fontSize: "11px" }}>
                                                                        📄 {f}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                        )}
                                                    </Box>
                                                )}

                                                {/* Unified review */}
                                                <Typography variant="caption" color="#a855f7" fontWeight={700} letterSpacing="0.5px" textTransform="uppercase">
                                                    AI Review
                                                </Typography>
                                                <Box sx={{
                                                    mt: 0.5, background: "rgba(99, 102, 241,0.04)",
                                                    border: "1px solid rgba(99, 102, 241,0.1)",
                                                    borderRadius: "6px", padding: "10px",
                                                    maxHeight: "280px", overflowY: "auto",
                                                    fontSize: "12px", lineHeight: "1.6", color: "#e6edf3",
                                                    "& h1, h2, h3": { color: "#e6edf3", fontWeight: 700, fontSize: "13px" },
                                                    "& code": { background: "rgba(99, 102, 241,0.2)", padding: "1px 5px", borderRadius: "3px", fontFamily: "monospace", fontSize: "11px" },
                                                    "& pre": { background: "#010409", padding: "8px", borderRadius: "4px", overflow: "auto" },
                                                    "& p": { margin: "4px 0" }
                                                }}>
                                                    <ReactMarkdown>{r.review}</ReactMarkdown>
                                                </Box>
                                            </Box>
                                        ) : (
                                            /* NORMAL REVIEW: code snippet + review */
                                            <>
                                                <Box sx={{ padding: "12px 14px 0" }}>
                                                    <Typography variant="caption" color="#6366f1" fontWeight={700} letterSpacing="0.5px" textTransform="uppercase">Code</Typography>
                                                    <Box sx={{ mt: 0.5, background: "#010409", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "10px", maxHeight: "150px", overflowY: "auto" }}>
                                                        <pre style={{ margin: 0, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "#e6edf3", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                                            {r.code}
                                                        </pre>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ padding: "10px 14px 14px" }}>
                                                    <Typography variant="caption" color="#a855f7" fontWeight={700} letterSpacing="0.5px" textTransform="uppercase">AI Review</Typography>
                                                    <Box sx={{
                                                        mt: 0.5, background: "rgba(99, 102, 241,0.04)",
                                                        border: "1px solid rgba(99, 102, 241,0.1)",
                                                        borderRadius: "6px", padding: "10px",
                                                        maxHeight: "200px", overflowY: "auto",
                                                        fontSize: "12px", lineHeight: "1.6", color: "#e6edf3",
                                                        "& h1, h2, h3": { color: "#e6edf3", fontWeight: 700, fontSize: "13px" },
                                                        "& code": { background: "rgba(99, 102, 241,0.2)", padding: "1px 5px", borderRadius: "3px", fontFamily: "monospace", fontSize: "11px" },
                                                        "& pre": { background: "#010409", padding: "8px", borderRadius: "4px", overflow: "auto" },
                                                        "& p": { margin: "4px 0" }
                                                    }}>
                                                        <ReactMarkdown>{r.review}</ReactMarkdown>
                                                    </Box>
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        );
                    })}

                </Box>

                {/* Footer */}
                <Box sx={{
                    padding: "12px 16px",
                    borderTop: "1px solid rgba(99, 102, 241,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexShrink: 0
                }}>
                    <Typography variant="caption" color="#8b949e">
                        {reviews.length} review{reviews.length !== 1 ? "s" : ""} total
                    </Typography>
                    <Typography
                        variant="caption"
                        color="#6366f1"
                        sx={{ cursor: "pointer", "&:hover": { color: "#e6edf3" } }}
                        onClick={loadReviews}
                    >
                        ↻ Refresh
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
