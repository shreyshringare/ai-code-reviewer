import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

export default function ReviewOutput({ review, loading }) {

    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        if (!review) return;
        try {
            await navigator.clipboard.writeText(review);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: "520px",
            borderRadius: "12px",
            border: "1px solid rgba(99, 102, 241,0.2)",
            background: "rgba(10, 12, 20,0.7)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
            transition: "border-color 0.3s ease",
        }}>

            {/* Panel header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: "1px solid rgba(99, 102, 241,0.15)",
                background: "rgba(99, 102, 241,0.06)",
                flexShrink: 0,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "28px", height: "28px",
                        background: "rgba(168, 85, 247,0.2)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px",
                    }}>🤖</div>
                    <span style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#e6edf3",
                        letterSpacing: "0.3px",
                    }}>
                        AI Review Results
                    </span>

                    {review && !loading && (
                        <span style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#4ade80",
                            background: "rgba(74,222,128,0.1)",
                            border: "1px solid rgba(74,222,128,0.2)",
                            padding: "2px 8px",
                            borderRadius: "100px",
                            letterSpacing: "0.5px",
                        }}>
                            READY
                        </span>
                    )}

                    {loading && (
                        <span style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#f59e0b",
                            background: "rgba(245,158,11,0.1)",
                            border: "1px solid rgba(245,158,11,0.2)",
                            padding: "2px 8px",
                            borderRadius: "100px",
                            letterSpacing: "0.5px",
                        }}>
                            ANALYZING…
                        </span>
                    )}
                </div>

                <Tooltip title={copied ? "Copied!" : "Copy review"}>
                    <span>
                        <IconButton
                            onClick={handleCopy}
                            disabled={!review}
                            size="small"
                            sx={{
                                color: copied ? "#4ade80" : "#555",
                                background: copied
                                    ? "rgba(74,222,128,0.1)"
                                    : "rgba(255,255,255,0.04)",
                                border: "1px solid",
                                borderColor: copied
                                    ? "rgba(74,222,128,0.3)"
                                    : "rgba(255,255,255,0.06)",
                                borderRadius: "8px",
                                "&:hover": {
                                    color: "#e6edf3",
                                    background: "rgba(255,255,255,0.08)",
                                },
                                transition: "all 0.2s ease",
                            }}
                        >
                            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                scrollbarWidth: "thin",
                scrollbarColor: "#333 transparent",
            }}>

                {loading ? (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        gap: "20px",
                        minHeight: "300px",
                    }}>
                        {/* Animated spinner */}
                        <div style={{
                            width: "48px", height: "48px",
                            borderRadius: "50%",
                            border: "3px solid rgba(99, 102, 241,0.15)",
                            borderTop: "3px solid #6366f1",
                            animation: "spin 1s linear infinite",
                        }} />
                        <div style={{ textAlign: "center" }}>
                            <p style={{ margin: "0 0 6px", color: "#e6edf3", fontWeight: 600, fontSize: "15px" }}>
                                Analyzing your code...
                            </p>
                            <p style={{ margin: 0, color: "#8b949e", fontSize: "13px" }}>
                                Gemini AI is reviewing for bugs, optimizations & best practices
                            </p>
                        </div>
                    </div>

                ) : review ? (

                    <div className="markdown-body" style={{
                        color: "#d4d4d4",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {review}
                        </ReactMarkdown>
                    </div>

                ) : (

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        minHeight: "300px",
                        gap: "16px",
                        textAlign: "center",
                    }}>
                        {/* Icon decoration */}
                        <div style={{
                            width: "72px", height: "72px",
                            background: "rgba(99, 102, 241,0.08)",
                            border: "1px solid rgba(99, 102, 241,0.2)",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                        }}>
                            🔍
                        </div>
                        <div>
                            <p style={{ margin: "0 0 8px", color: "#8b949e", fontSize: "15px", fontWeight: 600 }}>
                                Ready for Review
                            </p>
                            <p style={{ margin: 0, color: "#555", fontSize: "13px", lineHeight: 1.6 }}>
                                Paste your code on the left and click<br />
                                <strong style={{ color: "#e6edf3" }}>✨ Review Code</strong> to get started
                            </p>
                        </div>

                        {/* Feature chips */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
                            {["🐛 Bug Detection", "⚡ Performance", "🔒 Security", "✅ Best Practices"].map(tag => (
                                <span key={tag} style={{
                                    fontSize: "11px",
                                    color: "#6b7280",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    fontWeight: 500,
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Spin animation and Markdown Styles */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #555; }
                
                /* Markdown Styling */
                .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 {
                    color: #fff;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    font-weight: 600;
                }
                .markdown-body h1 { fontSize: 1.5em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.3em; }
                .markdown-body h2 { fontSize: 1.3em; }
                .markdown-body h3 { fontSize: 1.1em; }
                .markdown-body p { margin-bottom: 1em; }
                .markdown-body ul, .markdown-body ol { margin-bottom: 1em; padding-left: 2em; }
                .markdown-body li { margin-bottom: 0.25em; }
                .markdown-body code {
                    background: rgba(99, 102, 241,0.15);
                    color: #e6edf3;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-family: 'Fira Code', monospace;
                    font-size: 0.9em;
                }
                .markdown-body pre {
                    background: #1e1e1e !important;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 16px !important;
                    overflow-x: auto;
                    margin-bottom: 1.5em;
                }
                .markdown-body pre code {
                    background: transparent;
                    color: inherit;
                    padding: 0;
                    font-size: 0.9em;
                    border-radius: 0;
                }
                /* Adjust highlight.js theme */
                .hljs { background: transparent !important; padding: 0 !important; }
            `}</style>
        </div>
    );
}
