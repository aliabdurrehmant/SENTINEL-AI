"use client";

import React from "react";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error" | "ghost";
  icon?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function CyberButton({
  variant = "primary",
  icon,
  children,
  fullWidth = false,
  className = "",
  ...props
}: CyberButtonProps) {
  const baseStyles = "font-label-md text-label-md px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary-container text-on-primary-container cyber-glow-btn hover:brightness-110",
    secondary: "bg-transparent border border-white/20 text-on-surface hover:bg-white/5 hover:border-white/40",
    error: "bg-error text-on-error hover:brightness-110 shadow-lg shadow-error/20",
    ghost: "bg-surface-container-high/50 border border-white/5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined text-xl" data-icon={icon}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}
