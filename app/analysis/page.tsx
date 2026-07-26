"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";
import ThreatBadge from "@/components/ui/ThreatBadge";
import { AIThreatAnalysis } from "@/lib/services/ai";

export default function AnalysisPage() {
  const [showSimpleModal, setShowSimpleModal] = useState(false);
  const [result, setResult] = useState<AIThreatAnalysis | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("sentinel_last_scan");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        setResult(null);
      }
    }
    setLoaded(true);
  }, []);

  const levelToGlow: Record<string, "error" | "primary"> = {
    critical: "error",
    warning: "error",
    safe: "primary",
  };

  const levelToBadgeLabel: Record<string, string> = {
    critical: "CRITICAL THREAT",
    warning: "SUSPICIOUS",
    safe: "SAFE",
  };

  if (loaded && !result) {
    return (
      <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
        <Header variant="app" />
        <Sidebar />
        <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-3xl mx-auto w-full flex flex-col items-center justify-center text-center gap-4">
          <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
          <h1 className="font-headline-lg text-2xl font-bold">No Scan Results Yet</h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md">
            Run a scan first to see AI threat analysis here.
          </p>
          <Link href="/scan">
            <CyberButton variant="primary" icon="shield">Go to Scan</CyberButton>
          </Link>
        </main>
        <MobileNav />
        <Footer />
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-7xl mx-auto w-full transition-all duration-300">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-outline font-label-sm text-xs mb-2">
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Inbox Scan
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">Threat Analysis</span>
            </nav>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
              Security Analysis
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl border border-white/5 font-label-sm text-xs text-on-surface">
            <span className="material-symbols-outlined text-error text-lg">warning</span>
            <span>
              Analysis Complete: {result.threatLevel === "safe" ? "No threats detected" : `${levelToBadgeLabel[result.threatLevel]} detected`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-gutter">
            <GlassCard className="p-6 md:p-8" glow={levelToGlow[result.threatLevel]}>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="font-label-sm text-xs text-outline uppercase tracking-wider mb-1">Sender</p>
                    <p className="font-body-lg text-lg text-error font-semibold">{result.sender}</p>
                  </div>
                  <div>
                    <p className="font-label-sm text-xs text-outline uppercase tracking-wider mb-1">Subject</p>
                    <p className="font-headline-md text-xl font-bold text-on-surface">{result.subject}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <ThreatBadge level={result.threatLevel} label={levelToBadgeLabel[result.threatLevel]} pulse={result.threatLevel !== "safe"} />
                  <span className="font-label-sm text-xs text-outline">Just now</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-label-md text-sm text-primary font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">psychology</span>
                      AI Explanation
                    </h3>
                    <span className="bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-[10px] font-label-sm text-primary">
                      CONFIDENCE: {Math.round(result.confidenceScore * 100)}%
                    </span>
                  </div>

                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {result.explanation}
                  </p>

                  <button
                    onClick={() => setShowSimpleModal(true)}
                    className="w-full text-left bg-surface-container-high/50 border border-white/5 px-4 py-3 rounded-xl flex items-center justify-between group hover:bg-surface-container-high transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">chat</span>
                      <span className="font-label-md text-xs text-on-surface">Explain in Simple Language</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
                  </button>
                </div>

                <div className="bg-surface-container-lowest/50 rounded-xl p-4 border border-white/5 space-y-4">
                  <h3 className="font-label-md text-sm text-error font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">flag</span>
                    Red Flags Checklist
                  </h3>

                  {result.redFlags.length === 0 ? (
                    <p className="font-label-sm text-xs text-outline">No red flags detected.</p>
                  ) : (
                    <ul className="space-y-3">
                      {result.redFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-error text-lg">flag</span>
                          <p className="font-label-md text-xs text-on-surface font-semibold">{flag}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <CyberButton variant="error" icon="block" fullWidth={false} className="w-full sm:w-auto">
                  Block & Report Threat
                </CyberButton>
                <Link href="/scan" className="w-full sm:w-auto">
                  <CyberButton variant="secondary" icon="refresh" fullWidth={false} className="w-full sm:w-auto">
                    Scan Another Email
                  </CyberButton>
                </Link>
                <CyberButton variant="ghost" fullWidth={false} className="w-full sm:w-auto">
                  Ignore Warning
                </CyberButton>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-4 space-y-gutter">
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
              <p className="font-label-sm text-xs text-outline uppercase tracking-wider mb-6">Threat Risk Assessment</p>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#ffb4ab"
                    strokeWidth="8"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * result.riskScore) / 100}
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_8px_rgba(255,180,171,0.5)]"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="font-display-lg text-4xl font-bold text-on-surface">{result.riskScore}/100</span>
                  <span className="font-label-sm text-xs text-error font-bold tracking-widest mt-1">
                    {result.threatLevel === "critical" ? "HIGH RISK" : result.threatLevel === "warning" ? "MODERATE RISK" : "LOW RISK"}
                  </span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <p className="font-label-sm text-xs text-outline uppercase tracking-wider">Classification Vector</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-error/10 text-error border border-error/30 px-3 py-1 rounded-full font-label-sm text-xs font-bold">
                  {result.threatCategory}
                </span>
              </div>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <p className="font-label-sm text-xs text-outline uppercase tracking-wider">Plain-Language Summary</p>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {result.simplifiedExplanation}
              </p>
            </GlassCard>
          </div>
        </div>

        {showSimpleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <GlassCard className="max-w-md w-full p-6 space-y-4" glow="primary">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">chat</span>
                  Simplified AI Summary
                </h3>
                <button
                  onClick={() => setShowSimpleModal(false)}
                  className="material-symbols-outlined text-outline hover:text-white"
                >
                  close
                </button>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {result.simplifiedExplanation}
              </p>
              <CyberButton onClick={() => setShowSimpleModal(false)} variant="primary" fullWidth>
                Understood
              </CyberButton>
            </GlassCard>
          </div>
        )}
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
