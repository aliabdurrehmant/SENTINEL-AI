"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";
import ShieldCanvas from "@/components/three/ShieldCanvas";
import { parseManualEmail } from "@/lib/services/gmail";
import { analyzeEmail } from "@/lib/services/ai";
import { saveScanResult } from "@/lib/services/firestore";
import { auth } from "@/firebase";

export default function ScanPage() {
  const router = useRouter();
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setError(null);

    if (!sender.trim() || !subject.trim()) {
      setError("Please enter at least a sender address and subject line.");
      return;
    }

    setIsScanning(true);
    try {
      const email = parseManualEmail({ sender, subject, content });
      const result = await analyzeEmail(email);

      // Persist this scan to Firestore under the logged-in user, if signed in.
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await saveScanResult(currentUser.uid, result);
        } catch (persistErr) {
          // Don't block the user from seeing their result if saving fails.
          console.error("Failed to save scan to history:", persistErr);
        }
      }

      // Store the real result so the Analysis page can render it.
      sessionStorage.setItem("sentinel_last_scan", JSON.stringify(result));
      router.push("/analysis");
    } catch (err: any) {
      setError(err?.message || "Something went wrong while scanning.");
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-4xl mx-auto w-full transition-all duration-300 flex flex-col items-center">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>MANUAL AI SCAN</span>
          </div>

          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">
            Scan an Email
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-lg mx-auto">
            Paste the sender, subject, and body of a suspicious email below.
            Sentinel AI will analyze it in real time using AI-driven threat
            detection.
          </p>
        </div>

        <GlassCard className="w-full p-8 space-y-6 relative overflow-hidden" glow="primary">
          {isScanning ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-full h-48 flex items-center justify-center relative">
                <ShieldCanvas className="w-full h-full" />
              </div>
              <p className="font-label-md text-sm text-primary animate-pulse">
                Analyzing email with Sentinel AI...
              </p>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              <div>
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider mb-1 block">
                  Sender Address
                </label>
                <input
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. security-alerts@unknown-domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-white/10 text-on-surface font-body-md text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider mb-1 block">
                  Subject Line
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Urgent: Your account is locked"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-white/10 text-on-surface font-body-md text-sm focus:outline-none focus:border-primary/60"
                />
              </div>

              <div>
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider mb-1 block">
                  Email Body (paste full text, including any links)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Paste the full email content here..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-white/10 text-on-surface font-body-md text-sm focus:outline-none focus:border-primary/60 resize-none"
                />
              </div>

              {error && (
                <p className="text-error font-body-md text-sm">{error}</p>
              )}

              <div className="pt-2 flex justify-center">
                <CyberButton variant="primary" icon="shield" onClick={handleScan}>
                  Run AI Scan
                </CyberButton>
              </div>
            </div>
          )}
        </GlassCard>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
