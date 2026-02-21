import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Navbar({ user, onLogout, onLoginClick, onSignupClick, onHomeClick, onHistoryClick }) {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 48px",
                background: "rgba(10, 12, 20, 0.6)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(99,102,241,0.15)",
                position: "sticky",
                top: 0,
                zIndex: 50,
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {/* Logo Section */}
            <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                onClick={onHomeClick}
                sx={{ cursor: "pointer" }}
            >
                <div style={{
                    width: "36px", height: "36px",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px",
                    boxShadow: "0 0 10px rgba(99,102,241,0.2)"
                }}>⚡</div>
                <Typography
                    variant="h5"
                    fontWeight="900"
                    sx={{
                        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "-0.5px"
                    }}
                >
                    AI Code Reviewer
                </Typography>
            </Box>

            {/* Navigation Actions */}
            <Stack direction="row" spacing={3} alignItems="center">
                {!user ? (
                    <>
                        <Button
                            variant="contained"
                            onClick={onLoginClick}
                            sx={{
                                background: "rgba(255,255,255,0.05)",
                                color: "#c9d1d9",
                                border: "1px solid rgba(255,255,255,0.1)",
                                padding: "6px 20px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                textTransform: "none",
                                fontSize: "14px",
                                boxShadow: "none",
                                "&:hover": {
                                    background: "rgba(255,255,255,0.1)",
                                    boxShadow: "0 0 10px rgba(255,255,255,0.1)"
                                }
                            }}
                        >
                            Log in
                        </Button>

                        <Button
                            variant="contained"
                            onClick={onSignupClick}
                            sx={{
                                background: "rgba(99,102,241,0.15)",
                                color: "#a5b4fc",
                                border: "1px solid rgba(99,102,241,0.3)",
                                padding: "6px 20px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                textTransform: "none",
                                fontSize: "14px",
                                boxShadow: "none",
                                "&:hover": {
                                    background: "rgba(99,102,241,0.25)",
                                    boxShadow: "0 0 15px rgba(99,102,241,0.2)",
                                }
                            }}
                        >
                            Sign up
                        </Button>
                    </>
                ) : (
                    <>
                        {/* User Email Badge */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "6px 16px",
                            borderRadius: "100px",
                            color: "#8b949e",
                            fontSize: "13px",
                            fontWeight: "500"
                        }}>
                            <span style={{ fontSize: "14px" }}>👤</span>
                            {user.email}
                        </div>

                        <Button
                            variant="contained"
                            onClick={onHistoryClick}
                            sx={{
                                background: "rgba(99,102,241,0.1)",
                                color: "#a5b4fc",
                                border: "1px solid rgba(99,102,241,0.2)",
                                padding: "6px 16px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                textTransform: "none",
                                fontSize: "14px",
                                boxShadow: "none",
                                "&:hover": {
                                    background: "rgba(99,102,241,0.2)",
                                    boxShadow: "0 0 12px rgba(99,102,241,0.2)",
                                }
                            }}
                        >
                            📋 History
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={onLogout}
                            sx={{
                                color: "#ff7b72",
                                borderColor: "rgba(255,123,114,0.3)",
                                padding: "6px 16px",
                                borderRadius: "8px",
                                fontWeight: "600",
                                textTransform: "none",
                                fontSize: "14px",
                                "&:hover": {
                                    background: "rgba(255,123,114,0.1)",
                                    borderColor: "#ff7b72",
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    );
}
