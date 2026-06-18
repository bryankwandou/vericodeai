import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-sm" },
    md: { icon: 32, text: "text-base" },
    lg: { icon: 48, text: "text-xl" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric network / code verification icon */}
        <rect x="0" y="0" width="32" height="32" rx="6" fill="currentColor" className="text-foreground" />
        {/* V shape for Veri */}
        <path d="M7 8L13 20L16 14L19 20L25 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Check / tick */}
        <path d="M10 24L14 28L22 20" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showText && (
        <span className={cn("font-semibold tracking-tight text-foreground", s.text)}>
          VeriCode <span className="text-blue-600 dark:text-blue-400">AI</span>
        </span>
      )}
    </div>
  );
}
