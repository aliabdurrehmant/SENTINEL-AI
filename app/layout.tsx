import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel AI | Advanced Phishing Protection",
  description: "Next-Gen Neural Phishing Defense & Inbox Security Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface-dim text-on-surface selection:bg-primary/30 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
