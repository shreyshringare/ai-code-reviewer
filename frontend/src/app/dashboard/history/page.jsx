export default function ReviewHistory() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 text-on-surface bg-background font-body">
      
      {/* TopNavBar Shell */}
      <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5 flex justify-between items-center h-16 px-8 tracking-tight antialiased">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</span>
          <div className="hidden md:flex items-center gap-6">
            <a className="font-sans text-sm font-medium tracking-tight text-[#353439] hover:text-[#bdc2ff] rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard">Dashboard</a>
            <a className="font-sans text-sm font-medium tracking-tight text-[#353439] hover:text-[#bdc2ff] rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard/create-agent">Create Agent</a>
            <a className="font-sans text-sm font-medium tracking-tight text-[#bdc2ff] border-b-2 border-primary/50 pb-1" href="/dashboard/history">History</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 transition-all duration-200 rounded-full active:scale-95">
            <span className="material-symbols-outlined text-primary-fixed-dim">notifications</span>
          </button>
          <button className="p-2 hover:bg-white/5 transition-all duration-200 rounded-full active:scale-95">
            <span className="material-symbols-outlined text-primary-fixed-dim">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10 ml-2">
            <img alt="User profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZbMQODI5ct7JHX-jj0r6XvaqPt2q5TmpEUAyoSrjqrAyumCTWeOQGiXDydKTP0wGeHgSFx7GQyAvP9zWLIRqYS4KzYV6j7mUwRweI752j0Rj9EQ6MbECXGV6cxE-h52-hEz4eHApt_NRODtZib79kgyi0ZlTCwKtZpL3DFjYs2qxwLOIivx6Z7HWPlLrOXVhs0JBofG6L3uNJUsyCLlRtig5b2eAzOPcmp1ltZwClSQzGXvzvMeub5AQChigXrRMSWil_NeaI0FQ"/>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-headline font-extrabold text-primary-fixed-dim tracking-tight mb-2">Review History</h1>
          <p className="text-on-surface-variant font-body text-sm max-w-2xl">Browse through your previous AI-assisted code reviews and security audits. Your AI insights are archived for architectural reference.</p>
        </header>
        
        {/* Stats Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Total Reviews</p>
            <h3 className="text-3xl font-headline font-bold text-on-surface">1,284</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-secondary shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Bugs Caught</p>
            <h3 className="text-3xl font-headline font-bold text-on-surface">432</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-tertiary shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Security Flags</p>
            <h3 className="text-3xl font-headline font-bold text-on-surface">18</h3>
          </div>
        </div>
        
        {/* History List */}
        <div className="space-y-4">
          
          {/* Review Card 1 */}
          <div className="group relative obsidian-glow transition-all duration-300 bg-surface-container-low/80 hover:bg-surface-container-high p-5 rounded-xl border border-white/5 cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-lg tracking-tight">SnapCode / Core</span>
                  <span className="bg-surface-variant text-[10px] px-2 py-0.5 rounded text-on-surface-variant font-mono uppercase tracking-wider">Python</span>
                </div>
                <div className="font-mono text-xs text-on-surface-variant/80 bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className="text-secondary-fixed-dim">def</span> <span className="text-on-surface">process_payload</span>(data): <span className="text-outline"># Sanitizing input for SQL injection...</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <span className="text-xs font-mono text-outline">2 hours ago</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container/20 border border-error/20">
                    <span className="material-symbols-outlined text-[14px] text-error">bug_report</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-error">3 bugs</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/20">
                    <span className="material-symbols-outlined text-[14px] text-secondary">security</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">2 security flags</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary-fixed-dim">chevron_right</span>
            </div>
          </div>
          
          {/* Review Card 2 */}
          <div className="group relative obsidian-glow transition-all duration-300 bg-surface-container-low/80 hover:bg-surface-container-high p-5 rounded-xl border border-white/5 cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-lg tracking-tight">WebUI / React-Dash</span>
                  <span className="bg-surface-variant text-[10px] px-2 py-0.5 rounded text-on-surface-variant font-mono uppercase tracking-wider">TypeScript</span>
                </div>
                <div className="font-mono text-xs text-on-surface-variant/80 bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className="text-secondary-fixed-dim">export const</span> <span className="text-on-surface">useAuth</span> = () =&gt; {"{"} <span className="text-outline">useEffect(() =&gt; {"{"} checkToken() {"}"}, [])</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <span className="text-xs font-mono text-outline">5 hours ago</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/20 border border-primary/20">
                    <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">1 optimization</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary-fixed-dim">chevron_right</span>
            </div>
          </div>
          
          {/* Review Card 3 */}
          <div className="group relative obsidian-glow transition-all duration-300 bg-surface-container-low/80 hover:bg-surface-container-high p-5 rounded-xl border border-white/5 cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-lg tracking-tight">DataEngine / Spark-ETL</span>
                  <span className="bg-surface-variant text-[10px] px-2 py-0.5 rounded text-on-surface-variant font-mono uppercase tracking-wider">Scala</span>
                </div>
                <div className="font-mono text-xs text-on-surface-variant/80 bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className="text-secondary-fixed-dim">val</span> <span className="text-on-surface">df</span> = spark.read.parquet(path).filter(<span className="text-tertiary">$`"valid"` === true</span>)
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <span className="text-xs font-mono text-outline">Yesterday</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/20 border border-tertiary/20">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">priority_high</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Critical Leak</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary-fixed-dim">chevron_right</span>
            </div>
          </div>
          
          {/* Review Card 4 */}
          <div className="group relative obsidian-glow transition-all duration-300 bg-surface-container-low/80 hover:bg-surface-container-high p-5 rounded-xl border border-white/5 cursor-pointer opacity-80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-lg tracking-tight">SnapCode / CLI</span>
                  <span className="bg-surface-variant text-[10px] px-2 py-0.5 rounded text-on-surface-variant font-mono uppercase tracking-wider">Go</span>
                </div>
                <div className="font-mono text-xs text-on-surface-variant/80 bg-surface-container-lowest/80 p-3 rounded-lg border border-white/5 overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className="text-secondary-fixed-dim">func</span> <span className="text-on-surface">Execute</span>(cmd *cobra.Command) <span className="text-outline">{"{"} runCLI() {"}"}</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <span className="text-xs font-mono text-outline">2 days ago</span>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-outline/20 border border-outline/20">
                    <span className="material-symbols-outlined text-[14px] text-outline">check_circle</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-outline">No issues found</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-primary-fixed-dim">chevron_right</span>
            </div>
          </div>
          
        </div>
        
        {/* Load More Section */}
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 bg-surface-container-highest/50 hover:bg-surface-container-highest transition-colors rounded-lg border border-white/5 text-sm font-medium text-primary-fixed-dim flex items-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-lg">history</span>
            Load older reviews
          </button>
        </div>
      </main>

      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-secondary/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}
