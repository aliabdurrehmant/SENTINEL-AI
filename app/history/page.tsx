"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import CyberButton from "@/components/ui/CyberButton";

export default function HistoryPage() {
  const historyLogs = [
    {
      date: "OCT 24, 2024",
      status: "CLEAN",
      title: "Daily Inbox Integrity Scan",
      files: 150,
      threats: 0,
      isClean: true,
    },
    {
      date: "OCT 23, 2024",
      status: "ACTION TAKEN",
      title: "Deep Heuristic Network Analysis",
      files: 312,
      threats: 2,
      isClean: false,
    },
    {
      date: "OCT 21, 2024",
      status: "CLEAN",
      title: "Cloud Message Audit",
      files: 1200,
      threats: 0,
      isClean: true,
    },
    {
      date: "OCT 19, 2024",
      status: "CLEAN",
      title: "Initial Perimeter Audit",
      files: 850,
      threats: 0,
      isClean: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim text-on-surface">
      <Header variant="app" />
      <Sidebar />

      <main className="flex-grow pt-24 pb-32 md:pl-24 group-hover:md:pl-72 px-container-margin max-w-5xl mx-auto w-full transition-all duration-300">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface">Scan History &amp; Logs</h1>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xl">
            Comprehensive audit log of all neural security scans, intercepted threats, and system integrity status.
          </p>
        </div>

        {/* Timeline Log List */}
        <div className="relative pl-6 border-l border-white/10 space-y-8 ml-4">
          {historyLogs.map((log, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-surface-dim flex items-center justify-center transition-transform group-hover:scale-125 ${
                  log.isClean ? "border-emerald-400 text-emerald-400" : "border-amber-400 text-amber-400"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${log.isClean ? "bg-emerald-400" : "bg-amber-400"}`} />
              </div>

              {/* Card content */}
              <GlassCard className="p-6 space-y-4 hover:border-primary/40 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="font-label-sm text-xs text-primary font-bold tracking-widest">{log.date}</span>
                  <span
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                      log.isClean
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <h3 className="font-headline-md text-xl font-semibold text-on-surface">{log.title}</h3>

                <div className="flex items-center gap-8 pt-2 text-xs font-label-sm">
                  <div>
                    <span className="text-outline uppercase block text-[10px]">Items Scanned</span>
                    <span className="font-body-md text-base text-on-surface font-semibold">{log.files}</span>
                  </div>
                  <div>
                    <span className="text-outline uppercase block text-[10px]">Threats Found</span>
                    <span className={`font-body-md text-base font-semibold ${log.threats > 0 ? "text-error" : "text-emerald-400"}`}>
                      {log.threats}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CyberButton variant="secondary" icon="refresh">
            Load Previous Logs
          </CyberButton>
        </div>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
}
