"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";
import ThreatBadge from "@/components/ui/ThreatBadge";
import { auth } from "@/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current Firebase user:", user);
    });

    return () => unsubscribe();
  }, []);
  const threats = [
    {
      id: "th-101",
      sender: "security-alerts@unknown-domain.com",
      subject: "Urgent: Your account is locked",
      type: "Credential Theft",
      level: "critical" as const,
      time: "2 mins ago",
      riskScore: 98,
    },
    {
      id: "th-102",
      sender: "payroll@payrol-update-system.net",
      subject: "Direct Deposit Update Required",
      type: "Spoofed Domain",
      level: "warning" as const,
      time: "1 hour ago",
      riskScore: 74,
    },
    {
      id: "th-103",
      sender: "invoice-department@trusted-partner.com",
      subject: "Invoice #98422 Attached",
      type: "Suspicious Attachment",
      level: "warning" as const,
      time: "3 hours ago",
      riskScore: 68,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-7xl mx-auto w-full transition-all duration-300">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-outline font-label-sm text-xs mb-1">
              <span className="text-primary font-bold uppercase">SOC Dashboard</span>
              <span>/</span>
              <span>Live Threat Monitoring</span>
            </div>
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
              Security Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl border border-white/5 font-label-sm text-xs text-outline">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Last Scan: Just Now</span>
            </div>

            <Link href="/scan">
              <CyberButton variant="primary" icon="radar">
                Run AI Scan
              </CyberButton>
            </Link>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
          {/* AI Security Score Gauge Card */}
          <GlassCard className="md:col-span-5 p-6 flex flex-col items-center justify-center text-center relative" glow="primary">
            <p className="font-label-sm text-xs text-outline uppercase tracking-wider mb-6">Overall Inbox Security Score</p>

            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#b3c5ff"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset="21"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(179,197,255,0.4)]"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="font-display-lg text-4xl font-bold text-on-surface">92/100</span>
                <span className="font-label-sm text-xs text-emerald-400 font-bold tracking-widest mt-1">EXCELLENT</span>
              </div>
            </div>

            <p className="font-body-md text-xs text-on-surface-variant mt-6">
              24 emails scanned in the last 24 hours. 1 critical threat intercepted.
            </p>
          </GlassCard>

          {/* Quick Metrics Breakdown */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            <GlassCard className="p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-xs text-outline uppercase">Scanned Emails</span>
                <span className="material-symbols-outlined text-primary text-xl">mark_email_read</span>
              </div>
              <div className="mt-4">
                <span className="font-display-lg text-3xl font-bold text-on-surface">1,248</span>
                <p className="font-label-sm text-[10px] text-emerald-400 mt-1">+12% vs last week</p>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-xs text-outline uppercase">Clean Mail</span>
                <span className="material-symbols-outlined text-emerald-400 text-xl">gpp_good</span>
              </div>
              <div className="mt-4">
                <span className="font-display-lg text-3xl font-bold text-emerald-400">1,245</span>
                <p className="font-label-sm text-[10px] text-outline mt-1">99.7% safe rating</p>
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex flex-col justify-between" glow="error">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-xs text-outline uppercase">Threats Neutralized</span>
                <span className="material-symbols-outlined text-error text-xl">gpp_maybe</span>
              </div>
              <div className="mt-4">
                <span className="font-display-lg text-3xl font-bold text-error">3</span>
                <p className="font-label-sm text-[10px] text-error font-bold mt-1">Action required</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Recent Threats Activity Feed */}
        <section className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-xl font-semibold text-on-surface">Recent Intercepted Threats</h2>
            <Link href="/history" className="font-label-sm text-xs text-primary hover:underline">
              View All Security Logs →
            </Link>
          </div>

          <div className="space-y-3">
            {threats.map((t) => (
              <GlassCard key={t.id} className="p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/40 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-body-md font-semibold text-on-surface">{t.subject}</span>
                    <ThreatBadge level={t.level} label={t.type} pulse={t.level === "critical"} />
                  </div>
                  <p className="font-label-sm text-xs text-outline">From: {t.sender}</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-label-sm text-xs text-outline">{t.time}</span>
                  <Link href="/analysis">
                    <CyberButton variant="secondary" className="py-2 px-4 text-xs">
                      Inspect Threat
                    </CyberButton>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Neural Health Recommendations */}
        <GlassCard className="p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-semibold text-on-surface">Neural AI Recommendations</h3>
              <p className="font-label-sm text-xs text-outline">Automated optimization suggestions for your inbox security</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400 mt-0.5">key</span>
              <div>
                <p className="font-label-md text-sm text-on-surface font-medium">Enable 2FA on Connected Account</p>
                <p className="font-body-md text-xs text-on-surface-variant">Reduces account takeover risk by 99%.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary mt-0.5">mark_email_unread</span>
              <div>
                <p className="font-label-md text-sm text-on-surface font-medium">Automatic Quarantine Rules Active</p>
                <p className="font-body-md text-xs text-on-surface-variant">Phishing messages with confidence &gt;95% auto-blocked.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
