"use client";

import TopNavBar from "../../../components/TopNavBar";
import SideNavBar from "../../../components/SideNavBar";

export default function WalkthroughPage() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
      <TopNavBar />
      
      {/* Main Workspace */}
      <div className="flex pt-16 h-screen overflow-hidden">
        <SideNavBar />

        {/* Main Content Canvas */}
        <main className="ml-64 mr-72 flex-1 flex flex-col bg-surface overflow-hidden">
          {/* Glassmorphic Summary Bar */}
          <div className="p-6 pb-0">
            <div className="glass-panel p-4 rounded-xl flex items-center justify-around border border-outline-variant/10 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container-highest" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-error" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="25.1" strokeWidth="3"></circle>
                  </svg>
                  <span className="absolute text-[10px] font-bold text-error">82%</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface uppercase tracking-wider">Security</div>
                  <div className="text-[10px] text-error font-mono">2 Critical Issues</div>
                </div>
              </div>
              <div className="w-px h-10 bg-outline-variant/20"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container-highest" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-secondary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="12.5" strokeWidth="3"></circle>
                  </svg>
                  <span className="absolute text-[10px] font-bold text-secondary">94%</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface uppercase tracking-wider">Performance</div>
                  <div className="text-[10px] text-secondary font-mono">Optimal Latency</div>
                </div>
              </div>
              <div className="w-px h-10 bg-outline-variant/20"></div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-surface-container-highest" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="37.6" strokeWidth="3"></circle>
                  </svg>
                  <span className="absolute text-[10px] font-bold text-primary">76%</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-on-surface uppercase tracking-wider">Reliability</div>
                  <div className="text-[10px] text-primary font-mono">3 Unit Regressions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Diff Viewer */}
          <div className="flex-1 p-6 overflow-hidden flex flex-col">
            <div className="bg-surface-container-lowest rounded-xl flex-1 flex flex-col border border-outline-variant/5 shadow-inner overflow-hidden">
              {/* Diff Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-surface-container-low border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">edit_document</span>
                  <span className="text-xs font-mono text-outline">src/services/auth_engine.py</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-error/40"></div>
                  <div className="w-2 h-2 rounded-full bg-tertiary/40"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
                </div>
              </div>
              {/* Code Content */}
              <div className="flex-1 flex overflow-auto font-mono text-sm leading-relaxed">
                {/* Left: Original */}
                <div className="flex-1 bg-surface-container-lowest/50 border-r border-outline-variant/10">
                  <div className="flex">
                    <div className="w-12 bg-surface-container-low text-right pr-3 text-outline/30 select-none py-4 text-[10px]">
                      124<br />125<br />126<br />127<br />128<br />129<br />130<br />131<br />132<br />133<br />134<br />135
                    </div>
                    <div className="py-4 px-4 whitespace-pre text-outline/60">
                      {`async def validate_token(token: str):
    try:
        payload = jwt.decode(token, SECRET)
        return payload
    except JWTError:`}
                      <div className="diff-removed text-tertiary px-1">-       logger.error(f"Invalid token: &#123;token&#125;")</div>
                      <div className="diff-removed text-tertiary px-1">-       return None</div>
                      {`    finally:
        db.close()`}
                    </div>
                  </div>
                </div>
                {/* Right: Modified */}
                <div className="flex-1 relative">
                  <div className="flex h-full">
                    <div className="w-12 bg-surface-container-low text-right pr-3 text-outline/30 select-none py-4 text-[10px]">
                      124<br />125<br />126<br />127<br />128<br />129<br />130<br />131<br />132<br />133<br />134<br />135
                    </div>
                    <div className="py-4 px-4 whitespace-pre text-on-surface w-full">
                      {`async def validate_token(token: str):
    try:
        payload = jwt.decode(token, SECRET)
        return payload
    except JWTError:`}
                      <div className="diff-added text-primary px-1">+       logger.warning("Token validation failed")</div>
                      <div className="diff-added text-primary px-1">+       raise UnauthorizedException()</div>
                      {`    finally:
        await db.session.close()`}

                      <div className="mt-8"></div>
                      {/* Inline AI Comment Bubble */}
                      <div className="absolute left-16 right-8 mt-2 glass-panel border border-primary/20 rounded-xl p-4 shadow-2xl z-10 animate-pulse">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/20 p-1.5 rounded-full">
                            <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-primary uppercase tracking-tighter">AI Suggestion</span>
                              <span className="text-[10px] text-outline">Security Risk: High</span>
                            </div>
                            <p className="text-xs text-on-surface-variant mb-4">Logging the raw token string creates a sensitive data leak in production logs. Refactored to generic warning and specific exception.</p>
                            <div className="bg-surface-container-highest p-3 rounded-lg border border-outline-variant/20 mb-3">
                              <div className="text-[10px] text-primary/60 mb-1">Proposed Fix:</div>
                              <code className="text-[11px] text-primary">raise UnauthorizedException(detail="Token expired")</code>
                            </div>
                            <button className="bg-primary text-on-primary px-4 py-1.5 rounded-lg border-none hover:border-none focus:outline-none font-bold active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                              Apply Fix
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Architecture Panel */}
        <aside className="fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-72 bg-surface-container-lowest border-l border-outline-variant/10 flex flex-col">
          <div className="p-6">
            <h3 className="text-xs font-bold text-on-surface uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
              Architecture
              <span className="material-symbols-outlined text-outline text-lg">hub</span>
            </h3>
            {/* Graph Visualization Placeholder */}
            <div className="relative h-64 w-full bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg className="filter blur-[1px]" height="200" viewBox="0 0 200 200" width="200">
                  <circle className="animate-pulse" cx="100" cy="100" fill="#bdc2ff" r="6"></circle>
                  <circle cx="60" cy="60" fill="#ddb7ff" r="4"></circle>
                  <circle cx="140" cy="70" fill="#ddb7ff" r="4"></circle>
                  <circle cx="80" cy="150" fill="#ffb0cd" r="4"></circle>
                  <circle cx="130" cy="140" fill="#bdc2ff" r="4"></circle>
                  <line stroke="#bdc2ff" strokeDasharray="2,2" strokeWidth="0.5" x1="100" x2="60" y1="100" y2="60"></line>
                  <line stroke="#bdc2ff" strokeDasharray="2,2" strokeWidth="0.5" x1="100" x2="140" y1="100" y2="70"></line>
                  <line stroke="#ffb0cd" strokeWidth="1" x1="100" x2="80" y1="100" y2="150"></line>
                  <line stroke="#bdc2ff" strokeDasharray="2,2" strokeWidth="0.5" x1="100" x2="130" y1="100" y2="140"></line>
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 text-[9px] font-mono text-outline uppercase tracking-widest">Dependency Cluster v2.4</div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
            </div>
            <div className="mt-8 space-y-6">
              <div>
                <div className="text-[10px] text-outline font-bold uppercase mb-3">Affected Components</div>
                <ul className="space-y-3 p-0 list-none">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-xs text-on-surface-variant font-mono">AuthEngine.py</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                    <span className="text-xs text-on-surface-variant font-mono">DatabaseMiddleware.ts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                    <span className="text-xs text-on-surface-variant font-mono">LoggerCore.go</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-error-container/10 rounded-lg border border-error/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-error text-sm">warning</span>
                  <span className="text-[10px] font-bold text-error uppercase">Circular Risk</span>
                </div>
                <p className="text-[10px] text-on-error-container/80 leading-relaxed">
                  The proposed changes in AuthEngine may introduce a circular dependency with LoggerCore under high-load failure scenarios.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Sidebar Findings Concept */}
        <div className="fixed left-64 top-[320px] bottom-0 w-[240px] px-4 overflow-y-auto hidden md:block border-r border-outline-variant/10">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Active Findings</span>
              <span className="bg-surface-container-highest px-1.5 py-0.5 rounded text-[9px] text-on-surface-variant">5 Total</span>
            </div>
            <div className="group mb-3 p-3 bg-surface-container-high/50 hover:bg-surface-container-high rounded-lg cursor-pointer border border-transparent hover:border-error/20 transition-all">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-error uppercase">Critical</span>
                    <span className="text-[9px] font-mono text-outline">L:132</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-tight mb-2">Sensitive Data Leakage in logs</p>
                  <button className="text-[9px] text-primary hover:underline flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer">
                    Jump to line
                    <span className="material-symbols-outlined text-[10px]">north_east</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Footer */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-panel border border-outline-variant/20 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl z-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">Live Analysis Active</span>
          </div>
          <div className="w-px h-6 bg-outline-variant/20"></div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-outline hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer outline-none">
              <span className="material-symbols-outlined text-xl">skip_previous</span>
              <span className="text-[10px] font-bold">Prev</span>
            </button>
            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">1 / 5 Findings</span>
            <button className="flex items-center gap-2 text-outline hover:text-on-surface transition-colors bg-transparent border-none cursor-pointer outline-none">
              <span className="text-[10px] font-bold">Next</span>
              <span className="material-symbols-outlined text-xl">skip_next</span>
            </button>
          </div>
          <div className="w-px h-6 bg-outline-variant/20"></div>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/20 px-4 py-1 rounded-full text-[10px] font-bold transition-all active:scale-95 cursor-pointer">
            Approve All AI Fixes
          </button>
        </div>
      </div>
    </div>
  );
}
