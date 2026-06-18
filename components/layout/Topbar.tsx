"use client";
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const [query, setQuery] = useState("");

  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center gap-3 px-4 shrink-0">
      {/* Mobile menu button (sidebar handled by overlay on mobile) */}
      <button className="md:hidden p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems, projects, resources..."
          className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications — API_KEY: GET /api/notifications */}
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={17} />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        {/* User avatar — API_KEY: GET /api/user/me */}
        <button className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center hover:ring-2 hover:ring-blue-200 transition-all">
          G
        </button>
      </div>
    </header>
  );
}
