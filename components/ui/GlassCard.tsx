"use client";

import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "none" | "primary" | "error" | "amber";
  hoverEffect?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glow = "none",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    none: "",
    primary: "cyber-glow-primary",
    error: "cyber-glow-error",
    amber: "shadow-[0_0_20px_rgba(251,191,36,0.1)]",
  };

  return (
    <div
      className={`glass-card rounded-xl ${glowClasses[glow]} ${
        hoverEffect ? "hover:border-white/20 transition-all duration-300" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
