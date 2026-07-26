import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5 bg-surface-dim mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-container-margin">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">shield</span>
            Sentinel AI
          </span>
          <p className="font-label-sm text-label-sm text-outline">
            © {new Date().getFullYear()} Sentinel AI. Cyber-Minimalist Security.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/settings" className="font-label-sm text-label-sm text-outline hover:text-secondary-fixed transition-colors">
            Privacy Policy
          </Link>
          <Link href="/settings" className="font-label-sm text-label-sm text-outline hover:text-secondary-fixed transition-colors">
            Terms of Service
          </Link>
          <Link href="/settings" className="font-label-sm text-label-sm text-outline hover:text-secondary-fixed transition-colors">
            Security Disclosure
          </Link>
          <Link href="/settings" className="font-label-sm text-label-sm text-outline hover:text-secondary-fixed transition-colors">
            API Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
