"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar() {
  const pathname = usePathname();

  const primaryLinks = [
    { name: "Findings", href: "/dashboard/walkthrough", icon: "search_check" },
    { name: "Architecture", href: "/dashboard/architecture", icon: "account_tree" },
    { name: "Changes", href: "/dashboard/changes", icon: "rule" },
    { name: "History", href: "/dashboard/history", icon: "history" },
  ];

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-[#0e0e12] flex flex-col py-4 font-['JetBrains_Mono'] text-xs text-[#bdc2ff]">
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>terminal</span>
          </div>
          <div>
            <div className="font-bold text-on-surface">SnapCode Core</div>
            <div className="text-[10px] text-outline opacity-60">main branch</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "bg-[#bdc2ff]/10 text-[#bdc2ff] border-r-2 border-[#bdc2ff]"
                : "text-[#bdc2ff]/40 hover:text-[#bdc2ff]/80 hover:bg-[#1e1e24]"
            } px-4 py-3 flex items-center gap-3 cursor-pointer transition-all duration-150`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-4 pb-4 space-y-4">
        <button className="w-full bg-secondary-container/20 text-secondary border border-secondary/30 py-2 rounded flex items-center justify-center gap-2 hover:bg-secondary-container/30 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
          New Analysis
        </button>
        <div className="space-y-1">
          <div className="text-[#bdc2ff]/40 hover:text-[#bdc2ff]/80 px-2 py-1 flex items-center gap-2 cursor-pointer transition-all duration-150">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>description</span>
            <span>Documentation</span>
          </div>
          <div className="text-[#bdc2ff]/40 hover:text-[#bdc2ff]/80 px-2 py-1 flex items-center gap-2 cursor-pointer transition-all duration-150">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>help</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
