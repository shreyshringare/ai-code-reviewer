"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen relative overflow-hidden flex flex-col items-center justify-center glow-bg">
      {/* Background Layer: ASCII & Terminal Content */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 overflow-hidden flex">
        <div className="w-1/2 h-full p-12 font-mono text-[11px] text-primary/40 leading-relaxed overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></span>
              <span className="text-primary/60 uppercase tracking-widest text-xs">INITIALIZING CORE...</span>
            </div>
            <div className="space-y-1">
              <p>&gt; analyzing_patterns... [OK]</p>
              <p>&gt; detecting_anomalies... [3 flagged]</p>
              <p>&gt; optimization_sequence: [||||||||||||||||||||||||| ] 74%</p>
              <p>01110111 01101001 01110100 01100011 01101000 01101001 01101110</p>
              <p>/ \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \ / \</p>
              <p>[ + ] LOG_INIT: x0249583_KERNEL_STATUS_OK</p>
              <p>&#123; "id": "wireframe_node", "pos": [12.4, 0.9, -4.2] &#125;</p>
              <p>/////////////////////////////////////////////////////////////////</p>
              <p>&lt; CODE_STREAM_ACTIVE &gt;</p>
              <p>01011001 01101111 01110101 00100000 01100001 01110010 01100101</p>
            </div>
            <div className="pt-8 opacity-20">
              <pre className="leading-none">
                {`          +--------------------------------------------+
          |  * ] TRACE: 0xDEADBEEF >> REDIRECTING_TO_CORE |
          +--------------------------------------------+`}
              </pre>
            </div>
            <div className="mt-20 ml-12 w-64 h-64 border border-dashed border-primary/15 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 border border-primary/10 rounded-full border-dashed flex items-center justify-center relative">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2"></div>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full absolute -bottom-0.5 left-1/2 -translate-x-1/2"></div>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full absolute top-1/2 -left-0.5 -translate-y-1/2"></div>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full absolute top-1/2 -right-0.5 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          <div className="ascii-scan-line"></div>
        </div>
      </div>

      {/* Header/Brand */}
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-on-surface">SnapCode</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-variant/80">
          <Link className="hover:text-primary transition-colors" href="#">Docs</Link>
          <Link className="hover:text-primary transition-colors" href="#">Pricing</Link>
          <Link className="hover:text-primary transition-colors" href="#">Changelog</Link>
          <Link className="bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/30 hover:bg-surface-container-highest transition-all" href="/auth/login">Sign In</Link>
        </nav>
      </header>

      {/* Central Content */}
      <main className="w-full h-full flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-md space-y-10">
          <header className="text-center space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-on-surface uppercase italic">Join the elite.</h1>
            <p className="text-on-surface-variant font-medium text-sm tracking-wide">Engineered for the modern developer workflow.</p>
          </header>

          <div className="glass-panel p-10 rounded-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] ml-1">Full Name</label>
                <div className="group relative flex items-center bg-surface-container-low/80 border border-outline-variant/30 rounded-lg focus-within:border-primary/50 transition-all">
                  <div className="pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">person</span>
                  </div>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/40 py-3.5 px-4 rounded-lg outline-none text-sm" placeholder="Nikola Tesla" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] ml-1">Email Address</label>
                <div className="group relative flex items-center bg-surface-container-low/80 border border-outline-variant/30 rounded-lg focus-within:border-primary/50 transition-all">
                  <div className="pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">mail</span>
                  </div>
                  <input className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/40 py-3.5 px-4 rounded-lg outline-none text-sm" placeholder="developer@snapcode.dev" type="email" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] ml-1">Password</label>
                  <div className="group relative flex items-center bg-surface-container-low/80 border border-outline-variant/30 rounded-lg focus-within:border-primary/50 transition-all">
                    <div className="pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">lock</span>
                    </div>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/40 py-3.5 px-4 rounded-lg outline-none text-sm" placeholder="••••••••" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] ml-1">Confirm</label>
                  <div className="group relative flex items-center bg-surface-container-low/80 border border-outline-variant/30 rounded-lg focus-within:border-primary/50 transition-all">
                    <div className="pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-lg group-focus-within:text-primary transition-colors">lock</span>
                    </div>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/40 py-3.5 px-4 rounded-lg outline-none text-sm" placeholder="••••••••" type="password" />
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-4 px-6 bg-primary text-on-primary-fixed font-bold rounded-lg shadow-[0_0_25px_rgba(189,194,255,0.2)] hover:shadow-[0_0_40px_rgba(189,194,255,0.4)] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest text-sm" type="submit">
                Create Account
              </button>
            </form>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <span className="text-[9px] font-bold text-outline uppercase tracking-[0.25em] whitespace-nowrap">Or continue with</span>
              <div className="h-px flex-1 bg-outline-variant/30"></div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button className="flex-1 flex items-center justify-center py-3 px-4 bg-surface-container-highest/30 border border-outline-variant/30 rounded-lg hover:bg-surface-container-highest/60 transition-colors group">
                <img alt="Google" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj1MMetqJZ8T0p3Ywm1aPeIZa0HDNca23rDNaCy5PelpjUKKbZeok4NtZZXzBSvEUirUAFCyNtjgjBtW0cOrO_R9XvcCXLQlnWiub_LO_dcDw_nzzLp0PNMuY_p9Kmxb1QORi0tEvSsPzNUGD8lpZVHAqpxTg7Mn5Dkc2vB_ovKbhuAuqD9x8Yi2ywBE7MJQd4HZpYBN4BPtWgvfpkLYmgpycvhA4OZnoQSEyzY-josW6G0fH2qQ3lx1cApnS3UJRDqHiUxSJ4uIQ" />
              </button>
              <button className="flex-1 flex items-center justify-center py-3 px-4 bg-surface-container-highest/30 border border-outline-variant/30 rounded-lg hover:bg-surface-container-highest/60 transition-colors group">
                <img alt="GitHub" className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADt7OaNYl37_Adsg-Dyf6-YcDCz_dzr5bJS2gJ_6Vz0SUTI9pvKHgJfnDg-7dniEXFepvunpDSzp-omhh5ipfwmJz6BKD1XtQCTNbDgBih6_70upX6WAgxWppWIcOeUc200K7oWbltF4_TeXnoyAVaBta4N86N54OqU3N-ikMoAKlwMZqXvPks8MarY0-wriaGjzBSpeVw6Wy7p2HBTbgrAUrm20oDN4jmG_0tBsDXyHLiXXpBh1fVRKcQGuwsJu7sAKeKYosK17Y" />
              </button>
            </div>
          </div>

          <footer className="text-center pt-2">
            <p className="text-[13px] text-on-surface-variant/80">
              Already have an account? 
              <Link className="text-primary font-bold hover:underline underline-offset-4 transition-all ml-1" href="/auth/login">Log in</Link>
            </p>
          </footer>
        </div>
      </main>

      {/* Status Pill */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-high/60 backdrop-blur rounded-full border border-outline-variant/20 text-[10px] font-mono text-outline uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(189,194,255,0.6)]"></span>
          Network Stable
        </div>
      </div>

      {/* Legal Footer */}
      <div className="absolute bottom-6 w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-outline uppercase tracking-[0.2em] opacity-40 z-20">
        <span>© 2026 SNAPCODE AI. FOR THE OBSIDIAN DEEP.</span>
        <div className="flex gap-8">
          <Link className="hover:text-primary transition-colors" href="#">Privacy</Link>
          <Link className="hover:text-primary transition-colors" href="#">Terms</Link>
          <Link className="hover:text-primary transition-colors" href="#">Status</Link>
        </div>
      </div>

      {/* Atmospheric Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] contrast-125 brightness-150" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd8CLU1wbgGTmiKOSz-wW9S-RlkGByM5ds6cRZKNi_r6wPZYDN0d8YTtJKjFYLV02DC5w4544ne5LE1tCDDRk_Npc2XW0Nj4gXIF1iZiWg5UbEo6mOGJ2NJqapg-SUUkahripx1-Zkq9QUPtQuNw0gkenvyTyAim0dikncfH-L5nmjHLaSVt_jX6LRLGmQLYd2YN6Qndzmxa_f6iNUaOscN8SWfUdG-FKqTAWZ6CLB2UY-g-S7ZvzZPUBXI3B4LtIjZB2cNRxuuEw')" }}></div>
    </div>
  );
}
