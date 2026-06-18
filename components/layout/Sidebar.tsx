"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  function toggleDark() {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col shrink-0 border-r border-gray-200 bg-white transition-all duration-200 relative",
        collapsed ? "w-14" : "w-52"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-14 border-b border-gray-200 px-3", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <Logo size="sm" />}
        {collapsed && <Logo size="sm" showText={false} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
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
              className={cn(
                "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={17} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="py-3 px-2 border-t border-gray-200 space-y-0.5">
        <button
          onClick={toggleDark}
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors",
            collapsed && "justify-center"
          )}
        >
          {dark ? <Sun size={17} className="shrink-0" /> : <Moon size={17} className="shrink-0" />}
          {!collapsed && <span>{dark ? "Light theme" : "Dark theme"}</span>}
        </button>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors",
            pathname.startsWith("/settings") && "bg-blue-50 text-blue-700",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={17} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Log out" : undefined}
        >
          <LogOut size={17} className="shrink-0" />
          {!collapsed && <span>Log out</span>}
        </Link>
      </div>
    </aside>
  );
}
