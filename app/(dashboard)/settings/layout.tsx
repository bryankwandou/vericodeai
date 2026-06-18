"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, Palette, Bell } from "lucide-react";

const tabs = [
  { href: "/settings", icon: User, label: "Public profile" },
  { href: "/settings/privacy", icon: Shield, label: "Privacy & Security" },
  { href: "/settings/appearance", icon: Palette, label: "Appearance" },
  { href: "/settings/notifications", icon: Bell, label: "Notifications" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="max-w-4xl space-y-5">
      <h1 className="text-xl font-bold text-gray-900">Settings</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar nav */}
        <aside className="sm:w-44 shrink-0">
          <div className="flex sm:flex-col gap-1 overflow-x-auto pb-1 scrollbar-thin">
            {tabs.map((t) => {
              const active = t.href === "/settings" ? pathname === "/settings" : pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <t.icon size={15} className="shrink-0" />
                  {t.label}
                </Link>
              );
            })}
          </div>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
