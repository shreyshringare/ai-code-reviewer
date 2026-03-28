"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNavBar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Agent", href: "/dashboard/create-agent" },
    { name: "History", href: "/dashboard/history" },
    { name: "Team", href: "/dashboard/team" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5 flex justify-between items-center h-16 px-8 font-['Inter'] tracking-tight antialiased">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-2xl font-black tracking-tighter text-[#bdc2ff]">
          SnapCode
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-[#bdc2ff] font-semibold border-b-2 border-[#bdc2ff] pb-1"
                  : "text-[#c7c4d7]/60 hover:text-[#bdc2ff] hover:bg-[#353439]/30 px-3 py-2 rounded-lg"
              } transition-all duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:bg-[#353439]/30 p-2 rounded-lg transition-all duration-300 active:scale-[0.98]">
          <span className="material-symbols-outlined text-[#bdc2ff]">notifications</span>
        </button>
        <button className="hover:bg-[#353439]/30 p-2 rounded-lg transition-all duration-300 active:scale-[0.98]">
          <span className="material-symbols-outlined text-[#bdc2ff]">settings</span>
        </button>
        <div className="w-8 h-8 rounded-full border border-primary/20 overflow-hidden">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzL9MlXy-MJd-KHe5ZkGOYFpzDstd6jDE5wgiOrE1krcVmF6zi9OO9gKIBHSTISmJtYmNyjdJjOrtVT2BrCjnkssz3DRJj4qWjnHYKIHK9dpRNk595rR3FDHZ-PsnJ1q4BCJz5MLpUiRaJWqtVYEHww0NawM2bg1D-dxJcJBlrIyh4KqTsaowIzFxMX0XeNlp77cHldzXd6vgdouv2E4tcOz8VgIOH1zeg52ZXC_RbWkKiDnyBjKcs0umpz1_ZBz2X002yqsU1sSA"
          />
        </div>
      </div>
    </nav>
  );
}
