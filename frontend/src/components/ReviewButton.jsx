import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function ReviewButton({ onReview, loading }) {

    return (
        <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={!loading ? onReview : undefined}
            disabled={loading}
            aria-label="Review code"
            sx={{
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "15px",
                padding: "12px 28px",
                color: "#fff",
                letterSpacing: "0.3px",
                transition: "all 0.3s ease-in-out",

                background: loading
                    ? "#0a0c14"
                    : "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",

                boxShadow: loading
                    ? "none"
                    : "0 4px 24px rgba(168, 85, 247, 0.35)",

                "&:hover": {
                    transform: loading ? "none" : "translateY(-2px)",
                    boxShadow: loading
                        ? "none"
                        : "0 8px 32px rgba(168, 85, 247, 0.55)",
                    background: loading
                        ? "#0a0c14"
                        : "linear-gradient(135deg, #4f52d8 0%, #9333ea 50%, #db2777 100%)",
                },

                "&.Mui-disabled": {
                    background: "#0a0c14",
                    color: "#555",
                }
            }}
        >
            {loading ? (
                <>
                    <CircularProgress
                        size={18}
                        color="inherit"
                        sx={{ marginRight: "10px" }}
                    />
                    Analyzing Code...
                </>
            ) : (
                "✨ Review Code"
            )}
        </Button>
    );
}
