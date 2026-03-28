export default function PRWalkthrough() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 antialiased overflow-hidden h-screen flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="absolute top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-[0_40px_6%_-10px_rgba(189,194,255,0.06)] border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</span>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-[#bdc2ff] border-b-2 border-[#bdc2ff] pb-1 font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/pr">Pull Requests</a>
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/history">History</a>
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/team">Insights</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20 hidden md:flex">
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2" data-icon="search">search</span>
            <input className="bg-transparent border-none outline-none text-xs text-on-surface placeholder-on-surface-variant w-48" placeholder="Search codebase..." type="text"/>
          </div>
          <button className="p-2 hover:bg-[#353439] transition-all duration-200 active:scale-95 text-on-surface-variant rounded-lg">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="p-2 hover:bg-[#353439] transition-all duration-200 active:scale-95 text-on-surface-variant rounded-lg">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <img alt="User profile" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9XdJHSRsuCxuragRdDqBz5Twe6m7Rv0zQ1oUKYTQ1Ip4w_cmn8zushwfoyo3DJZllYF-c9aauzWVdtvXRBqneNVaijfnjAMT_oxnBRXDgTgGiS-HUhgInHmluoPxaUz0x4yZpUzpiTtVjHeNT_kWA2J33_btmk-ldNh5MEOx_iKkDxdhcw9s316ECaDSIbMutEl4EIBZZCNXTjXvMLXuN50myAX7RHj-w8ySDLxotpqTgmANlgE_qkHg0jp0TTmS5_cZrSPjdgNE"/>
        </div>
      </header>

      <div className="flex h-screen pt-16 flex-1 w-full">
        {/* Sidebar: File Explorer (Left) */}
        <aside className="h-[calc(100vh-64px)] w-64 bg-background flex flex-col py-4 gap-2 border-r border-outline-variant/10 hidden lg:flex shadow-2xl z-20 shrink-0">
          <div className="px-6 mb-4">
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" data-icon="account_tree">account_tree</span>
                <span className="font-bold text-sm tracking-tight text-primary">Core Engine</span>
              </div>
              <span className="text-[10px] bg-surface-container-highest px-1.5 py-0.5 rounded text-on-surface-variant uppercase tracking-widest font-bold">v2.4.0</span>
            </div>
            <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-xs py-2 px-4 rounded transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
              New Analysis
            </button>
          </div>
          
          <nav className="flex-1 px-3 space-y-1">
            <a className="block text-decoration-none bg-gradient-to-r from-[#bdc2ff]/10 to-transparent text-[#bdc2ff] border-r-2 border-[#bdc2ff] flex items-center gap-3 px-3 py-2 cursor-pointer group rounded" href="/dashboard/pr">
              <span className="material-symbols-outlined text-sm" data-icon="quick_reference_all">quick_reference_all</span>
              <span className="text-xs font-semibold tracking-wide group-hover:translate-x-1 duration-200">Pull Requests</span>
            </a>
            <a className="block text-decoration-none text-[#c7c4d7] hover:bg-[#1b1b1f] rounded flex items-center gap-3 px-3 py-2 cursor-pointer group transition-colors" href="/dashboard/team">
              <span className="material-symbols-outlined text-sm" data-icon="analytics">analytics</span>
              <span className="text-xs font-semibold tracking-wide group-hover:translate-x-1 duration-200">Team Insights</span>
            </a>
            <a className="block text-decoration-none text-[#c7c4d7] hover:bg-[#1b1b1f] rounded flex items-center gap-3 px-3 py-2 cursor-pointer group transition-colors" href="/dashboard/history">
              <span className="material-symbols-outlined text-sm" data-icon="history">history</span>
              <span className="text-xs font-semibold tracking-wide group-hover:translate-x-1 duration-200">History</span>
            </a>
            <a className="block text-decoration-none text-[#c7c4d7] hover:bg-[#1b1b1f] rounded flex items-center gap-3 px-3 py-2 cursor-pointer group transition-colors" href="#">
              <span className="material-symbols-outlined text-sm" data-icon="account_tree">account_tree</span>
              <span className="text-xs font-semibold tracking-wide group-hover:translate-x-1 duration-200">Project Map</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area: Diff Viewer (Center) */}
        <main className="flex-1 shrink flex flex-col min-w-0 bg-surface-container-low h-[calc(100vh-64px)] overflow-y-auto no-scrollbar pb-24">
          
          <div className="p-8 border-b border-outline-variant/10 bg-surface shrink-0">
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex gap-3 items-center">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">PR #1402</span>
                <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full border border-secondary/20">MERGEABLE</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Refactor: Graph Engine Optimization for Distributed Nodes</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <img alt="avatar" className="w-6 h-6 rounded-full border border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGi-fNjneYetMctQcnLG1PsE3va01_3MNdkqfWVxCgNW0ksLpkGy4HTZPPkDSiw3bHkjzons5R1dmLMtNKOyu5lQ4iQmbRL0aWDscJNyt8D1iUb2azkF5Ldef5ooqS9ri9RYhny4ozGqqmCk1dqtwGtCbjKlmAb63WBRnO4CS7-J4Yr0SQ7J_5XURFWaNlWzs1Kn9FmaoJ5gBqOYAokmTNVfWJqfnOjJvBM-FebkNUlbdK51wM3Ifej_plMucxUJh1KcntFI4nVGU"/>
                <img alt="avatar" className="w-6 h-6 rounded-full border border-background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqP6ERsOfbMRUomZd203-VuXZG73M0VMXMgsHhxUFr_dkRnN-E83HEBazF1kvOPXNSYJ7XrUHPsSSuBTO3vtFwyksmawNyDOP317a25bDVWu004ilQ6FBV_CnkxOKrNLSHY-cGXgAt42LN1Tn1OUCd7qH8ioVcLJ3oTA-wpNzqsnJWz7Y9w802jTdhgcaTjgUxWmgcXMWZ2PzIIZ69hC04jAz1nhzWnsbI7Cot1T3F3Ay9np4Y0SBC8-VATQWxMPWgQN8JYc9iM7g"/>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">Modified 12 files • <span className="text-secondary">+248</span> <span className="text-error">-84</span></span>
            </div>
          </div>
          
          <div className="px-8 py-6 shrink-0 flex-1">
            {/* Architectural Diagram Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 mb-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-4">
                <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                  AI IMPACT MAP
                </span>
              </div>
              <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">hub</span>
                Module Dependency Impact
              </h3>
              <div className="h-48 flex items-center justify-center gap-6 lg:gap-12 relative opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-12 bg-surface-container-high rounded border border-outline-variant/20 flex items-center justify-center text-[10px] font-mono text-on-surface-variant text-center leading-tight shadow-md">API Gateway</div>
                  <div className="w-px h-8 bg-outline-variant/30"></div>
                  <div className="w-32 h-14 bg-primary/10 border border-primary/40 shadow-[0_0_15px_rgba(189,194,255,0.15)] rounded flex flex-col items-center justify-center text-center px-2">
                    <span className="text-[10px] font-bold text-primary">Core Engine</span>
                    <span className="text-[8px] text-primary/60 italic">Current Scope</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary/40 hidden md:inline-block">arrow_forward</span>
                <div className="flex flex-col gap-4">
                  <div className="w-24 h-10 bg-secondary/10 border border-secondary/30 rounded flex items-center justify-center text-[10px] font-mono text-secondary text-center shadow-[0_0_15px_rgba(221,183,255,0.1)]">Redis Cache</div>
                  <div className="w-24 h-10 bg-surface-container-high border border-outline-variant/20 rounded flex items-center justify-center text-[10px] font-mono text-on-surface-variant opacity-50 text-center">Postgres DB</div>
                </div>
                <div className="absolute bottom-1 right-2 w-full text-right text-[10px] text-on-surface-variant italic opacity-60">
                  * Solid lines indicate direct state mutation changes.
                </div>
              </div>
            </div>

            {/* Side-by-Side Diff Viewer */}
            <div className="bg-[#131317] rounded-xl border border-outline-variant/10 overflow-hidden shadow-2xl">
              <div className="bg-surface-container-highest/60 px-4 py-2 flex items-center justify-between border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">description</span>
                  <span className="text-xs font-mono text-on-surface-variant">src/engine/distributed_nodes.ts</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-on-surface-variant font-bold tracking-widest bg-surface px-1.5 py-0.5 rounded">TYPESCRIPT</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm border-l border-white/5 pl-2 cursor-pointer hover:text-white">unfold_more</span>
                </div>
              </div>
              
              {/* Responsive Diff View: block on mobile, flex on desktop */}
              <div className="flex flex-col lg:flex-row lg:divide-x divide-outline-variant/10 font-mono text-[13px] leading-relaxed">
                {/* Original (Left) */}
                <div className="w-full lg:w-1/2 py-2">
                  <div className="flex group hover:bg-surface-variant/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-on-surface-variant/40 select-none">42</div>
                    <div className="pl-4 text-[#c7c4d7] opacity-70 whitespace-pre overflow-x-auto no-scrollbar">{"  async processNode(id: string) {"}</div>
                  </div>
                  <div className="flex group bg-error/10 hover:bg-error/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-error/60 font-bold select-none">-</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    const data = await this.db.fetch(id);"}</div>
                  </div>
                  <div className="flex group bg-error/10 hover:bg-error/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-error/60 font-bold select-none">-</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    return this.engine.compute(data);"}</div>
                  </div>
                  <div className="flex group hover:bg-surface-variant/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-on-surface-variant/40 select-none">45</div>
                    <div className="pl-4 text-[#c7c4d7] opacity-70 whitespace-pre overflow-x-auto no-scrollbar">{"  }"}</div>
                  </div>
                </div>
                
                {/* New (Right) */}
                <div className="w-full lg:w-1/2 border-t lg:border-t-0 border-white/5 py-2">
                  <div className="flex group hover:bg-surface-variant/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-on-surface-variant/40 select-none">42</div>
                    <div className="pl-4 text-[#c7c4d7] whitespace-pre overflow-x-auto no-scrollbar">{"  async processNode(id: string) {"}</div>
                  </div>
                  <div className="flex group bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-secondary/60 font-bold select-none">+</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    const cacheKey = `node:${id}`;"}</div>
                  </div>
                  <div className="flex group bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-secondary/60 font-bold select-none">+</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    const cached = await this.cache.get(cacheKey);"}</div>
                  </div>
                  <div className="flex group bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-secondary/60 font-bold select-none">+</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    if (cached) return cached;"}</div>
                  </div>
                  
                  {/* AI Insight Bubble injected directly inline */}
                  <div className="relative py-4 px-4 sm:px-10">
                    <div className="bg-[#1a1b24] border border-primary/20 rounded-lg p-4 shadow-[0_4px_24px_rgba(189,194,255,0.08)] relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">AI Architect Insight</span>
                      </div>
                      <p className="text-xs text-on-surface leading-relaxed font-sans mb-3 opacity-90">
                        Cache implementation reduces latency by <span className="text-secondary font-bold">~40ms</span>. Recommended: set TTL to <span className="font-mono text-[11px] bg-white/5 px-1 rounded text-tertiary">300s</span> for high-frequency nodes.
                      </p>
                      <div className="flex gap-2 font-sans font-bold text-[10px] uppercase">
                        <button className="px-3 py-1.5 bg-primary/90 hover:bg-primary text-on-primary-fixed rounded transition-colors tracking-widest border border-primary">APPLY SUGGESTION</button>
                        <button className="px-3 py-1.5 hover:bg-white/5 border border-outline-variant/30 text-on-surface-variant rounded transition-colors tracking-widest">DISMISS</button>
                      </div>
                      <div className="absolute -top-[6px] left-6 w-3 h-3 bg-[#1a1b24] border-l border-t border-primary/20 rotate-45 hidden sm:block"></div>
                    </div>
                  </div>
                  
                  <div className="flex group bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-secondary/60 font-bold select-none">+</div>
                    <div className="pl-4 text-on-surface whitespace-pre overflow-x-auto no-scrollbar">{"    const data = await this.db.fetch(id);"}</div>
                  </div>
                  <div className="flex group hover:bg-surface-variant/20 transition-colors">
                    <div className="w-10 text-right pr-3 text-on-surface-variant/40 select-none">47</div>
                    <div className="pl-4 text-[#c7c4d7] whitespace-pre overflow-x-auto no-scrollbar">{"  }"}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>

        {/* Right Sidebar: AI Findings & Insights */}
        <aside className="w-80 bg-surface flex flex-col border-l border-outline-variant/10 h-[calc(100vh-64px)] shrink-0 hidden xl:flex shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
          <div className="p-6 border-b border-outline-variant/10 shrink-0">
            <h3 className="text-sm font-bold text-on-surface mb-4 flex items-center justify-between">
              <span>AI Analysis Findings</span>
              <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">8 NEW</span>
            </h3>
            <div className="flex gap-1.5 bg-surface-container-low p-1 rounded-lg">
              <button className="flex-1 bg-surface-container-high py-1.5 rounded text-[10px] font-bold text-primary tracking-widest">ALL</button>
              <button className="flex-1 bg-transparent py-1.5 rounded text-[10px] font-bold text-on-surface-variant hover:text-on-surface tracking-widest transition-colors">CRIT</button>
              <button className="flex-1 bg-transparent py-1.5 rounded text-[10px] font-bold text-on-surface-variant hover:text-on-surface tracking-widest transition-colors">LOW</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            <div className="group cursor-pointer">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/5 hover:border-error/30 transition-all hover:bg-error/5">
                <span className="material-symbols-outlined text-error text-[18px] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-error uppercase tracking-widest">Security Leak</span>
                    <span className="text-[9px] font-mono text-on-surface-variant/50">L44</span>
                  </div>
                  <p className="text-[11px] text-on-surface font-medium leading-relaxed opacity-90">Hardcoded cache key might expose internal node IDs to public telemetry.</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/5 hover:border-primary/30 transition-all hover:bg-primary/5">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>architecture</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Arch Pattern</span>
                    <span className="text-[9px] font-mono text-on-surface-variant/50">L42-47</span>
                  </div>
                  <p className="text-[11px] text-on-surface font-medium leading-relaxed opacity-90">Optimized cache-aside pattern detected. Aligns with System Design Spec v4.</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/5 hover:border-tertiary/30 transition-all hover:bg-tertiary/5">
                <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>speed</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Performance</span>
                    <span className="text-[9px] font-mono text-on-surface-variant/50 bg-white/5 px-1 rounded">GLOBAL</span>
                  </div>
                  <p className="text-[11px] text-on-surface font-medium leading-relaxed opacity-90">Overall computation throughput predicted to increase by 12%.</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant/5 hover:border-on-surface-variant/30 transition-all opacity-60 hover:opacity-100">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>checklist</span>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Style Guide</span>
                    <span className="text-[9px] font-mono text-on-surface-variant/50">L12</span>
                  </div>
                  <p className="text-[11px] text-on-surface font-medium leading-relaxed">Naming convention 'processNode' follows internal standards.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
            <button className="w-full bg-secondary text-on-secondary-fixed hover:brightness-110 font-bold text-xs py-3.5 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(221,183,255,0.3)] active:scale-95 transition-all outline-none">
              <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
              APPROVE AND MERGE
            </button>
            <p className="text-center text-[10px] text-on-surface-variant mt-3 italic opacity-70">
              Requires 1 more human reviewer approval
            </p>
          </div>
        </aside>
      </div>

      {/* Floating Command Bar (Bottom overlay) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[rgba(19,19,21,0.85)] backdrop-blur-2xl border border-white/10 rounded-full py-2 px-6 flex items-center gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-50">
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group px-2 py-1">
          <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">keyboard_command_key</span>
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline-block">Search</span>
        </button>
        <div className="w-px h-4 bg-outline-variant/40"></div>
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group px-2 py-1">
          <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">forum</span>
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline-block">Chat</span>
        </button>
        <div className="w-px h-4 bg-outline-variant/40"></div>
        <button className="flex items-center gap-2 text-primary group px-2 py-1 bg-primary/10 rounded-full border border-primary/20">
          <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">code</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Diff</span>
        </button>
      </div>
    </div>
  );
}
