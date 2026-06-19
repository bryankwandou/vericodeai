"use client";
import { Code2, Flame, Trophy, TrendingUp, CheckCircle2, Circle } from "lucide-react";
import { useEffect, useState } from "react";

// Empty/fresh account data for new users
const EMPTY_STATS = [
  { label: "Problems Solved", value: "0", icon: Code2, colorVar: "#3b82f6", bgVar: "rgba(59,130,246,0.1)" },
  { label: "Current Streak", value: "0 days", icon: Flame, colorVar: "#f97316", bgVar: "rgba(249,115,22,0.1)" },
  { label: "Badges Earned", value: "0", icon: Trophy, colorVar: "#eab308", bgVar: "rgba(234,179,8,0.1)" },
  { label: "Global Rank", value: "Unranked", icon: TrendingUp, colorVar: "#22c55e", bgVar: "rgba(34,197,94,0.1)" },
];

const EMPTY_LANGUAGES = [
  { lang: "Python", pct: 0, color: "#3b82f6" },
  { lang: "JavaScript", pct: 0, color: "#eab308" },
  { lang: "Java", pct: 0, color: "#f97316" },
  { lang: "C++", pct: 0, color: "#a855f7" },
];

const EMPTY_TODOS = [
  { label: "Solve your first problem", done: false },
  { label: "Complete your profile setup", done: false },
  { label: "Explore the Practice section", done: false },
  { label: "Join the Community leaderboard", done: false },
];

const EMPTY_ACTIVITY: { text: string; time: string }[] = [];

const EMPTY_TOPICS = [
  { topic: "Arrays", pct: 0 },
  { topic: "Strings", pct: 0 },
  { topic: "Trees", pct: 0 },
  { topic: "DP", pct: 0 },
  { topic: "Graphs", pct: 0 },
  { topic: "SQL", pct: 0 },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Developer");

  useEffect(() => {
    const stored = localStorage.getItem("vericode_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.name) setUserName(user.name);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 1200 }}>
      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)" }}>Dashboard</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.125rem" }}>
          Welcome, {userName}. Start your journey — your progress starts at zero.
        </p>
      </div>

      {/* Getting started banner */}
      <div
        className="card"
        style={{
          padding: "1rem 1.25rem",
          background: "var(--brand-light)",
          border: "1px solid var(--brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p style={{ fontWeight: 600, color: "var(--brand-text)", fontSize: "0.9375rem" }}>Welcome to VeriCode AI</p>
          <p style={{ fontSize: "0.8125rem", color: "var(--brand-text)", opacity: 0.8, marginTop: "0.125rem" }}>
            Complete your first challenge to start tracking your progress.
          </p>
        </div>
        <a
          href="/practice"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--brand)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.8125rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Start Practicing
        </a>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="lg:grid-cols-4">
        {EMPTY_STATS.map((s) => (
          <div key={s.label} className="card" style={{ padding: "1rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "0.5rem", background: s.bgVar, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
              <s.icon size={17} style={{ color: s.colorVar }} />
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>{s.value}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.125rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="lg:grid-cols-3">
        {/* Language progress */}
        <div className="card" style={{ gridColumn: "span 2", padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Language Progress</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {EMPTY_LANGUAGES.map((l) => (
              <div key={l.lang}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.375rem" }}>
                  <span style={{ fontWeight: 500, color: "var(--foreground)" }}>{l.lang}</span>
                  <span style={{ color: "var(--muted-foreground)" }}>{l.pct}%</span>
                </div>
                <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 4, background: l.color, width: `${l.pct}%`, transition: "width 0.4s ease" }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
            Solve problems to see your language breakdown here.
          </p>
        </div>

        {/* Daily goals */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Getting Started</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {EMPTY_TODOS.map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                {t.done ? (
                  <CheckCircle2 size={16} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                ) : (
                  <Circle size={16} style={{ color: "var(--border)", flexShrink: 0, marginTop: 2 }} />
                )}
                <span style={{ fontSize: "0.875rem", color: t.done ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: t.done ? "line-through" : "none" }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity + Topic coverage */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Activity feed */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Recent Activity</h2>
          {EMPTY_ACTIVITY.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 0", gap: "0.5rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Code2 size={16} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--muted-foreground)", textAlign: "center" }}>
                No activity yet. Solve your first problem to see it here.
              </p>
            </div>
          ) : null}
        </div>

        {/* Topic coverage */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h2 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Topic Coverage</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {EMPTY_TOPICS.map((t) => (
              <div key={t.topic} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.625rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--muted)" }}>
                <div style={{ position: "relative", width: 40, height: 40 }}>
                  <svg style={{ width: 40, height: 40, transform: "rotate(-90deg)" }} viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke="var(--brand)"
                      strokeWidth="3"
                      strokeDasharray={`${(t.pct / 100) * 94.2} 94.2`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6875rem", fontWeight: 600, color: "var(--foreground)" }}>
                    {t.pct}%
                  </span>
                </div>
                <span style={{ fontSize: "0.6875rem", color: "var(--muted-foreground)", marginTop: "0.375rem" }}>{t.topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
