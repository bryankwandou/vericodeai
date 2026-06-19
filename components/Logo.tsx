"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-sm" },
    md: { icon: 30, text: "text-base" },
    lg: { icon: 44, text: "text-xl" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/vericode-logo-mark.png"
        alt="VeriCode AI logo"
        width={s.icon}
        height={s.icon}
        priority
        className="shrink-0 dark:hidden"
      />
      <Image
        src="/vericode-logo-mark-white.png"
        alt="VeriCode AI logo"
        width={s.icon}
        height={s.icon}
        priority
        className="shrink-0 hidden dark:block"
      />
      {showText && (
        <span
          className={cn("font-semibold tracking-tight", s.text)}
          style={{ color: "var(--foreground)" }}
        >
          VeriCode <span style={{ color: "var(--brand)" }}>AI</span>
        </span>
      )}
    </div>
  );
}
