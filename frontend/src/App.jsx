import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient";
import hljs from "highlight.js";
import CodeEditor from "./components/CodeEditor";
import ReviewButton from "./components/ReviewButton";
import ReviewOutput from "./components/ReviewOutput";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HistorySidebar from "./components/HistorySidebar";
import FileUpload from "./components/FileUpload";
import GithubReview from "./components/GithubReview";
import Footer from "./components/Footer";


// Language detection: keyword heuristics first, hljs fallback
function detectLanguage(code) {
  if (!code || !code.trim()) return "javascript";

  // Deterministic heuristics (more reliable than hljs.highlightAuto)
  if (/#include\s*<(iostream|cmath|cstdio|vector|string|algorithm|map|set)>/.test(code) || /\bcout\b|\bcin\b|\bstd::/.test(code))
    return "cpp";
  if (/#include\s*<(stdio|stdlib|string)\.h>/.test(code) && !/cout/.test(code))
    return "c";
  if (/using\s+System;|namespace\s+\w+\s*{|Console\.Write/.test(code))
    return "csharp";
  if (/^\s*(def |import |from .+ import)/m.test(code))
    return "python";
  if (/public\s+class\s+\w+|System\.out\.println|import\s+java\./.test(code))
    return "java";
  if (/^\s*package\s+main|func\s+\w+\s*\(/m.test(code))
    return "go";
  if (/fn\s+\w+\s*\(|let\s+mut\s+|println!\(/.test(code))
    return "rust";
  if (/<!DOCTYPE html>|<html|<head>|<body>/i.test(code))
    return "html";
  if (/^\s*(SELECT|INSERT|UPDATE|CREATE TABLE|DROP TABLE)/mi.test(code))
    return "sql";

  // Fallback to hljs.highlightAuto
  try {
    const result = hljs.highlightAuto(code);
    const lang = result.language || "javascript";

    const languageMap = {
      'c++': 'cpp', 'c#': 'csharp', 'f#': 'fsharp',
      'js': 'javascript', 'ts': 'typescript', 'py': 'python',
      'rb': 'ruby', 'sh': 'shell', 'bash': 'shell', 'go': 'go',
      'rs': 'rust', 'rust': 'rust', 'java': 'java',
      'kt': 'kotlin', 'kotlin': 'kotlin', 'php': 'php',
      'swift': 'swift', 'html': 'html', 'xml': 'xml',
      'css': 'css', 'scss': 'scss', 'sql': 'sql', 'json': 'json',
      'yaml': 'yaml', 'yml': 'yaml', 'md': 'markdown', 'markdown': 'markdown'
    };

    // pgsql is a frequent false positive — don't trust it
    if (lang === 'pgsql') return "javascript";

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
  const [user, setUser] = useState(null);

  // "null" means show main app, "login" shows login, "signup" shows signup
  const [authPage, setAuthPage] = useState(null);
  const [showHistory, setShowHistory] = useState(false);


  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Auto-close login/signup screens if the user logs in successfully
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        setAuthPage(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

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
      const payload = {
        code: code,
        language: language,
        user_id: user ? user.id : null
      };

      // Get current JWT token from Supabase if user is logged in
      let config = {};
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      // Debug: verify token is being fetched
      console.log("TOKEN:", token);

      if (token) {
        config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      }

      const response = await axios.post("http://127.0.0.1:8000/review", payload, config);
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

      <Navbar
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setAuthPage("login")}
        onSignupClick={() => setAuthPage("signup")}
        onHomeClick={() => setAuthPage(null)}
        onHistoryClick={() => setShowHistory(true)}
      />

      {/* History Sidebar Overlay */}
      <HistorySidebar
        open={showHistory}
        onClose={() => setShowHistory(false)}
        user={user}
      />

      {authPage === "login" && (
        <div style={{ position: "relative", zIndex: 1 }}>
          <Login />
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={() => setAuthPage(null)}
              style={{ background: "transparent", border: "none", color: "#8b949e", cursor: "pointer", textDecoration: "underline" }}
            >
              Back to App
            </button>
          </div>
        </div>
      )}

      {authPage === "signup" && (
        <div style={{ position: "relative", zIndex: 1 }}>
          <Signup />
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={() => setAuthPage(null)}
              style={{ background: "transparent", border: "none", color: "#8b949e", cursor: "pointer", textDecoration: "underline" }}
            >
              Back to App
            </button>
          </div>
        </div>
      )}

      {/* Main Content — single-column layout */}
      {authPage === null && (
        <main style={{
          position: "relative", zIndex: 1,
          flex: 1,
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          padding: "24px 48px 48px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}>

          {/* Row: FileUpload + GithubReview URL input side-by-side */}
          <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>

            {/* File Upload card */}
            <div style={{
              background: "rgba(22,27,34,0.8)",
              border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: "10px",
              padding: "14px 18px",
              display: "flex", alignItems: "center", gap: "10px",
              flexShrink: 0,
            }}>
              <FileUpload setCode={setCode} setLanguage={setLanguage} />
            </div>

            {/* GitHub Review — compact inline form */}
            <div style={{
              flex: 1,
              background: "rgba(22,27,34,0.8)",
              border: "1px solid rgba(99,102,241,0.15)",
              borderRadius: "10px",
              padding: "14px 18px",
            }}>
              <GithubReview user={user} setReview={setReview} compact />
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "26px", height: "26px", background: "rgba(99,102,241,0.2)",
                  borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px"
                }}>📝</div>
                <span style={{ fontWeight: 700, fontSize: "13px", color: "#c9d1d9" }}>Source Code</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "#8b949e" }}>Auto-detected:</span>
                <span style={{
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                  padding: "2px 10px", borderRadius: "6px", fontSize: "12px", color: "#a5b4fc", fontWeight: 600
                }}>{language}</span>
              </div>
            </div>
            <CodeEditor code={code} setCode={setCode} language={language} height="420px" />
          </div>

          {/* Review button */}
          <div>
            <ReviewButton onReview={handleReview} loading={loading} />
          </div>

          {/* Review Output */}
          <ReviewOutput review={review} loading={loading} />

        </main>
      )}


      {/* Footer */}
      {authPage === null && <Footer />}

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
