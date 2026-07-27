"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserScans, ScanRecord } from "@/lib/services/firestore";

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const results = await fetchUserScans(user.uid);
        setScans(results);
      } catch (err: any) {
        setError(err?.message || "Failed to load scan history.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const levelStyles: Record<string, { dot: string; badge: string }> = {
    safe: {
      dot: "border-emerald-400 text-emerald-400 bg-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    warning: {
      dot: "border-amber-400 text-amber-400 bg-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    critical: {
      dot: "border-error text-error bg-error",
      badge: "bg-error/10 text-error border-error/20",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-5xl mx-auto w-full transition-all duration-300">
        <div className="mb-12 space-y-2">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">Scan History &amp; Logs</h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xl">
            A real log of every email you've scanned with Sentinel AI, most recent first.
          </p>
        </div>

        {loading && (
          <p className="font-label-sm text-sm text-outline">Loading your scan history...</p>
        )}

        {!loading && error && (
          <p className="font-label-sm text-sm text-error">{error}</p>
        )}

        {!loading && !error && scans.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <span className="material-symbols-outlined text-5xl text-outline">history</span>
            <p className="font-body-md text-sm text-on-surface-variant">
              You haven't scanned any emails yet.
            </p>
            <Link href="/scan">
              <CyberButton variant="primary" icon="shield">Run Your First Scan</CyberButton>
            </Link>
          </div>
        )}

        {!loading && scans.length > 0 && (
          <div className="relative pl-6 border-l border-white/10 space-y-8 ml-4">
            {scans.map((scan) => {
              const style = levelStyles[scan.threatLevel] || levelStyles.warning;
              const isClean = scan.threatLevel === "safe";

              return (
                <div key={scan.id} className="relative group">
                  <div
                    className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-surface-dim flex items-center justify-center transition-transform group-hover:scale-125 ${style.dot.split(" ").slice(0, 2).join(" ")}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${style.dot.split(" ")[2]}`} />
                  </div>

                  <GlassCard className="p-6 space-y-4 hover:border-primary/40 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="font-label-sm text-xs text-primary font-bold tracking-widest">
                        {new Date(scan.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${style.badge}`}>
                        {scan.threatLevel}
                      </span>
                    </div>

                    <h3 className="font-headline-md text-xl font-semibold text-on-surface">{scan.subject}</h3>
                    <p className="font-label-sm text-xs text-outline">From: {scan.sender}</p>

                    <div className="flex items-center gap-8 pt-2 text-xs font-label-sm">
                      <div>
                        <span className="text-outline uppercase block text-[10px]">Risk Score</span>
                        <span className="font-body-md text-base text-on-surface font-semibold">{scan.riskScore}/100</span>
                      </div>
                      <div>
                        <span className="text-outline uppercase block text-[10px]">Category</span>
                        <span className={`font-body-md text-base font-semibold ${!isClean ? "text-error" : "text-emerald-400"}`}>
                          {scan.threatCategory}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
