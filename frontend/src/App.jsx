import { useState, useEffect } from "react";
import axios from "axios";
import hljs from "highlight.js";
import CodeEditor from "./components/CodeEditor";
import ReviewButton from "./components/ReviewButton";
import ReviewOutput from "./components/ReviewOutput";

// Language detection function using highlight.js
function detectLanguage(code) {
  if (!code || !code.trim()) return "javascript";

  try {
    const result = hljs.highlightAuto(code);
    const lang = result.language || "javascript";

    // Map highlight.js languages to Monaco editor languages where they differ
    const languageMap = {
      'c++': 'cpp',
      'c#': 'csharp',
      'f#': 'fsharp',
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'rb': 'ruby',
      'sh': 'shell',
      'bash': 'shell'
    };

    return languageMap[lang] || lang;
  } catch (err) {
    console.error("Language detection error:", err);
    return "javascript";
  }
}

export default function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setLanguage(detectLanguage(code));
  }, [code]);

  async function handleReview() {
    if (!code.trim()) {
      alert("Please enter code first.");
      return;
    }
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/review", { code });
      setReview(response.data.review);
    } catch (error) {
      console.error("API Error:", error);
      setReview("Error reviewing code. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0c14",
      color: "#e6edf3",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Ambient background blobs */}
      <div style={{
        position: "fixed", inset: 0, overflow: "hidden",
        pointerEvents: "none", zIndex: 0
      }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          top: "-150px", left: "-100px", borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)",
          bottom: "-100px", right: "-100px", borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          top: "40%", left: "45%", borderRadius: "50%"
        }} />
      </div>

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 1,
        padding: "32px 48px 0",
        textAlign: "center"
      }}>
        <h1 style={{
          margin: "0 0 12px",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          letterSpacing: "-2px",
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
        }}>
          AI Code Reviewer
        </h1>

        <p style={{
          margin: "0 auto 32px",
          fontSize: "16px",
          color: "#8b949e",
          maxWidth: "520px",
          lineHeight: 1.6,
        }}>
          Paste your code below to instantly find bugs, security flaws,<br />
          and performance optimizations — powered by AI.
        </p>



        {/* Divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 50%, transparent)",
          margin: "0 -48px"
        }} />
      </header>

      {/* Main two-column layout */}
      <main style={{
        position: "relative", zIndex: 1,
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        padding: "0",
        minHeight: "calc(100vh - 260px)",
      }}>

        {/* LEFT PANEL — Code Editor */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          padding: "28px 24px 28px 48px",
          borderRight: "1px solid rgba(99,102,241,0.15)",
        }}>
          {/* Panel header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "28px", height: "28px",
                background: "rgba(99,102,241,0.2)",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px",
              }}>📝</div>
              <span style={{ fontWeight: 700, fontSize: "14px", color: "#c9d1d9", letterSpacing: "0.3px" }}>
                Source Code
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#8b949e" }}>Auto-detected:</span>
              <span style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                padding: "3px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#a5b4fc",
                fontWeight: 600,
              }}>
                {language}
              </span>
            </div>
          </div>

          {/* Editor */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              height="100%"
            />
          </div>

          {/* Review button */}
          <div style={{ marginTop: "20px" }}>
            <ReviewButton onReview={handleReview} loading={loading} />
          </div>
        </div>

        {/* RIGHT PANEL — Review Output */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          padding: "28px 48px 28px 24px",
        }}>
          <ReviewOutput review={review} loading={loading} />
        </div>

      </main>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
