import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";
import ThreatBadge from "@/components/ui/ThreatBadge";
import ShieldCanvas from "@/components/three/ShieldCanvas";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="landing" />

      <main className="flex-grow pt-24 pb-20 px-container-margin max-w-7xl mx-auto w-full cyber-grid">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-label-sm mb-6 animate-pulse">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>NEURAL DEFENSE ENGINE V2.4 ACTIVE</span>
          </div>

          <h1 className="font-display-lg text-4xl md:text-6xl font-bold tracking-tight text-on-surface max-w-4xl leading-tight mb-6">
            Protect Your Inbox with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary-fixed to-primary-container">Neural AI</span>
          </h1>

          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
            Sentinel AI monitors your inbox in real time, detecting phishing, domain spoofing, and zero-day attacks before you click.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <CyberButton variant="primary" icon="mail" fullWidth>
                Connect Gmail
              </CyberButton>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <CyberButton variant="secondary" icon="explore" fullWidth>
                How It Works
              </CyberButton>
            </Link>
          </div>

          {/* 3D Shield & Interactive Preview Card */}
          <div className="mt-16 w-full max-w-4xl relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <GlassCard className="p-6 md:p-8 relative z-10 overflow-hidden" glow="primary">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="w-full md:w-1/2 h-64 flex items-center justify-center">
                  <ShieldCanvas className="w-full h-full" />
                </div>

                <div className="w-full md:w-1/2 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Live Protection Demo</span>
                    <ThreatBadge level="critical" label="THREAT INTERCEPTED" pulse />
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 space-y-2">
                    <p className="font-label-sm text-label-sm text-error font-medium">From: security@paypal-verification-alert.com</p>
                    <p className="font-headline-md text-base text-on-surface font-semibold">Urgent: Account access suspended within 24 hours</p>
                    <p className="font-body-md text-xs text-on-surface-variant">
                      AI Detection: High-pressure urgency tactics combined with spoofed domain signature. Confidence 99.4%.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-outline font-label-sm pt-2">
                    <span>Scan Speed: 14ms</span>
                    <span>Heuristic Risk: 98/100</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-16 border-t border-white/5 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Architected for Zero-Trust Email Security</h2>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
              Combines edge machine learning models with cryptographic metadata verification to neutralize cyber threats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <GlassCard className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <h3 className="font-headline-md text-xl font-semibold text-on-surface">Real-Time Heuristics</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Evaluates message semantics, language urgency, link destinations, and DKIM/SPF parameters in milliseconds.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed/10 text-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">shield_locked</span>
              </div>
              <h3 className="font-headline-md text-xl font-semibold text-on-surface">Zero-Day Detection</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Identifies emerging phishing campaigns before public blocklists update using neural behavioral modeling.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <h3 className="font-headline-md text-xl font-semibold text-on-surface">Privacy-First Architecture</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Sentinel AI processes metadata and headers securely. Your raw email contents are never stored or mined.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <GlassCard className="p-10 md:p-14 max-w-4xl mx-auto space-y-6" glow="primary">
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface">
              Ready to Secure Your Inbox?
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-lg mx-auto">
              Join thousands of SOC analysts and professionals relying on Sentinel AI for proactive email defense.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/onboarding">
                <CyberButton variant="primary" icon="arrow_forward">
                  Connect Gmail Now
                </CyberButton>
              </Link>
            </div>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
