"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/analysis", icon: "security", label: "Threat Intelligence" },
    { href: "/scan", icon: "mail_lock", label: "Inbox Scan" },
    { href: "/history", icon: "history_edu", label: "Security Logs" },
    { href: "/report", icon: "query_stats", label: "Inbox Report" },
    { href: "/settings", icon: "settings", label: "Settings" },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 hover:w-64 bg-surface-dim/95 backdrop-blur-2xl border-r border-white/5 z-[60] transition-all duration-300 ease-in-out flex-col group overflow-hidden shadow-2xl shadow-black">
      <div className="flex flex-col py-6 gap-2 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-3 transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              <span className="font-label-md text-label-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
            <span className="material-symbols-outlined text-sm">shield</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md text-on-surface truncate">SOC Analyst</p>
            <p className="text-[10px] text-outline uppercase font-bold tracking-widest">Active Monitor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
