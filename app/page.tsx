"use client";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Code2,
  Brain,
  Trophy,
  BookOpen,
  BarChart3,
  Users,
  ArrowRight,
  Zap,
  Shield,
  Sun,
  Moon,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Assistance",
    desc: "Debug errors, explain code, generate solutions, and get project guidance powered by AI.",
  },
  {
    icon: Code2,
    title: "Practice Problems",
    desc: "Company-wise coding questions from Google, Amazon, Microsoft, and 50+ top companies.",
  },
  {
    icon: BookOpen,
    title: "Structured Learning",
    desc: "Curated resources from GeeksforGeeks, W3Schools, and YouTube for every skill level.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Track your growth with contribution graphs, language-wise stats, and topic breakdowns.",
  },
  {
    icon: Trophy,
    title: "Leaderboard & Badges",
    desc: "Compete with peers, earn badges for milestones, and climb the global leaderboard.",
  },
  {
    icon: Users,
    title: "Project Ideas",
    desc: "Explore beginner to advanced project templates and generate academic documentation.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["50 AI queries/month", "100 practice problems", "Basic analytics", "Community access"],
    cta: "Get started",
    highlight: false,
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    features: [
      "Unlimited AI queries",
      "All practice problems",
      "Advanced analytics",
      "Company-wise filters",
      "Badge system",
      "Leaderboard ranking",
    ],
    cta: "Start free trial",
    highlight: true,
    href: "/signup",
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    features: [
      "Everything in Pro",
      "Up to 10 members",
      "Team leaderboard",
      "Admin dashboard",
      "Priority support",
    ],
    cta: "Contact sales",
    highlight: false,
    href: "/signup",
  },
];

const stats = [
  { value: "50K+", label: "Developers" },
  { value: "5,000+", label: "Problems" },
  { value: "100+", label: "Companies" },
  { value: "98%", label: "Satisfaction" },
];

export default function LandingPage() {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
      {/* Navbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", backgroundColor: "var(--background)", backdropFilter: "blur(12px)" }}>
        <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size="sm" />
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "2rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--nav-link)" }}>
            <a href="#features" style={{ textDecoration: "none", color: "inherit" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link-hover)")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link)")}>Features</a>
            <a href="#pricing" style={{ textDecoration: "none", color: "inherit" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link-hover)")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link)")}>Pricing</a>
            <a href="#about" style={{ textDecoration: "none", color: "inherit" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link-hover)")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--nav-link)")}>About</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={toggleDark}
              style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: "0.375rem", borderRadius: "0.375rem" }}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link href="/login" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", textDecoration: "none", padding: "0.375rem 0.75rem" }}>
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.375rem 1rem" }}>
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 1rem 5rem", background: "var(--background)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "999px", border: "1px solid var(--brand-light)", background: "var(--brand-light)", color: "var(--brand-text)", fontSize: "0.75rem", fontWeight: 500, marginBottom: "1.5rem" }}>
          <Zap size={12} />
          AI-Powered Developer Platform
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--foreground)", maxWidth: "52rem", lineHeight: 1.15 }}>
          Code smarter. Learn faster.{" "}
          <span style={{ color: "var(--brand)" }}>Get hired.</span>
        </h1>
        <p style={{ marginTop: "1.25rem", fontSize: "1.125rem", color: "var(--muted-foreground)", maxWidth: "40rem", lineHeight: 1.65 }}>
          VeriCode AI combines AI assistance, coding practice, structured learning, and progress
          analytics into one platform built for developers at every stage.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
          <Link href="/signup" className="btn-primary" style={{ fontSize: "0.9375rem", padding: "0.75rem 1.5rem" }}>
            Start for free <ArrowRight size={15} />
          </Link>
          <Link href="/dashboard" className="btn-outline" style={{ fontSize: "0.9375rem", padding: "0.75rem 1.5rem" }}>
            View dashboard demo
          </Link>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>No credit card required</p>
      </section>

      {/* Stats */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--card)", padding: "3rem 1rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", textAlign: "center" }} className="md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--foreground)" }}>{s.value}</div>
              <div style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "5rem 1rem", background: "var(--muted)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--foreground)" }}>Everything you need to grow</h2>
            <p style={{ marginTop: "0.75rem", color: "var(--muted-foreground)", maxWidth: 480, margin: "0.75rem auto 0" }}>
              A complete toolkit for developers to learn, practice, and get hired — all in one place.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="card"
                style={{ padding: "1.5rem", transition: "box-shadow 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
              >
                <div style={{ width: 40, height: 40, borderRadius: "0.5rem", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <f.icon size={20} style={{ color: "var(--brand)" }} />
                </div>
                <h3 style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company trust bar */}
      <section id="about" style={{ padding: "3.5rem 1rem", background: "var(--background)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            Practice questions from top companies
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            {["Google", "Amazon", "Microsoft", "TCS", "Infosys", "Adobe", "Meta", "Zoho", "Accenture", "Wipro"].map((c) => (
              <span
                key={c}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                  padding: "0.25rem 0.75rem",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "5rem 1rem", background: "var(--muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--foreground)" }}>Simple, transparent pricing</h2>
            <p style={{ marginTop: "0.75rem", color: "var(--muted-foreground)" }}>Start free. Upgrade when you are ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {plans.map((p) => (
              <div
                key={p.name}
                style={{
                  borderRadius: "0.75rem",
                  border: p.highlight ? "2px solid var(--brand)" : "1px solid var(--card-border)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  background: p.highlight ? "var(--brand)" : "var(--card)",
                  color: p.highlight ? "#fff" : "var(--foreground)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 500, color: p.highlight ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)", marginBottom: "0.25rem" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "1.875rem", fontWeight: 700 }}>
                    {p.price}
                    <span style={{ fontSize: "0.875rem", fontWeight: 400, marginLeft: "0.25rem", opacity: 0.7 }}>
                      /{p.period}
                    </span>
                  </div>
                </div>
                <ul style={{ flex: 1, marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                      <CheckCircle size={14} style={{ color: p.highlight ? "rgba(255,255,255,0.7)" : "#22c55e", flexShrink: 0 }} />
                      <span style={{ color: p.highlight ? "rgba(255,255,255,0.9)" : "var(--muted-foreground)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    padding: "0.625rem 1rem",
                    borderRadius: "0.5rem",
                    textDecoration: "none",
                    background: p.highlight ? "#fff" : "var(--primary)",
                    color: p.highlight ? "var(--brand)" : "var(--primary-foreground)",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1rem", background: dark ? "#0a0a0f" : "#0f172a", color: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Shield size={32} style={{ margin: "0 auto 1rem", color: "#60a5fa" }} />
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.75rem" }}>Ready to level up your coding?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "2rem" }}>
            Join thousands of developers who use VeriCode AI to practice, learn, and land their dream job.
          </p>
          <Link
            href="/signup"
            className="btn-brand"
            style={{ fontSize: "0.9375rem", padding: "0.75rem 2rem" }}
          >
            Get started for free <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--card)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }} className="md:flex-row md:justify-between">
          <Logo size="sm" />
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>2026 VeriCode AI. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "0.75rem" }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a key={item} href="#" style={{ color: "var(--muted-foreground)", textDecoration: "none" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--foreground)")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted-foreground)")}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
