export default function ChangesPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 text-on-surface bg-background font-body">

      {/* TopNav */}
      <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5 flex justify-between items-center h-16 px-8 tracking-tight antialiased">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-[#bdc2ff]">SnapCode</span>
          <div className="hidden md:flex items-center gap-6">
            <a className="font-sans text-sm font-medium tracking-tight text-[#c7c4d7] hover:text-[#bdc2ff] rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard">Dashboard</a>
            <a className="font-sans text-sm font-medium tracking-tight text-[#bdc2ff] border-b-2 border-primary/50 pb-1" href="/dashboard/changes">Changes</a>
            <a className="font-sans text-sm font-medium tracking-tight text-[#c7c4d7] hover:text-[#bdc2ff] rounded-lg px-3 py-2 transition-all duration-300" href="/dashboard/history">History</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 transition-all duration-200 rounded-full active:scale-95">
            <span className="material-symbols-outlined text-primary-fixed-dim">notifications</span>
          </button>
          <button className="p-2 hover:bg-white/5 transition-all duration-200 rounded-full active:scale-95">
            <span className="material-symbols-outlined text-primary-fixed-dim">settings</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl font-headline font-extrabold text-primary-fixed-dim tracking-tight mb-2">Changes</h1>
          <p className="text-on-surface-variant font-body text-sm max-w-2xl">Track file-level diffs, rule violations, and suggested fixes across your latest review sessions.</p>
        </header>

        {/* Placeholder content */}
        <div className="flex flex-col items-center justify-center min-h-[40vh] rounded-2xl border border-white/5 bg-surface-container-low gap-4">
          <span className="material-symbols-outlined text-primary/40" style={{ fontSize: "64px" }}>rule</span>
          <p className="text-on-surface-variant text-sm">No changes tracked yet. Run a review to see file-level diffs and rule violations.</p>
          <a href="/dashboard" className="mt-2 px-5 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary/20 transition-colors">
            Go to Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
