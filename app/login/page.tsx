"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/services/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/onboarding");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="landing" />

      <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-container-margin relative cyber-grid">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <GlassCard className="p-8 text-center space-y-8" glow="primary">
            {/* Header Icon */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield_with_heart
                </span>
              </div>
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Sign In to Sentinel AI</h1>
              <p className="font-body-md text-sm text-on-surface-variant">
                Access your real-time neural threat dashboard
              </p>
            </div>

            {/* OAuth Sign-In Button */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-neutral-100 text-neutral-900 font-label-md text-sm font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-surface-dim px-3 font-label-sm text-xs text-outline uppercase tracking-wider absolute">
                  Enterprise SSO
                </span>
              </div>

              <Link href="/onboarding">
                <CyberButton variant="ghost" fullWidth icon="key">
                  Use Work Email / SAML
                </CyberButton>
              </Link>
            </div>

            {/* Privacy Assurance Note */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-white/5 text-left space-y-2">
              <div className="flex items-center gap-2 text-primary font-label-sm text-xs">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>PRIVACY & SECURITY GUARANTEE</span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Sentinel AI processes email headers and security metadata only. We never read, store, or sell your personal emails.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
