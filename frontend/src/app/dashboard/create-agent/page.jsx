export default function CreateAgentPage() {
  return (
    <div className="bg-surface-container-low text-on-surface font-body selection:bg-primary/30 antialiased min-h-screen">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</span>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/pr">Pull Requests</a>
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/history">History</a>
            <a className="text-[#bdc2ff] border-b-2 border-[#bdc2ff] pb-1 font-['Inter'] antialiased tracking-tight text-sm" href="/dashboard/create-agent">Rule Engine</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#353439] transition-all duration-200 active:scale-95 text-on-surface-variant rounded-lg">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <img alt="User profile" className="w-8 h-8 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9XdJHSRsuCxuragRdDqBz5Twe6m7Rv0zQ1oUKYTQ1Ip4w_cmn8zushwfoyo3DJZllYF-c9aauzWVdtvXRBqneNVaijfnjAMT_oxnBRXDgTgGiS-HUhgInHmluoPxaUz0x4yZpUzpiTtVjHeNT_kWA2J33_btmk-ldNh5MEOx_iKkDxdhcw9s316ECaDSIbMutEl4EIBZZCNXTjXvMLXuN50myAX7RHj-w8ySDLxotpqTgmANlgE_qkHg0jp0TTmS5_cZrSPjdgNE"/>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Create Custom AI Agent</h1>
          <p className="text-on-surface-variant text-sm font-medium">Define specialized rules and architectural constraints for your codebase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Agent Identity */}
            <div className="bg-[#131317] rounded-xl border border-outline-variant/10 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg" data-icon="badge">badge</span> Identity
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide">Agent Name</label>
                  <input className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-semibold" placeholder="e.g., Security Enforcer, React Perf Guru" type="text"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide">Description</label>
                  <textarea className="w-full bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none h-24" placeholder="Briefly describe the agent's primary responsibility..."></textarea>
                </div>
              </div>
            </div>

            {/* Scope & Triggers */}
            <div className="bg-[#131317] rounded-xl border border-outline-variant/10 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg" data-icon="radar">radar</span> Scope & Triggers
              </h2>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wide">Include Glob Patterns</label>
                  <div className="flex gap-2 mb-2">
                    <input className="flex-1 bg-surface-container-high border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all font-mono" placeholder="src/components/**/*.tsx" type="text"/>
                    <button className="bg-surface-container-highest hover:bg-white/10 text-on-surface px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-outline-variant/20">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded-full text-xs font-mono text-on-surface-variant hover:border-error/50 group cursor-pointer transition-colors">
                      src/api/**
                      <span className="material-symbols-outlined text-[12px] group-hover:text-error" data-icon="close">close</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline-variant/20 rounded-full text-xs font-mono text-on-surface-variant hover:border-error/50 group cursor-pointer transition-colors">
                      packages/core/**
                      <span className="material-symbols-outlined text-[12px] group-hover:text-error" data-icon="close">close</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/10">
                  <label className="block text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wide">Execution Triggers</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-10 h-5 bg-primary rounded-full relative transition-colors shadow-[0_0_10px_rgba(189,194,255,0.3)]">
                        <div className="absolute right-1 top-1 bg-[#000767] w-3 h-3 rounded-full transition-transform"></div>
                      </div>
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">Pull Request Opened/Updated</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-10 h-5 bg-surface-container-highest border border-outline-variant/20 rounded-full relative transition-colors">
                        <div className="absolute left-1 top-1 bg-on-surface-variant w-3 h-3 rounded-full transition-transform"></div>
                      </div>
                      <span className="text-sm font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors">Commit Pushed to Main</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-10 h-5 bg-primary rounded-full relative transition-colors shadow-[0_0_10px_rgba(189,194,255,0.3)]">
                        <div className="absolute right-1 top-1 bg-[#000767] w-3 h-3 rounded-full transition-transform"></div>
                      </div>
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">Manual Trigger (Dashboard)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Engineering */}
            <div className="bg-[#131317] rounded-xl border border-outline-variant/10 p-6 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full pointer-events-none"></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-sm font-bold tracking-widest uppercase text-tertiary flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" data-icon="psychology">psychology</span> Instructions
                </h2>
                <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                  <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span> Optimize
                </button>
              </div>
              
              <div className="relative z-10">
                <textarea className="w-full bg-[#0a0a0b] border border-outline-variant/20 rounded-lg p-4 text-sm text-[#c7c4d7] font-mono leading-relaxed placeholder-on-surface-variant/40 focus:outline-none focus:border-tertiary/50 focus:ring-1 focus:ring-tertiary/50 transition-all resize-y min-h-[200px]" placeholder="You are a strict code reviewer. Enforce the following rules:&#10;1. No console.log in production code.&#10;2. All async functions must have try/catch blocks..."></textarea>
                <div className="absolute bottom-4 right-4 text-[10px] text-on-surface-variant font-mono bg-surface-container-high px-2 py-1 rounded">Markdown Supported</div>
              </div>
            </div>

          </div>

          {/* Sidebar / Deployment Section */}
          <div className="space-y-6">
            <div className="bg-[#131317] rounded-xl border border-outline-variant/10 p-6 shadow-xl sticky top-24">
              <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface mb-6 border-b border-white/5 pb-4">Deployment</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-outline-variant/5">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                    <div className="w-2 h-2 rounded-full bg-surface-variant"></div> Draft
                  </span>
                </div>
                <div className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg border border-outline-variant/5">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Model</span>
                  <select className="bg-transparent text-xs font-bold text-primary outline-none cursor-pointer text-right appearance-none custom-select pr-4 relative">
                    <option className="bg-surface text-on-surface">Gemini 1.5 Pro</option>
                    <option className="bg-surface text-on-surface">Claude 3.5 Sonnet</option>
                    <option className="bg-surface text-on-surface">GPT-4o</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg text-sm hover:shadow-[0_0_20px_rgba(189,194,255,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" data-icon="rocket_launch">rocket_launch</span>
                   Deploy Agent
                </button>
                <button className="w-full py-3 bg-transparent border border-outline-variant/30 text-on-surface hover:bg-white/5 font-bold rounded-lg text-sm transition-all active:scale-95">
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Optional Success Toast (Hidden by default, shown for UI demonstration) */}
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex items-start gap-3 shadow-[0_10px_30px_rgba(221,183,255,0.1)]">
              <span className="material-symbols-outlined text-secondary mt-0.5" style={{fontVariationSettings: "'FILL' 1"}} data-icon="check_circle">check_circle</span>
              <div>
                <h4 className="text-sm font-bold text-on-surface mb-1">Agent Deployed Successfully</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">"Security Enforcer" is now active on 3 repositories and will trigger on the next Pull Request.</p>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
