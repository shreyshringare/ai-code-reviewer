import Editor from "@monaco-editor/react";

export default function CodeEditor({
    code,
    setCode,
    language,
    height = "100%"
}) {

    function handleEditorChange(value) {
        setCode(value || "");
    }

    return (
        <div style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid rgba(99,102,241,0.25)",
            height: height,
            minHeight: "420px",
            background: "#0d1117",
            boxShadow: "inset 0 2px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)",
            transition: "border-color 0.3s ease",
        }}
            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(99,102,241,0.6)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"}
        >
            <Editor
                height={height === "100%" ? "100%" : height}
                language={language}
                theme="vs-dark"
                value={code || ""}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    fontLigatures: true,
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    automaticLayout: true,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "gutter",
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: true,
                }}
            />
        </div>
    );
}
