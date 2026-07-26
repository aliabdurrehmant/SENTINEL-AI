"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";

export default function ReportPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
            <Header variant="app" />
            <Sidebar />

            <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-7xl mx-auto w-full transition-all duration-300">
                {/* Header Section */}
                <div className="mb-8 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-label-sm text-xs uppercase tracking-widest">POST-ANALYSIS REPORT</span>
                        <span className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </div>
                    <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface">
                        Inbox Health Report
                    </h1>

                    <GlassCard className="p-6 mt-4 flex flex-col md:flex-row items-center gap-6" glow="primary">
                        <div className="relative w-28 h-28 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="#34d399"
                                    strokeWidth="8"
                                    strokeDasharray="264"
                                    strokeDashoffset="21"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="font-headline-lg text-2xl font-bold text-emerald-400">92</span>
                                <span className="text-[10px] font-label-sm text-outline">HEALTH</span>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-1">
                            <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                                Analyzed <span className="text-primary font-bold">24 inbound emails</span>. Your inbox health is safe overall, but contains{" "}
                                <span className="text-error font-bold">1 critical threat</span> and <span className="text-amber-400 font-bold">2 suspicious items</span> requiring review.
                            </p>
                        </div>
                    </GlassCard>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
                    {/* Threats Neutralized */}
                    <GlassCard className="md:col-span-4 p-6 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <h3 className="font-label-md text-xs text-outline uppercase">Threats Neutralized</h3>
                            <span className="material-symbols-outlined text-emerald-400">gpp_good</span>
                        </div>
                        <div className="py-8 flex flex-col items-center justify-center gap-2">
                            <span className="text-6xl font-bold text-emerald-400">1</span>
                            <span className="font-label-md text-xs text-on-surface-variant bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                                Credential Theft
                            </span>
                        </div>
                    </GlassCard>

                    {/* Suspicious Items */}
                    <GlassCard className="md:col-span-4 p-6 flex flex-col justify-between h-full animate-pulse">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <h3 className="font-label-md text-xs text-outline uppercase">Suspicious Items</h3>
                            <span className="material-symbols-outlined text-amber-400">warning</span>
                        </div>
                        <div className="py-8 flex flex-col items-center justify-center gap-2">
                            <span className="text-6xl font-bold text-amber-400">2</span>
                            <span className="font-label-md text-xs text-on-surface-variant bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                                Spoofed Domains
                            </span>
                        </div>
                    </GlassCard>

                    {/* Critical Actions */}
                    <GlassCard className="md:col-span-4 p-6 flex flex-col justify-between h-full">
                        <div className="pb-4 border-b border-white/5">
                            <h3 className="font-label-md text-xs text-outline uppercase">Critical Actions</h3>
                        </div>
                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low border border-white/5 hover:bg-white/5 cursor-pointer">
                                <span className="material-symbols-outlined text-primary text-sm">key</span>
                                <span className="font-label-sm text-xs text-on-surface">Update password for SOC account.</span>
                            </div>
                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low border border-white/5 hover:bg-white/5 cursor-pointer">
                                <span className="material-symbols-outlined text-primary text-sm">phonelink_lock</span>
                                <span className="font-label-sm text-xs text-on-surface">Verify Gmail 2FA configuration.</span>
                            </div>
                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low border border-white/5 hover:bg-white/5 cursor-pointer">
                                <span className="material-symbols-outlined text-error text-sm">mail</span>
                                <span className="font-label-sm text-xs text-error font-medium">Review intercepted 'Urgent' email.</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Bar Chart Sim */}
                    <GlassCard className="md:col-span-8 p-6 md:p-8 space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="font-headline-md text-lg font-bold text-on-surface">7-Day Threat Frequency</h3>
                                <p className="font-label-sm text-xs text-outline">Inbound threat velocity</p>
                            </div>
                            <div className="flex gap-3 font-label-sm text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    <span className="text-outline">Phishing</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-error" />
                                    <span className="text-outline">Malware</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-44 flex items-end justify-between gap-4 pt-4">
                            {[
                                { day: "MON", height: "h-24", bg: "bg-primary/40" },
                                { day: "TUE", height: "h-32", bg: "bg-primary/40" },
                                { day: "WED", height: "h-40", bg: "bg-primary/60" },
                                { day: "THU", height: "h-20", bg: "bg-error/50" },
                                { day: "FRI", height: "h-36", bg: "bg-primary/40" },
                            ].map((bar, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-2">
                                    <div className={`w-full bg-surface-container rounded-t-lg relative group ${bar.height} overflow-hidden`}>
                                        <div className={`absolute bottom-0 w-full ${bar.bg} transition-all group-hover:brightness-125 h-full`} />
                                    </div>
                                    <span className="font-label-sm text-[10px] text-outline">{bar.day}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Global Threat Map */}
                    <GlassCard className="md:col-span-4 p-6 relative overflow-hidden flex flex-col justify-between">
                        <div className="space-y-1 relative z-10">
                            <h4 className="font-label-md text-sm text-primary font-bold">Global Threat Vectors</h4>
                            <p className="font-label-sm text-xs text-outline">Primary origin: Eastern Europe & SE Asia</p>
                        </div>

                        <div className="h-36 rounded-xl bg-surface-container-high overflow-hidden relative flex items-center justify-center my-4 border border-white/5">
                            <div className="absolute inset-0 cyber-grid opacity-60" />
                            <span className="material-symbols-outlined text-primary text-4xl animate-pulse relative z-10">public</span>
                        </div>
                    </GlassCard>
                </div>

                {/* Action Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                    <Link href="/dashboard">
                        <CyberButton variant="primary" icon="arrow_forward">
                            Go to SOC Dashboard
                        </CyberButton>
                    </Link>
                    <Link href="/analysis">
                        <CyberButton variant="secondary" icon="visibility">
                            Inspect Intercepted Threats
                        </CyberButton>
                    </Link>
                </div>
            </main>

            <MobileNav />
            <Footer />
        </div>
    );
}
