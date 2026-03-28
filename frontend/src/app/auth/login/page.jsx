"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(redirectTo);
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative bg-background text-on-background font-body overflow-x-hidden">

      {/* Left Visual Area */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0A0A0E] border-r border-outline-variant/10">
        <div className="absolute inset-0 neural-gradient"></div>
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none opacity-[0.12] glitch-effect">
          <div className="ascii-scroller whitespace-pre font-mono text-[10px] leading-none text-[#6366F1]">
{`/ \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\
| 0 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0 |
\\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ /
  [ + ] LOG_INIT: x0249583_KERNEL_STATUS_OK
  { "id": "wireframe_node", "pos": [12.4, 0.9, -4.2] }
  ////////////////////////////////////////////////////////////
  < CODE_STREAM_ACTIVE >
  01011001 01101111 01110101 00100000 01100001 01110010 01100101
  \\__________________________________________________________/
  [ * ] TRACE: 0xDEADBEEF >> REDIRECTING_TO_CORE
  > analyzing_patterns... [OK]
  > detecting_anomalies... [3 flagged]
  > optimization_sequence: [|||||||||||||||||||    ] 74%`}
          </div>
        </div>
        <div className="relative z-10 w-full h-full flex flex-col justify-center p-20">
          <div className="space-y-8 max-w-lg">
            <div className="w-16 h-1 bg-primary/40 rounded-full"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-primary/40">
                <span className="material-symbols-outlined">terminal</span>
                <span className="font-mono text-xs tracking-widest uppercase">Initializing Core...</span>
              </div>
              <div className="font-mono text-sm text-on-surface-variant/30 leading-relaxed">
                <p>&gt; scanning_repository... [OK]</p>
                <p>&gt; analyzing_patterns... [OK]</p>
                <p>&gt; detecting_anomalies... [3 flagged]</p>
                <p>&gt; optimizing_logic_structures... [74%]</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Right Content Area */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20">
        <nav className="w-full p-6 flex items-center justify-between lg:justify-end gap-8 bg-transparent">
          <div className="lg:hidden text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-on-surface-variant/60 hover:text-primary transition-colors text-sm font-medium" href="#">Docs</a>
            <a className="text-on-surface-variant/60 hover:text-primary transition-colors text-sm font-medium" href="#">Pricing</a>
          </div>
          <a href="/auth/signup" className="px-5 py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-all text-sm border border-primary/20">Sign Up</a>
        </nav>

        <main className="flex-grow flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="glass-morphism rounded-2xl p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-outline-variant/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

              <div className="text-center mb-10">
                <h1 className="text-4xl font-headline font-bold uppercase tracking-tight text-on-background mb-3">Welcome to SnapCode</h1>
                <p className="text-on-surface-variant/70 text-sm font-body tracking-normal">Unlock the Future of Code with AI.</p>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40 ml-1" htmlFor="email">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline/60 text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                    </div>
                    <input
                      className="block w-full pl-11 pr-4 py-3 bg-surface-container-highest/50 border-none rounded-xl text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-high transition-all outline-none"
                      id="email" name="email" placeholder="dev@snapcode.ai" type="email"
                      value={email} onChange={(e) => setEmail(e.target.value)} required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end px-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40" htmlFor="password">Password</label>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline/60 text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                    </div>
                    <input
                      className="block w-full pl-11 pr-11 py-3 bg-surface-container-highest/50 border border-outline-variant/15 rounded-xl text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-high transition-all outline-none"
                      id="password" name="password" placeholder="••••••••" type="password"
                      value={password} onChange={(e) => setPassword(e.target.value)} required
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  <button
                    className="w-full py-4 px-4 bg-primary text-on-primary-fixed font-bold rounded-xl shadow-[0_10px_30px_rgba(189,194,255,0.2)] hover:shadow-[0_15px_40px_rgba(189,194,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit" disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant/50">
                      New here?
                      <a className="text-secondary ml-1 font-semibold hover:underline" href="/auth/signup">Create account</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high/20 border border-outline-variant/10">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40">Network Stable</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full p-8 mt-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/30">© 2026 SnapCode AI.</div>
          <div className="flex items-center gap-6">
            <a className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/30 hover:text-primary transition-colors" href="#">Privacy</a>
            <a className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/30 hover:text-primary transition-colors" href="#">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-mono text-sm">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
