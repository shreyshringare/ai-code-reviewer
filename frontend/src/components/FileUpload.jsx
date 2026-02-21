import { useState, useRef } from "react";
import Typography from "@mui/material/Typography";

const EXT_LANGUAGE_MAP = {
    js: "javascript", jsx: "javascript",
    ts: "typescript", tsx: "typescript",
    py: "python",
    cpp: "cpp", cc: "cpp", cxx: "cpp",
    c: "c",
    cs: "csharp",
    java: "java",
    go: "go",
    rs: "rust",
    kt: "kotlin",
    php: "php",
    rb: "ruby",
    swift: "swift",
    html: "html", htm: "html",
    css: "css",
    scss: "scss",
    json: "json",
    yaml: "yaml", yml: "yaml",
    xml: "xml",
    sql: "sql",
    md: "markdown",
    sh: "shell", bash: "shell"
};

const ALLOWED_EXTENSIONS = [
    ".js", ".ts", ".jsx", ".tsx",
    ".py", ".cpp", ".c", ".cs",
    ".java", ".go", ".rs", ".kt",
    ".php", ".rb", ".swift",
    ".html", ".css", ".scss",
    ".json", ".yaml", ".yml",
    ".xml", ".sql", ".md", ".sh"
];

const MAX_FILE_SIZE_MB = 1;

export default function FileUpload({ setCode, setLanguage }) {
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [fileError, setFileError] = useState("");
    const inputRef = useRef(null);

    function processFile(file) {
        if (!file) return;

        setFileError("");
        setFileName(null);

        const name = file.name.toLowerCase();
        const ext = name.split(".").pop();
        const isAllowed = ALLOWED_EXTENSIONS.some(e => name.endsWith(e));

        if (!isAllowed) {
            setFileError(`Unsupported file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`);
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setFileError(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setCode(e.target.result);
            setFileName(file.name);
            // Set language from file extension immediately
            if (setLanguage && EXT_LANGUAGE_MAP[ext]) {
                setLanguage(EXT_LANGUAGE_MAP[ext]);
            }
        };
        reader.onerror = () => setFileError("Error reading file.");
        reader.readAsText(file);
    }

    function handleFileChange(e) {
        processFile(e.target.files[0]);
        // Reset input so same file can be re-uploaded
        e.target.value = "";
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);
        processFile(e.dataTransfer.files[0]);
    }

    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave() {
        setDragging(false);
    }

    return (
        <div>
            <div
                onClick={() => inputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 16px",
                    borderRadius: "8px",
                    border: dragging
                        ? "1px solid rgba(99,102,241,0.7)"
                        : "1px solid rgba(99,102,241,0.25)",
                    background: dragging
                        ? "rgba(99,102,241,0.12)"
                        : "rgba(99,102,241,0.06)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    userSelect: "none",
                    color: "#a5b4fc",
                    fontSize: "13px",
                    fontWeight: "600",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap",
                    boxShadow: dragging ? "0 0 12px rgba(99,102,241,0.2)" : "none"
                }}
            >
                <span style={{ fontSize: "15px" }}>📁</span>
                {fileName ? (
                    <span style={{
                        maxWidth: "120px", overflow: "hidden",
                        textOverflow: "ellipsis", color: "#c9d1d9"
                    }}>
                        {fileName}
                    </span>
                ) : (
                    <span>Upload File</span>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={ALLOWED_EXTENSIONS.join(",")}
                    onChange={handleFileChange}
                />
            </div>

            {fileError && (
                <Typography
                    variant="caption"
                    color="#ff7b72"
                    sx={{ display: "block", marginTop: "6px", maxWidth: "200px" }}
                >
                    ⚠ {fileError}
                </Typography>
            )}
        </div>
    );
}
