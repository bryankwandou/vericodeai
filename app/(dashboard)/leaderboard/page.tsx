"use client";
// API_KEY: GET /api/leaderboard?period={daily|weekly|monthly|all-time}&type={global|college|company} — returns: LeaderboardEntry[]
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";

const periods = ["Daily", "Weekly", "Monthly", "All Time"];
const types = ["Global", "College", "Company"];

const entries = [
  { rank: 1, name: "Arjun Sharma", username: "arjun_s", college: "IIT Bombay", solved: 512, streak: 45, points: 9820, badge: "Master" },
  { rank: 2, name: "Priya Patel", username: "priya_p", college: "NIT Trichy", solved: 489, streak: 38, points: 9210, badge: "Expert" },
  { rank: 3, name: "Rohan Gupta", username: "rohan_g", college: "IIT Delhi", solved: 467, streak: 32, points: 8890, badge: "Expert" },
  { rank: 4, name: "Sneha Kumar", username: "sneha_k", college: "VIT", solved: 445, streak: 28, points: 8450, badge: "Advanced" },
  { rank: 5, name: "Vikram Singh", username: "vikram_s", college: "IIT Madras", solved: 423, streak: 25, points: 8100, badge: "Advanced" },
  { rank: 6, name: "Anita Rao", username: "anita_r", college: "BITS Pilani", solved: 401, streak: 22, points: 7760, badge: "Advanced" },
  { rank: 7, name: "Deepak Nair", username: "deepak_n", college: "IISc", solved: 380, streak: 19, points: 7340, badge: "Intermediate" },
  { rank: 8, name: "Kavya Menon", username: "kavya_m", college: "NIT Warangal", solved: 358, streak: 16, points: 6990, badge: "Intermediate" },
  { rank: 9, name: "Rahul Joshi", username: "rahul_j", college: "DTU", solved: 340, streak: 14, points: 6620, badge: "Intermediate" },
  { rank: 10, name: "Gani Abbu", username: "gani", college: "—", solved: 142, streak: 7, points: 2840, badge: "Beginner", isYou: true },
];

const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-500"];
const badgeColor: Record<string, string> = {
  Master: "bg-purple-100 text-purple-700",
  Expert: "bg-blue-100 text-blue-700",
  Advanced: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Beginner: "bg-gray-100 text-gray-600",
};

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("Weekly");
  const [type, setType] = useState("Global");

  return (
    <div className="space-y-5 max-w-4xl">
      <h1 className="text-xl font-bold text-gray-900">Leaderboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium transition-colors",
                period === p ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium transition-colors",
                type === t ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {[entries[1], entries[0], entries[2]].map((e, i) => (
          <div
            key={e.rank}
            className={cn(
              "flex flex-col items-center bg-white border border-gray-200 rounded-xl p-4 text-center",
              e.rank === 1 && "border-yellow-300 bg-yellow-50"
            )}
          >
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white mb-2",
              e.rank === 1 ? "bg-yellow-500" : e.rank === 2 ? "bg-gray-400" : "bg-orange-500"
            )}>
              {e.name.charAt(0)}
            </div>
            <Medal size={16} className={medalColors[e.rank - 1]} />
            <p className="text-xs font-semibold text-gray-900 mt-1">{e.name}</p>
            <p className="text-xs text-gray-400">@{e.username}</p>
            <p className="text-sm font-bold text-gray-900 mt-2">{e.points.toLocaleString()}</p>
            <p className="text-[10px] text-gray-400">points</p>
          </div>
        ))}
      </div>

      {/* Full table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_80px_70px_70px_80px] gap-2 px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
          <span className="text-center">#</span>
          <span>Developer</span>
          <span className="text-right">Solved</span>
          <span className="text-right">Streak</span>
          <span className="text-right">Points</span>
          <span className="text-right">Badge</span>
        </div>
        <div className="divide-y divide-gray-50">
          {entries.map((e) => (
            <div
              key={e.rank}
              className={cn(
                "grid grid-cols-[40px_1fr_80px_70px_70px_80px] gap-2 items-center px-4 py-3 transition-colors hover:bg-gray-50",
                e.isYou && "bg-blue-50 hover:bg-blue-50"
              )}
            >
              <div className="text-center">
                {e.rank <= 3 ? (
                  <Medal size={16} className={medalColors[e.rank - 1]} />
                ) : (
                  <span className="text-sm font-medium text-gray-500">{e.rank}</span>
                )}
              </div>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                  e.isYou ? "bg-blue-600" : "bg-gray-600"
                )}>
                  {e.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {e.name} {e.isYou && <span className="text-xs text-blue-600 font-normal">(you)</span>}
                  </p>
                  <p className="text-xs text-gray-400 truncate">@{e.username}</p>
                </div>
              </div>
              <div className="text-right text-sm font-medium text-gray-700">{e.solved}</div>
              <div className="text-right text-sm text-gray-600">{e.streak}d</div>
              <div className="text-right text-sm font-semibold text-gray-900">{e.points.toLocaleString()}</div>
              <div className="flex justify-end">
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", badgeColor[e.badge])}>
                  {e.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points info */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-gray-700 mb-3">How points are calculated</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />Easy: 10 pts</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />Medium: 25 pts</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />Hard: 50 pts</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />Daily streak: 5 pts</div>
        </div>
      </div>
    </div>
  );
}
