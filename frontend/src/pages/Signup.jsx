import { useState } from "react";
import { supabase } from "../supabaseClient";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSignup(e) {
        // Prevent page reload on form submit
        e.preventDefault();

        setError("");
        setSuccess("");

        // Basic validation
        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess("Signup successful! Logging you in...");
                setEmail("");
                setPassword("");
            }
        }
        catch (err) {
            console.error(err);
            setError("An unexpected error occurred.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#0a0c14",
                color: "#e6edf3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <Box
                component="form"
                onSubmit={handleSignup}
                sx={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "rgba(10, 12, 20,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(99, 102, 241,0.2)",
                    borderRadius: "16px",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "8px" }}>
                    <div style={{
                        width: "48px", height: "48px",
                        background: "rgba(99, 102, 241,0.12)",
                        border: "1px solid rgba(99, 102, 241,0.3)",
                        borderRadius: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "24px",
                        margin: "0 auto 16px"
                    }}>🔒</div>
                    <Typography
                        variant="h4"
                        fontWeight="800"
                        sx={{
                            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "-0.5px"
                        }}
                    >
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="#8b949e" mt={1}>
                        Sign up to save your AI code reviews
                    </Typography>
                </div>

                {error && <Alert severity="error" sx={{ borderRadius: "8px" }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ borderRadius: "8px" }}>{success}</Alert>}

                <TextField
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#8b949e" } }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "#e6edf3",
                            "& fieldset": { borderColor: "rgba(99, 102, 241,0.3)", borderRadius: "8px" },
                            "&:hover fieldset": { borderColor: "rgba(99, 102, 241,0.6)" },
                            "&.Mui-focused fieldset": { borderColor: "#6366f1" }
                        }
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#8b949e" } }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            color: "#e6edf3",
                            "& fieldset": { borderColor: "rgba(99, 102, 241,0.3)", borderRadius: "8px" },
                            "&:hover fieldset": { borderColor: "rgba(99, 102, 241,0.6)" },
                            "&.Mui-focused fieldset": { borderColor: "#6366f1" }
                        }
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        marginTop: "8px",
                        padding: "12px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        textTransform: "none",
                        fontSize: "16px",
                        background: loading
                            ? "#0a0c14"
                            : "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                        boxShadow: loading ? "none" : "0 4px 20px rgba(168, 85, 247, 0.4)",
                        "&:hover": {
                            transform: loading ? "none" : "translateY(-2px)",
                            boxShadow: "0 8px 24px rgba(168, 85, 247, 0.6)",
                        },
                        "&.Mui-disabled": {
                            background: "#0a0c14",
                            color: "#555",
                        }
                    }}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
            </Box>
        </Box>
    );
}
