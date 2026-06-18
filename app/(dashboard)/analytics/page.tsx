"use client";
// API_KEY: GET /api/analytics — returns: { projectsDownloaded, practiceProgress, contributions[], languageBreakdown[] }
import { cn } from "@/lib/utils";
import { FolderOpen, Code2 } from "lucide-react";

const contributionData = (() => {
  const weeks: Array<Array<{ count: number }>> = [];
  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const r = Math.random();
      days.push({ count: r < 0.6 ? 0 : r < 0.75 ? 1 : r < 0.88 ? 2 : r < 0.95 ? 3 : 4 });
    }
    weeks.push(days);
  }
  // set some specific active days for demo
  weeks[50][1] = { count: 3 };
  weeks[51][3] = { count: 4 };
  return weeks;
})();

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const days = ["Mon", "", "Wed", "", "Fri"];

const countColor = ["bg-gray-100", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"];

const languageData = [
  { lang: "python", count: 0 },
];

export default function AnalyticsPage() {
  const totalContributions = contributionData.flat().filter((d) => d.count > 0).length;

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-xl font-bold text-gray-900">Project Analytics</h1>

      {/* Projects Made By You */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase">Workspace Overview</span>
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Projects Made By You</h2>
        <div className="border border-gray-200 rounded-lg py-12 flex flex-col items-center justify-center text-center">
          <Code2 size={32} className="text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-500">No downloaded projects yet</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Browse the Projects gallery and download a template — your downloaded projects will appear here.</p>
          <a href="/projects" className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors">
            Browse Projects
          </a>
        </div>
      </div>

      {/* Practice Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold text-blue-600 tracking-widest uppercase">Practice Progress</span>
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Problems Solved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-5">
            {/* Circular progress */}
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  stroke="#22c55e" strokeWidth="8"
                  strokeDasharray="0 201"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-900">0%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wide">Complete</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Questions Solved</div>
              <div className="text-2xl font-bold text-gray-900">0 <span className="text-base font-normal text-gray-400">/ 1</span></div>
              <div className="mt-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">By Language</div>
                {languageData.map((l) => (
                  <div key={l.lang} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-mono">{l.lang} ({l.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Easy", solved: 0, total: 0, color: "bg-green-400" },
              { label: "Medium", solved: 0, total: 1, color: "bg-yellow-400" },
              { label: "Hard", solved: 0, total: 0, color: "bg-red-400" },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{d.label}</span>
                  <span>{d.solved}/{d.total}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div
                    className={cn("h-full rounded-full", d.color)}
                    style={{ width: d.total > 0 ? `${(d.solved / d.total) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">
          {totalContributions} contributions in 2026
        </h2>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Month labels */}
            <div className="flex gap-1 mb-1 ml-8">
              {months.map((m, i) => (
                <div key={i} className="text-[10px] text-gray-400" style={{ width: `${(52 / 12) * 11}px` }}>
                  {m}
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-0.5 mr-1">
                {days.map((d, i) => (
                  <div key={i} className="text-[10px] text-gray-400 h-2.5 flex items-center" style={{ height: "11px" }}>
                    {d}
                  </div>
                ))}
              </div>
              {/* Grid */}
              {contributionData.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                      className={cn("w-2.5 h-2.5 rounded-sm cursor-pointer hover:ring-1 hover:ring-gray-400", countColor[day.count])}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-2 justify-end">
              <span className="text-[10px] text-gray-400">Less</span>
              {countColor.map((c, i) => (
                <div key={i} className={cn("w-2.5 h-2.5 rounded-sm", c)} />
              ))}
              <span className="text-[10px] text-gray-400">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
