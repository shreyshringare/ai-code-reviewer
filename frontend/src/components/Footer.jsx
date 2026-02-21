import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 6,
                py: 3,
                px: 6,
                borderTop: "1px solid rgba(99,102,241,0.12)",
                background: "rgba(10,12,20,0.6)",
                backdropFilter: "blur(12px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
            }}
        >
            <Typography variant="caption" color="#555" sx={{ fontFamily: "'Inter', sans-serif" }}>
                ⚡ <strong style={{ color: "#8b949e" }}>AI Code Reviewer</strong>
                {" "}· Built with FastAPI, React, Supabase &amp; Gemini AI
            </Typography>

            <Typography variant="caption" color="#444" sx={{ fontFamily: "'Inter', sans-serif" }}>
                &copy; {new Date().getFullYear()} · Free tier · All Reviews saved securely
            </Typography>
        </Box>
    );
}
