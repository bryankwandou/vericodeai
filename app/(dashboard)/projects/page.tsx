"use client";
// API_KEY: GET /api/projects/templates?category={category}&size={size} — returns: ProjectTemplate[]
// API_KEY: GET /api/projects/mine — returns: UserProject[]
import { useState } from "react";
import { Search, Eye, Code2, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "AI Projects", "Full Stack Projects", "Data Analytics Projects", "ML Projects", "Finance Projects", "Other Projects"];
const sizes = ["Small", "Medium", "Large"];

const templates = [
  { id: 1, title: "VeriCode AI Core AI Agent", category: "AI Projects", desc: "Build a fully autonomous AI agent with memory, planning, and tool-use capabilities.", size: "Large", preview: "/api/placeholder/400/240" },
  { id: 2, title: "E-Commerce Cloud SaaS", category: "Full Stack Projects", desc: "Complete boilerplate with Auth, Stripe, and Prisma configured.", size: "Medium", preview: "/api/placeholder/400/240" },
  { id: 3, title: "Global Market Analytics", category: "Data Analytics Projects", desc: "Beautiful charts and data tables optimized for large datasets.", size: "Medium", preview: "/api/placeholder/400/240" },
  { id: 4, title: "Image Recognition Engine", category: "ML Projects", desc: "Computer vision pipeline using CNN for real-time object detection.", size: "Large", preview: "/api/placeholder/400/240" },
  { id: 5, title: "VeriCode AI Crypto Asset Tracker", category: "Finance Projects", desc: "Real-time crypto portfolio tracker with price alerts and analytics.", size: "Small", preview: "/api/placeholder/400/240" },
  { id: 6, title: "Local Memory Storage", category: "Other Projects", desc: "Supercharge local storage with indexing, sync, and encryption.", size: "Small", preview: "/api/placeholder/400/240" },
  { id: 7, title: "Next.js SaaS Starter", category: "Full Stack Projects", desc: "Complete boilerplate with Auth, Stripe, and Prisma configured.", size: "Medium", preview: "/api/placeholder/400/240" },
  { id: 8, title: "AI Chatbot UI", category: "AI Projects", desc: "React interface ready to connect to OpenAI or local LLM APIs.", size: "Small", preview: "/api/placeholder/400/240" },
  { id: 9, title: "Admin Dashboard", category: "Data Analytics Projects", desc: "Beautiful charts and data tables optimized for large datasets.", size: "Medium", preview: "/api/placeholder/400/240" },
];

const myProjects = [
  { title: "VeriCode AI Core AI Agent", status: "In Progress", updated: "2 days ago" },
];

export default function ProjectsPage() {
  const [cat, setCat] = useState("All");
  const [size, setSize] = useState("Medium");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = templates.filter(
    (t) =>
      (cat === "All" || t.category === cat) &&
      (size === "All" || t.size === size) &&
      t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56 transition-all"
          />
        </div>
      </div>

      {/* My projects */}
      {myProjects.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">My Projects</h2>
          <div className="space-y-2">
            {myProjects.map((p) => (
              <div key={p.title} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 group">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-400">Updated {p.updated}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{p.status}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-gray-200">
                    <Code2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates */}
      <div>
        {/* Featured templates */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs">Project Templates</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            {[
              { label: "FULL STACK", title: "Next.js SaaS Starter", desc: "Complete boilerplate with Auth, Stripe, and Prisma configured." },
              { label: "AI PROJECTS", title: "AI Chatbot UI", desc: "React interface ready to connect to OpenAI or local LLM APIs." },
              { label: "ANALYTICS", title: "Admin Dashboard", desc: "Beautiful charts and data tables optimized for large datasets." },
            ].map((t) => (
              <div key={t.title} className="border border-gray-200 rounded-lg p-4">
                <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">{t.label}</span>
                <h3 className="text-sm font-semibold text-gray-900 mt-1 mb-1">{t.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{t.desc}</p>
                <button className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold border border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition-colors">
                  <Code2 size={11} /> Build
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                cat === c ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:border-gray-400"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Size filter + sort */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">SORT:</span>
            <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white outline-none">
              <option>Default Order</option>
              <option>Most Popular</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">SIZE:</span>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-md border transition-colors",
                  size === s ? "bg-pink-500 text-white border-pink-500" : "border-gray-200 text-gray-600 hover:border-gray-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group relative"
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Code2 size={32} />
                </div>
                {hovered === t.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold rounded-md hover:bg-gray-100 transition-colors">
                      <Eye size={12} /> Preview
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-gray-700 transition-colors">
                      <Code2 size={12} /> Build
                    </button>
                  </div>
                )}
                <button
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:text-gray-700 text-xs"
                  title="Remove"
                >
                  ×
                </button>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 truncate">{t.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t.category}</p>
              </div>
            </div>
          ))}

          {/* Add new */}
          <button className="bg-white border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
            <Plus size={24} />
            <span className="text-sm font-medium">New project</span>
          </button>
        </div>
      </div>
    </div>
  );
}
