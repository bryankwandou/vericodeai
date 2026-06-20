"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Code2,
  BarChart3,
  Trophy,
  Users,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/projects", icon: FolderOpen, label: "Projects" },
  { href: "/practice", icon: Code2, label: "Practice" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/community", icon: Users, label: "Community" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  // Sync state with actual DOM class on mount
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

  function handleLogout() {
    localStorage.removeItem("vericode_user");
    router.push("/login");
  }

  return (
    <aside
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border)",
      }}
      className={cn(
        "hidden md:flex flex-col shrink-0 transition-all duration-200 relative",
        collapsed ? "w-14" : "w-52"
      )}
    >
      {/* Logo */}
      <div
        style={{ borderBottom: "1px solid var(--border)" }}
        className={cn(
          "flex items-center h-14 px-3",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && <Logo size="sm" />}
        {collapsed && <Logo size="sm" showText={false} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: "var(--muted-foreground)" }}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={
                active
                  ? { backgroundColor: "var(--sidebar-active-bg)", color: "var(--sidebar-active-text)" }
                  : { color: "var(--sidebar-text)" }
              }
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
                collapsed && "justify-center px-2"
              )}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "var(--sidebar-hover)";
                  (e.currentTarget as HTMLElement).style.color = "var(--nav-link-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--sidebar-text)";
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={17} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ borderTop: "1px solid var(--border)" }} className="py-3 px-2 space-y-0.5">
        <button
          onClick={toggleDark}
          style={{ color: "var(--sidebar-text)" }}
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
            collapsed && "justify-center"
          )}
          onMouseEnter={(e) => {
            (e.currentTarget).style.background = "var(--sidebar-hover)";
            (e.currentTarget).style.color = "var(--nav-link-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget).style.background = "transparent";
            (e.currentTarget).style.color = "var(--sidebar-text)";
          }}
        >
          {dark ? <Sun size={17} className="shrink-0" /> : <Moon size={17} className="shrink-0" />}
          {!collapsed && <span>{dark ? "Light theme" : "Dark theme"}</span>}
        </button>
        <Link
          href="/settings"
          style={
            pathname.startsWith("/settings")
              ? { backgroundColor: "var(--sidebar-active-bg)", color: "var(--sidebar-active-text)" }
              : { color: "var(--sidebar-text)" }
          }
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
            collapsed && "justify-center"
          )}
          onMouseEnter={(e) => {
            if (!pathname.startsWith("/settings")) {
              (e.currentTarget as HTMLElement).style.background = "var(--sidebar-hover)";
              (e.currentTarget as HTMLElement).style.color = "var(--nav-link-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (!pathname.startsWith("/settings")) {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--sidebar-text)";
            }
          }}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={17} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={handleLogout}
          style={{ color: "var(--sidebar-text)" }}
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
            collapsed && "justify-center"
          )}
          onMouseEnter={(e) => {
            (e.currentTarget).style.background = "var(--sidebar-hover)";
            (e.currentTarget).style.color = "var(--nav-link-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget).style.background = "transparent";
            (e.currentTarget).style.color = "var(--sidebar-text)";
          }}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}

