import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeriCode AI — AI-Powered Developer Platform",
  description:
    "Practice coding, get AI assistance, track progress, and ace your interviews with VeriCode AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
