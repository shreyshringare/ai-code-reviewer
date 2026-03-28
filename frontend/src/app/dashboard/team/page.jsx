export default function TeamDashboard() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary/30 antialiased min-h-screen">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-xl flex items-center justify-between px-6 h-16 w-full shadow-[0_40px_6%_-10px_rgba(189,194,255,0.06)] font-['Inter'] antialiased tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-[#c7c4d7] hover:text-[#bdc2ff] transition-colors" href="/dashboard/history">History</a>
            <a className="text-[#bdc2ff] border-b-2 border-[#bdc2ff] pb-1" href="/dashboard/team">Team Insights</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#c7c4d7] hover:bg-[#353439] transition-all duration-200 rounded-lg active:scale-95">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="p-2 text-[#c7c4d7] hover:bg-[#353439] transition-all duration-200 rounded-lg active:scale-95">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
            <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh5Y3P4nbTNpZCwwRaOJZkc_c0TnQgZv20kuDxxXxbZAmFKGQds_SkmubEbqMuNMrq2-VhO_uBzuzeqbY_1TF_-F9lfnxnOCYkaFUEGNzA-DReJa3NLqc_qL8uVusyinqHBwpTDn3lhaUBGfF6l10C62Jw4zfghu6cIOL9nFfEATU4FnscC8YcGmxPYtpJOfdOBjYCFAmMVMacguC9EsESHQJ5ZRIPfCQ3V1UM60fVN31vAR6zQ-uQdwh5E0ifufZjLJUUUyXLEXQ"/>
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-[#131317] flex flex-col py-8 gap-4 shadow-[0_0_0_1px_rgba(66,71,84,0.15)] z-40 hidden md:flex border-none">
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" data-icon="account_tree">account_tree</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Core Engine</p>
              <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-widest">v2.4.0-stable</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-3">
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide text-[#c7c4d7] hover:bg-[#1b1b1f] transition-colors group" href="/dashboard/pr">
            <span className="material-symbols-outlined group-hover:translate-x-1 duration-200" data-icon="quick_reference_all">quick_reference_all</span>
            <span>Pull Requests</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide bg-gradient-to-r from-[#bdc2ff]/10 to-transparent text-[#bdc2ff] border-r-2 border-[#bdc2ff] transition-colors group" href="/dashboard/team">
            <span className="material-symbols-outlined group-hover:translate-x-1 duration-200" data-icon="analytics">analytics</span>
            <span>Team Insights</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide text-[#c7c4d7] hover:bg-[#1b1b1f] transition-colors group" href="/dashboard/create-agent">
            <span className="material-symbols-outlined group-hover:translate-x-1 duration-200" data-icon="rule_settings">rule_settings</span>
            <span>Rule Engine</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-sm font-semibold tracking-wide text-[#c7c4d7] hover:bg-[#1b1b1f] transition-colors group" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 duration-200" data-icon="account_tree">account_tree</span>
            <span>Project Map</span>
          </a>
        </nav>
        <div className="px-6 mt-auto">
          <button className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg text-sm active:scale-95 transition-all">
            New Analysis
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-20 px-8 pb-12 min-h-screen bg-surface-container-low">
        
        {/* Hero Metrics */}
        <header className="mb-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-1">Team Analytics</h1>
              <p className="text-on-surface-variant font-medium">Real-time performance review for SnapCode nodes.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-surface-container-high text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-container-highest transition-colors">7 Days</button>
              <button className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg">30 Days</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-primary/10 rounded-lg text-primary material-symbols-outlined" data-icon="speed">speed</span>
                <span className="text-secondary text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                  +12%
                </span>
              </div>
              <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest mb-1">Review Velocity</p>
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">4.2m<span className="text-lg text-on-surface-variant/50 ml-1">avg</span></h2>
            </div>
            
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-tertiary/10 rounded-lg text-tertiary material-symbols-outlined" data-icon="verified_user">verified_user</span>
                <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest">Optimized</span>
              </div>
              <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest mb-1">False Positive Rate</p>
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">1.2%</h2>
            </div>
            
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="p-2 bg-secondary/10 rounded-lg text-secondary material-symbols-outlined" data-icon="timer">timer</span>
                <span className="text-primary text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" data-icon="bolt">bolt</span>
                  Record High
                </span>
              </div>
              <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest mb-1">Developer Hours Saved</p>
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">142h</h2>
            </div>
          </div>
        </header>

        {/* Trend Charts & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl relative flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-on-surface tracking-tight">Review Volume vs. Time</h3>
              <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div> AI Reviews</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 bg-surface-variant rounded-full"></div> Manual Audits</span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 flex items-end gap-1 relative mt-[auto]">
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-outline-variant/10">
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
              </div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-1/2 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-2/3 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-1/3 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-3/4 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-1/2 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-full relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-2/3 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-4/5 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-1/2 relative transition-all duration-700"></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-sm h-3/4 relative transition-all duration-700"></div>
            </div>
          </div>
          
          {/* Heatmap Section */}
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col">
            <h3 className="text-lg font-bold text-on-surface tracking-tight mb-6">Vulnerability Clusters</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-variant">Auth API</span>
                <div className="w-32 h-3 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-error"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-variant">Core Engine</span>
                <div className="w-32 h-3 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-tertiary"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-variant">Payments Web</span>
                <div className="w-32 h-3 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-secondary"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-on-surface-variant">Admin Dashboard</span>
                <div className="w-32 h-3 bg-surface-variant rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-primary"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-surface-container-high rounded-lg self-end w-full">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                <span className="material-symbols-outlined text-xs align-middle mr-1" data-icon="info">info</span>
                Critical cluster detected in <strong className="text-on-surface">Auth API</strong>. AI has generated a temporary patch rule.
              </p>
            </div>
          </div>
        </div>

        {/* Review History Table Mini */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-on-surface tracking-tight">Review History</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm border-none" data-icon="search">search</span>
              <input className="bg-surface-container-lowest border-none rounded-lg pl-10 text-sm w-64 focus:ring-1 focus:ring-primary text-on-surface outline-none" placeholder="Filter history..." type="text"/>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_30px_rgb(0,0,0,0.12)] border border-outline-variant/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/30">
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">PR Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Repository</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Author</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">AI Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">TTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-on-surface">feat: implement oauth2 flow</p>
                    <span className="text-[10px] text-on-surface-variant">PR-1294</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">obsidian-auth</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img alt="Alex J." className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTFTnzfBmVYcTSCLRd_jqysdkY4Pz72mcOa_SKQFJgWO63LAoNJqzlW0ZUlXzWDA7Oww1MSgIVYhpeDEDhV2To0hcBEY-f8YrxjPn2rsFTQbdBkTE9xvEoN-PeFZkCqt3icUbQ_sFhMGHMJg2DW_s1UyZ4E9ZYB0-rfhWWLO3C94mHiMnq2eqmu8modixQtFH78uwBwkGss7FkKVTjp9MkQRjSjWra0qWTnKtmBGUeJuRpbbIZwRY6BYs9fVJQ2_1gFRz6gKHZ6Qs"/>
                      <span className="text-sm font-medium text-on-surface">Alex J.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded">98/100</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> Merged
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">12m 30s</td>
                </tr>
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-on-surface">fix: memory leak in worker</p>
                    <span className="text-[10px] text-on-surface-variant">PR-1295</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">core-engine</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img alt="Sarah L." className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk9ZEO5en6nxXZv0OzJ7vkHyDORsJenWV6nElov8NfuNrec5nrCQxNl-0x8FyPdIAg8T3UwW8YZIEwQRsDMTZHxRdOuXBvb5EgdU2LznAvry0EYOT3_k5KOLss4dZrEKFzs96iFXXa-QMV1Y1Tnr4eTIQiOfuG0K7wDvSkbHXvaQaud--mwR0zmEGuuMZ5Ifk0t5dZYjwjb0YJ2X27cjdoDu3DKXY8EqbdAfn0B9dyN2gHvr1aLo34GQzAOGkFSJZlUwRQrIvhpkI"/>
                      <span className="text-sm font-medium text-on-surface">Sarah L.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-xs font-bold rounded">72/100</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">4m 12s</td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-surface-container-highest/20 flex justify-center border-t border-outline-variant/10">
              <button className="text-sm font-bold text-primary hover:underline">Load more history</button>
            </div>
          </div>
        </section>

        {/* Learned Rules Editor */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-on-surface tracking-tight">SnapCode Rule Forge</h3>
              <p className="text-sm text-on-surface-variant">Train the AI model with project-specific architectural constraints.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
              Commit Rule
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="bg-surface-container-lowest p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest">Natural Intent</h4>
              </div>
              <textarea 
                className="w-full h-48 bg-surface-container-low border-none rounded-xl p-4 text-on-surface text-sm placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary/40 outline-none resize-none font-medium leading-relaxed" 
                placeholder="e.g., Always check for proper error handling in the /api routes and ensure we never log PII data to console in production environments."
                defaultValue="Always check for proper error handling in the /api routes and ensure we never log PII data to console in production environments.">
              </textarea>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter cursor-pointer hover:bg-primary/20 transition-colors">API Routes</span>
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter cursor-pointer hover:bg-primary/20 transition-colors">Security</span>
                <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter cursor-pointer hover:bg-primary/20 transition-colors">Logging</span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">+ Add Context</span>
              </div>
            </div>
            
            <div className="bg-surface-container p-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary" data-icon="code">code</span>
                  <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest">Generated YAML</h4>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">LINT-RULE-882.yml</span>
              </div>
              <pre className="font-mono text-sm leading-relaxed text-on-surface-variant bg-surface-container-lowest/50 p-4 rounded-xl border border-white/5 overflow-x-auto">
{`version: 2.1
name: error_handling_pii_check
scope:
  paths: ["src/api/**", "apps/server/api/**"]
rules:
  - pattern: |
      try { ... } catch (e) {
        # Missing log/return
      }
    severity: critical
  - disallow: [console.log, console.dir]
    when: production
    reason: "PII leakage prevention"`}
              </pre>
            </div>
          </div>
        </section>
        
      </main>

    </div>
  );
}
