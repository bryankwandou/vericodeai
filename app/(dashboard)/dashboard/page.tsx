// API_KEY: GET /api/dashboard/stats — returns: { solved, streak, badges, rank, languages, recentActivity, todos }
import { Code2, Flame, Trophy, TrendingUp, CheckCircle2, Circle } from "lucide-react";

const stats = [
  { label: "Problems Solved", value: "142", icon: Code2, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Current Streak", value: "7 days", icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Badges Earned", value: "12", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Global Rank", value: "#1,204", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
];

const languageProgress = [
  { lang: "Python", pct: 72, color: "bg-blue-500" },
  { lang: "JavaScript", pct: 55, color: "bg-yellow-500" },
  { lang: "Java", pct: 38, color: "bg-orange-500" },
  { lang: "C++", pct: 20, color: "bg-purple-500" },
];

const todos = [
  { label: "Solve 3 Binary Search problems", done: true },
  { label: "Complete Dynamic Programming module", done: false },
  { label: "Review yesterday's submission", done: false },
  { label: "Attempt a Google mock interview", done: false },
];

const activity = [
  { text: "Solved Binary Search", time: "2h ago", type: "solve" },
  { text: "Earned Streak badge", time: "Yesterday", type: "badge" },
  { text: "Started JavaScript module", time: "2 days ago", type: "learn" },
  { text: "Reached top 1500 rank", time: "3 days ago", type: "rank" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back, Ganesh. Keep up the streak!</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={17} className={s.color} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Language progress */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Language Progress</h2>
          <div className="space-y-4">
            {languageProgress.map((l) => (
              <div key={l.lang}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{l.lang}</span>
                  <span className="text-gray-400">{l.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${l.color} transition-all`} style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily todos */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Today&apos;s Goals</h2>
          <div className="space-y-3">
            {todos.map((t) => (
              <div key={t.label} className="flex items-start gap-2.5">
                {t.done ? (
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <Circle size={16} className="text-gray-300 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + category progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{a.text}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topic coverage */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Topic Coverage</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { topic: "Arrays", pct: 80 },
              { topic: "Strings", pct: 65 },
              { topic: "Trees", pct: 45 },
              { topic: "DP", pct: 30 },
              { topic: "Graphs", pct: 20 },
              { topic: "SQL", pct: 55 },
            ].map((t) => (
              <div key={t.topic} className="flex flex-col items-center p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke="#3b82f6" strokeWidth="3"
                      strokeDasharray={`${(t.pct / 100) * 94.2} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                    {t.pct}%
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1.5">{t.topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
