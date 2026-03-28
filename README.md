# SnapCode ⚡

**SnapCode** is an AI-powered code review platform that analyzes your source code, detects potential bugs, and suggests performance improvements and best practices. Powered by Google Gemini AI and a multi-agent orchestration layer.

Deployed Link: https://snapcode-nu.vercel.app/

## 🚀 Features

*   **Intelligent Code Reviews:** Paste code or upload files to get instant, actionable feedback powered by Gemini AI.
*   **GitHub Integration:** Paste a public GitHub repository URL to have the entire codebase analyzed at once.
*   **Multi-Agent Analysis:** Parallel security, performance, architecture, and logic verification agents.
*   **Auto-Language Detection:** Automatically detects 45+ programming languages.
*   **Streaming Reviews:** Real-time token-by-token review via Server-Sent Events.
*   **Review History:** Log in to save and revisit past analyses via Supabase.
*   **Modern UI:** Dark "Obsidian Deep" theme with glassmorphism, animated glows, and a VS Code-like diff viewer.

## 🛠️ Tech Stack

### Frontend (`frontend/`)
*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS (Material Design 3 dark theme)
*   **AI Integration:** Vercel AI SDK + Anthropic Claude + Groq
*   **MCP:** Model Context Protocol SDK for agent orchestration

### Backend (`backend/`)
*   **Framework:** Express.js (Node.js)
*   **AI Model:** Google Gemini 2.5 Flash
*   **Database:** Supabase (PostgreSQL + Auth)
*   **Validation:** Zod schemas + Express rate limiting
*   **GitHub:** GitHub API integration for repository analysis

## ⚙️ Local Setup

### Prerequisites
*   Node.js v18+
*   A Supabase project (database + auth)
*   Google AI Studio API key (Gemini)
*   Groq API key (optional, for chat streaming)
*   Anthropic API key (optional, for Claude-powered features)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
GITHUB_TOKEN=your_github_token_here
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

```bash
npm run dev
# Backend available at http://localhost:8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

```bash
npm run dev
# Frontend available at http://localhost:3000
```

### 3. Run Both Together

```bash
# From project root
npm install
npm run dev
```

## 📁 Project Structure

```text
snapcode/
├── backend/                    # Express.js API server
│   ├── server.js               # Entry point (port 8000)
│   ├── reviewer.js             # Gemini AI code review logic
│   ├── githubFetcher.js        # GitHub repo fetching & parsing
│   ├── auth.js                 # Supabase JWT middleware
│   ├── supabaseClient.js       # Database operations
│   ├── config.js               # Environment configuration
│   ├── schema.sql              # Database schema
│   └── middleware/
│       ├── rateLimiter.js      # Tiered rate limiting
│       └── validate.js         # Zod request validation
│
├── frontend/                   # Next.js 15 frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.jsx        # Landing/signup page
│   │   │   ├── layout.jsx      # Root layout
│   │   │   ├── auth/           # Login & signup pages
│   │   │   ├── dashboard/      # Main review interface & sub-pages
│   │   │   │   ├── page.jsx    # Code analysis dashboard
│   │   │   │   ├── pr/         # PR diff viewer
│   │   │   │   ├── team/       # Team analytics
│   │   │   │   ├── history/    # Review history
│   │   │   │   ├── create-agent/ # AI agent builder
│   │   │   │   └── walkthrough/  # Interactive code walkthrough
│   │   │   ├── api/
│   │   │   │   ├── chat/       # Streaming chat (Groq)
│   │   │   │   └── review/stream/ # Review orchestration
│   │   │   └── components/     # TopNavBar, SideNavBar
│   │   ├── agents/             # Multi-agent orchestration
│   │   │   ├── ReviewOrchestrator.js
│   │   │   └── skills/         # SecurityAudit, PerfAudit, etc.
│   │   └── mcp/                # MCP local server
│   └── package.json
│
└── package.json                # Monorepo root
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is for educational and portfolio purposes.
