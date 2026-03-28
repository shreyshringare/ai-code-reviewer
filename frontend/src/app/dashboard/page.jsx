export default function Dashboard() {
  return (
    <div className="bg-background selection:bg-primary/30 min-h-screen text-on-background font-body">
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5 flex justify-between items-center h-16 px-8 tracking-tight antialiased">
        <div className="text-2xl font-black tracking-tighter text-[#bdc2ff]">SnapCode</div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-[#bdc2ff] font-semibold border-b-2 border-[#bdc2ff] pb-1 transition-all duration-300" href="#">Dashboard</a>
          <a className="text-[#353439] hover:text-[#bdc2ff] transition-colors hover:bg-[#353439]/30 rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard/create-agent">Create Agent</a>
          <a className="text-[#353439] hover:text-[#bdc2ff] transition-colors hover:bg-[#353439]/30 rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard/history">History</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="hover:bg-[#353439]/30 p-2 rounded-lg transition-all duration-300 active:scale-[0.98]">
            <span className="material-symbols-outlined text-[#bdc2ff] text-[24px]">notifications</span>
          </button>
          <button className="hover:bg-[#353439]/30 p-2 rounded-lg transition-all duration-300 active:scale-[0.98]">
            <span className="material-symbols-outlined text-[#bdc2ff] text-[24px]">settings</span>
          </button>
          <img 
            alt="User profile avatar" 
            className="w-8 h-8 rounded-full border border-primary/20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzL9MlXy-MJd-KHe5ZkGOYFpzDstd6jDE5wgiOrE1krcVmF6zi9OO9gKIBHSTISmJtYmNyjdJjOrtVT2BrCjnkssz3DRJj4qWjnHYKIHK9dpRNk595rR3FDHZ-PsnJ1q4BCJz5MLpUiRaJWqtVYEHww0NawM2bg1D-dxJcJBlrIyh4KqTsaowIzFxMX0XeNlp77cHldzXd6vgdouv2E4tcOz8VgIOH1zeg52ZXC_RbWkKiDnyBjKcs0umpz1_ZBz2X002yqsU1sSA"
          />
        </div>
      </nav>

      {/* Background Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-secondary/10 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Top Section: Input Strategies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Upload Card */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-500 group cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[24px]">upload_file</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Upload Source</h3>
                <p className="text-on-surface-variant text-sm">Analyze local files or folders</p>
              </div>
            </div>
            
            <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-10 flex flex-col items-center justify-center space-y-4 group-hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors">cloud_upload</span>
              <span className="text-on-surface-variant font-medium">Drop files here or <span className="text-primary underline">browse</span></span>
            </div>
          </div>

          {/* GitHub Repo Card */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 hover:border-secondary/20 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                <span className="material-symbols-outlined text-[24px]">terminal</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Review Repository</h3>
                <p className="text-on-surface-variant text-sm">Directly pull from GitHub</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="relative">
                <input className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="Enter repository URL" type="text" />
              </div>
              <button className="w-full bg-secondary text-on-secondary-fixed font-bold py-3 rounded-lg active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(221,183,255,0.3)]">
                Link Repo
              </button>
            </div>
          </div>
          
        </section>

        {/* Main Section: Code Editor Panel */}
        <section className="relative">
          <div className="glass-panel rounded-xl border border-white/5 code-glow overflow-hidden">
            
            {/* Editor Header */}
            <div className="bg-surface-container-low px-6 py-3 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-error/40"></div>
                  <div className="w-3 h-3 rounded-full bg-tertiary/40"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                </div>
                <span className="text-xs font-mono text-outline-variant">src/auth/session_manager.py</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-surface-container-highest px-3 py-1 rounded text-xs font-mono text-primary uppercase tracking-widest">Python</span>
              </div>
            </div>
            
            {/* Editor Body */}
            <div className="flex bg-[#0e0e12] min-h-[500px]">
              {/* Line Numbers */}
              <div className="w-12 pt-6 flex flex-col items-center text-outline-variant font-mono text-sm border-r border-white/5 select-none">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
              </div>
              
              {/* Code Content */}
              <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-x-auto no-scrollbar">
                <pre className="text-on-surface/90"><code>
<span className="text-secondary">import</span> os
<span className="text-secondary">from</span> datetime <span className="text-secondary">import</span> datetime, timedelta

<span className="text-primary">class</span> <span className="text-tertiary">SessionManager</span>:
    <span className="text-primary">def</span> <span className="text-secondary">__init__</span>(self, secret_key: str):
        self.secret = secret_key
        self.active_sessions = {"{}"}

    <span className="text-primary">def</span> <span className="text-secondary">create_session</span>(self, user_id: str):
        <span className="text-outline-variant"># BUG: Potential session hijacking risk due to weak token generation</span>
        token = os.urandom(<span className="text-tertiary">16</span>).hex() 
        expiry = datetime.now() + timedelta(hours=<span className="text-tertiary">24</span>)
        
        <span className="text-outline-variant"># PERFORMANCE: Dictionary lookup could be optimized with Redis</span>
        self.active_sessions[token] = {"{"}<span className="text-on-surface-variant">"user_id"</span>: user_id, <span className="text-on-surface-variant">"expiry"</span>: expiry{"}"}
        <span className="text-secondary">return</span> token
                </code></pre>
              </div>
            </div>
            
            {/* Floating Review Action */}
            <div className="absolute bottom-8 right-8 text-white">
              <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-on-secondary-fixed font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                Review Code
              </button>
            </div>
            
          </div>
        </section>

        {/* Bottom Section: AI Review Results */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-2 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[28px]">analytics</span>
            Intelligence Insights
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Insight Panel */}
            <div className="lg:col-span-2 glass-panel rounded-xl p-8 border border-white/5 space-y-6">
              <div className="prose prose-invert max-w-none">
                <h4 className="text-secondary font-bold text-lg mb-4">Summary Analysis</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  The codebase demonstrates modern Pythonic patterns but exhibits critical vulnerabilities in the **Session Management** layer. The encryption vectors are insufficient for production environments.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-error mt-0.5" style={{fontSize: "18px"}}>dangerous</span>
                    <span className="text-on-surface">Weak token entropy detected in <code className="bg-surface-container-highest px-1.5 rounded">create_session</code>.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary mt-0.5" style={{fontSize: "18px"}}>speed</span>
                    <span className="text-on-surface">Memory leakage risk in global <code className="bg-surface-container-highest px-1.5 rounded">active_sessions</code> dictionary.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Tags & Status Bento */}
            <div className="space-y-6">
              
              {/* Criticality Card */}
              <div className="glass-panel rounded-xl p-6 border border-white/5 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-4 border-error/20 flex items-center justify-center mb-4">
                  <span className="text-error font-black text-xl">82</span>
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-outline-variant">Risk Score</span>
                <h4 className="text-on-surface font-bold mt-1">High Urgency</h4>
              </div>
              
              {/* Tags Card */}
              <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-outline-variant">Detected Categories</span>
                <div className="flex flex-wrap gap-2 pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-container/10 border border-tertiary-container/20 text-tertiary">
                    <span className="material-symbols-outlined" style={{fontSize: "14px"}}>bug_report</span>
                    <span className="text-xs font-bold uppercase tracking-tight">Bug Detection</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary">
                    <span className="material-symbols-outlined" style={{fontSize: "14px"}}>bolt</span>
                    <span className="text-xs font-bold uppercase tracking-tight">Performance</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary">
                    <span className="material-symbols-outlined" style={{fontSize: "14px"}}>shield</span>
                    <span className="text-xs font-bold uppercase tracking-tight">Security</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
        
      </main>

      {/* Visual Polish: Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
        style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuChFhOQCVfLD6wo0c_st5bbENwEEjdk7tgBHBtC4u2A-LMBkMBIultNEzbE0WETsEcj60juDVmZxogrduwHvxdzA6ay8BGx0TjpUNysXA6SSxwTc_KJ0TmGDV5NwAeM-_D9gWRqiIkqSVnqe3rb1DZRes-u8g2HmjJDldbvM5cfJwpbo55dX-g43HcdnsiOkUBJM-s-YKHFb3hvrBb1-y320AE5esPn9fUvigX1kkCWUYT_0qmZiGmt4Jdw-4IiAmJ0-nzCgFzM0us')"}}>
      </div>
      
    </div>
  );
}
