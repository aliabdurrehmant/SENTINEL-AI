"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";

export default function SettingsPage() {
  const [gmailConnected, setGmailConnected] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-3xl mx-auto w-full transition-all duration-300">
        {/* Page Title */}
        <div className="mb-8 space-y-2">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">Settings &amp; Preferences</h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Manage your account security, integrations, and privacy permissions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Account */}
          <div className="space-y-3">
            <h2 className="font-label-md text-xs text-primary uppercase tracking-wider px-1">Account Overview</h2>
            <GlassCard className="divide-y divide-white/5 overflow-hidden">
              <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg">
                      SJ
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-surface-dim" />
                  </div>
                  <div>
                    <p className="font-headline-md text-base text-on-surface font-semibold">Sarah Jenkins</p>
                    <p className="font-label-sm text-xs text-outline">sarah.j@sentinel-ai.io</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">badge</span>
                  </div>
                  <div>
                    <p className="font-body-md text-sm text-on-surface font-medium">SOC Role</p>
                    <p className="font-label-sm text-xs text-outline">Tier 1 Monitor (Verified)</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </div>
            </GlassCard>
          </div>

          {/* Section 2: Gmail Integration */}
          <div className="space-y-3">
            <h2 className="font-label-md text-xs text-primary uppercase tracking-wider px-1">Integrations</h2>
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="#EA4335" viewBox="0 0 24 24">
                      <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 6.58-9-6.58V21H1.5C.65 21 0 20.35 0 19.5v-15c0-1.17 1.26-1.88 2.22-1.22L12 10.4l9.78-7.12c.96-.66 2.22.05 2.22 1.22z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body-md text-sm text-on-surface font-semibold">Gmail Connection</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${gmailConnected ? "bg-emerald-500" : "bg-outline"}`} />
                      <p className={`font-label-sm text-xs ${gmailConnected ? "text-emerald-400" : "text-outline"}`}>
                        {gmailConnected ? "Connected & Protected" : "Disconnected"}
                      </p>
                    </div>
                  </div>
                </div>

                <CyberButton
                  onClick={() => setGmailConnected(!gmailConnected)}
                  variant="secondary"
                  className="py-2 px-4 text-xs"
                >
                  {gmailConnected ? "Disconnect" : "Connect"}
                </CyberButton>
              </div>
            </GlassCard>
          </div>

          {/* Section 3: Security & Privacy */}
          <div className="space-y-3">
            <h2 className="font-label-md text-xs text-primary uppercase tracking-wider px-1">Security &amp; Privacy</h2>
            <GlassCard className="divide-y divide-white/5 overflow-hidden">
              <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">policy</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface">Data Permissions &amp; Scopes</p>
                </div>
                <span className="material-symbols-outlined text-outline">open_in_new</span>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">lock_reset</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface">Two-Factor Authentication (2FA)</p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`font-label-sm text-xs px-3 py-1 rounded-full border ${
                    twoFactorEnabled
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-surface-container text-outline border-white/10"
                  }`}
                >
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Sign Out Action */}
          <div className="pt-6">
            <Link href="/login">
              <CyberButton variant="error" icon="logout" fullWidth>
                Sign Out of Sentinel AI
              </CyberButton>
            </Link>
          </div>
        </div>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
