"use client";

import React from "react";

interface ThreatBadgeProps {
  level: "safe" | "warning" | "critical" | "clean";
  label?: string;
  icon?: string;
  pulse?: boolean;
}

export default function ThreatBadge({ level, label, icon, pulse = false }: ThreatBadgeProps) {
  const styles = {
    safe: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    clean: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    critical: "bg-error/10 text-error border-error/50",
  };

  const defaultIcons = {
    safe: "verified",
    clean: "gpp_good",
    warning: "warning",
    critical: "gpp_maybe",
  };

  const defaultLabels = {
    safe: "SAFE",
    clean: "CLEAN",
    warning: "SUSPICIOUS",
    critical: "CRITICAL",
  };

  return (
    <div
      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-label-md text-label-sm font-bold tracking-widest uppercase ${
        styles[level]
      } ${pulse && level === "critical" ? "threat-pulse" : ""}`}
    >
      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon || defaultIcons[level]}
      </span>
      <span>{label || defaultLabels[level]}</span>
    </div>
  );
}
