# SnapCode ⚡

**SnapCode** is an AI-powered code review application that analyzes your source code, detects potential bugs, and suggests performance improvements and best practices. Built with a modern React frontend and a FastAPI backend, SnapCode leverages Google's Gemini AI to act as your expert pair-programming partner.

Deployed Link : https://snapcode-nu.vercel.app/

![SnapCode Interface Demo](frontend/public/SnapCode.svg) <!-- Replace with an actual screenshot if available -->

## 🚀 Features

*   **Intelligent Code Reviews:** Paste your code or upload files to get instant, actionable feedback powered by Gemini AI.
*   **GitHub Integration:** Paste a public GitHub repository URL to have the entire codebase analyzed and reviewed at once.
*   **Auto-Language Detection:** Automatically detects the programming language you are using (supports Python, JavaScript, C++, Go, Rust, Java, and many more).
*   **Syntax Highlighting:** A rich code editor experience with built-in syntax highlighting.
*   **Review History:** Log in to save your review history securely to Supabase and revisit past analyses at any time.
*   **Modern UI/UX:** A sleek, responsive dark theme built with React and Material UI, featuring glassmorphism and ambient blob animations.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React (via Vite)
*   **Styling & UI:** Material UI (MUI), raw CSS
*   **Syntax Highlighting:** `highlight.js`
*   **Auth & Database Client:** Supabase (`@supabase/supabase-js`)
*   **HTTP Client:** Axios

### Backend
*   **Framework:** FastAPI (Python)
*   **AI Model:** Google Gemini AI API
*   **Database:** Supabase (PostgreSQL)
*   **Other Tools:** `pydantic` for validation, GitHub API for fetching repository data

## ⚙️ Local Setup Instructions

To run SnapCode locally, you'll need to set up both the frontend and backend servers.

### Prerequisites
*   Node.js (v16+ recommended)
*   Python (3.9+ recommended)
*   A Supabase Project (for database and authentication)
*   A Google AI Studio API Key (for Gemini)

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_service_role_key
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be available at `http://127.0.0.1:8000`*

### 2. Frontend Setup (React/Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with the following variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically be available at `http://localhost:5173`*

## 📁 Project Structure

```text
ai-code-reviewer/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── reviewer.py          # Gemini AI integration logic
│   ├── github_fetcher.py    # Logic to fetch and parse GitHub repos
│   ├── auth.py              # Authentication helpers
│   ├── supabase_client.py   # Database operations for saving/fetching reviews
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── public/              # Static assets (Favicon, SVGs)
    ├── src/
    │   ├── components/      # React components (NavBar, CodeEditor, ReviewOutput, etc.)
    │   ├── pages/           # Page layouts (Login, Signup, History)
    │   ├── App.jsx          # Main frontend routing and state logic
    │   ├── main.jsx         # React application entry point & Theme Provider
    │   └── supabaseClient.js# Supabase initialization
    ├── package.json         # Node dependencies and scripts
    └── vite.config.js       # Vite configuration
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is for educational and portfolio purposes.
