import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "SnapCode",
  description: "AI-powered code review platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen relative glow-bg">
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* Atmospheric Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] contrast-125 brightness-150" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd8CLU1wbgGTmiKOSz-wW9S-RlkGByM5ds6cRZKNi_r6wPZYDN0d8YTtJKjFYLV02DC5w4544ne5LE1tCDDRk_Npc2XW0Nj4gXIF1iZiWg5UbEo6mOGJ2NJqapg-SUUkahripx1-Zkq9QUPtQuNw0gkenvyTyAim0dikncfH-L5nmjHLaSVt_jX6LRLGmQLYd2YN6Qndzmxa_f6iNUaOscN8SWfUdG-FKqTAWZ6CLB2UY-g-S7ZvzZPUBXI3B4LtIjZB2cNRxuuEw')" }}></div>
      </body>
    </html>
  );
}
