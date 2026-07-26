"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: "monitoring", label: "Monitor" },
    { href: "/scan", icon: "mail_lock", label: "Scan" },
    { href: "/analysis", icon: "query_stats", label: "Analyze" },
    { href: "/report", icon: "verified_user", label: "Shield" },
    { href: "/settings", icon: "person", label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full h-20 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center px-4 pb-safe z-50 rounded-t-xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? "text-primary-fixed-dim bg-primary/10 rounded-xl px-3 py-1 scale-105"
                : "text-outline hover:text-on-surface"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
