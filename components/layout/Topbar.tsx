"use client";
import { Bell, Search, Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("vericode-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("vericode-theme", "light");
    }
  }

  const userRaw = typeof window !== "undefined" ? localStorage.getItem("vericode_user") : null;
  const user = userRaw ? JSON.parse(userRaw) : null;
  const initials = user?.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  return (
    <header
      style={{
        backgroundColor: "var(--topbar-bg)",
        borderBottom: "1px solid var(--topbar-border)",
      }}
      className="h-14 flex items-center gap-3 px-4 shrink-0"
    >
      {/* Mobile menu */}
      <button
        style={{ color: "var(--muted-foreground)" }}
        className="md:hidden p-1.5 rounded-md transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={15}
          style={{ color: "var(--muted-foreground)" }}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <input
          type="text"
          id="topbar-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems, projects, resources..."
          className="form-input pl-9"
          style={{ background: "var(--muted)" }}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          style={{ color: "var(--muted-foreground)" }}
          className="p-1.5 rounded-lg transition-colors"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Light mode" : "Dark mode"}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--muted)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <button
          style={{ color: "var(--muted-foreground)" }}
          className="relative p-1.5 rounded-lg transition-colors"
          aria-label="Notifications"
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--muted)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <Bell size={17} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        {/* User avatar */}
        <Link
          href="/settings"
          className="w-8 h-8 rounded-full text-white text-xs font-semibold flex items-center justify-center hover:ring-2 transition-all"
          style={{ backgroundColor: "var(--brand)", outlineColor: "var(--brand-light)" }}
          title={user?.name || "Account"}
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}

