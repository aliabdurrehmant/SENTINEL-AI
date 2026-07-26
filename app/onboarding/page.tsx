"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";

export default function OnboardingPage() {
  const router = useRouter();

  const handleGrantAccess = () => {
    // Initiate scanning workflow
    router.push("/scan");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="landing" />

      <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-container-margin relative cyber-grid">
        <div className="w-full max-w-2xl relative z-10 space-y-6">
          <GlassCard className="p-8 md:p-10 space-y-8" glow="primary">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs border border-primary/20">
                <span className="material-symbols-outlined text-xs">tune</span>
                <span>STEP 1 OF 2: INTELLIGENCE CONNECTION</span>
              </div>

              <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                Connect Your Gmail Account
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant max-w-lg mx-auto">
                Authorize Sentinel AI to analyze inbound message headers and protect your mailbox from malicious threats.
              </p>
            </div>

            {/* Permission Scopes Grid */}
            <div className="space-y-4">
              <h2 className="font-label-md text-xs text-outline uppercase tracking-wider">Required Security Scopes</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-primary font-label-md text-sm font-semibold">
                    <span className="material-symbols-outlined text-base">mark_email_read</span>
                    <span>Read Headers & Metadata</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Allows neural analysis of SPF, DKIM records, sender addresses, and domain reputations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-secondary-fixed font-label-md text-sm font-semibold">
                    <span className="material-symbols-outlined text-base">link</span>
                    <span>Scan Links & Redirects</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Sandboxes embedded URLs to verify redirect safety before email delivery.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-label-md text-sm font-semibold">
                    <span className="material-symbols-outlined text-base">security</span>
                    <span>Automated Quarantine</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Moves critical phishing threats into Sentinel Quarantine with your explicit approval.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-tertiary font-label-md text-sm font-semibold">
                    <span className="material-symbols-outlined text-base">visibility_off</span>
                    <span>No Message Storage</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant">
                    Email contents are processed ephemerally in RAM and never written to permanent disk.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <CyberButton
                onClick={handleGrantAccess}
                variant="primary"
                icon="shield"
                fullWidth
              >
                Grant Access & Begin Scan
              </CyberButton>

              <Link href="/dashboard" className="w-full sm:w-auto">
                <CyberButton variant="secondary" fullWidth>
                  Skip for Now
                </CyberButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
