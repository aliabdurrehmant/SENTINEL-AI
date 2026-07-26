"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

interface HeaderProps {
  variant?: "landing" | "app";
}

export default function Header({ variant = "app" }: HeaderProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-dim/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,102,255,0.05)] h-16">
      <nav className="flex items-center justify-between px-container-margin h-full w-full max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield_with_heart
          </span>
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-primary">
            Sentinel AI
          </span>
        </Link>

        {variant === "landing" ? (
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`font-label-md text-label-md transition-colors ${pathname === "/" ? "text-primary font-bold" : "text-on-surface-variant hover:text-white"}`}>
              Home
            </Link>
            <Link href="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:bg-white/5 transition-colors px-2 py-1 rounded">
              Features
            </Link>
            <Link href="/report" className="font-label-md text-label-md text-on-surface-variant hover:bg-white/5 transition-colors px-2 py-1 rounded">
              Security Docs
            </Link>
            <Link href="/settings" className="font-label-md text-label-md text-on-surface-variant hover:bg-white/5 transition-colors px-2 py-1 rounded">
              API
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className={`font-label-md text-label-md transition-colors ${pathname === "/dashboard" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
              Dashboard
            </Link>
            <Link href="/scan" className={`font-label-md text-label-md transition-colors ${pathname === "/scan" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
              Inbox Scan
            </Link>
            <Link href="/analysis" className={`font-label-md text-label-md transition-colors ${pathname === "/analysis" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
              Analysis
            </Link>
            <Link href="/history" className={`font-label-md text-label-md transition-colors ${pathname === "/history" ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
              Security Logs
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {variant === "app" && (
            <div className="hidden md:flex items-center gap-3 mr-2">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-primary/30"
                />
              ) : (
                <span className="material-symbols-outlined text-[32px] text-primary">
                  account_circle
                </span>
              )}

              <div className="flex flex-col items-start">
                <span className="font-label-md text-label-md text-on-surface">
                  {user?.displayName || "SOC Analyst"}
                </span>

                <span className="font-label-sm text-label-sm text-outline">
                  {user?.email || "Tier 1 Monitor"}
                </span>
              </div>
            </div>
          )}
          <Link href="/login" className="flex items-center gap-2 text-primary active:scale-95 duration-200 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[28px]">account_circle</span>
            <span className="hidden sm:inline font-label-md text-label-md">
              {variant === "landing" ? "Login" : "Profile"}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
