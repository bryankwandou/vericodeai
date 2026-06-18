import Link from "next/link";
import { Logo } from "@/components/Logo";
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
  },
];

const stats = [
  { value: "50K+", label: "Developers" },
  { value: "5,000+", label: "Problems" },
  { value: "100+", label: "Companies" },
  { value: "98%", label: "Satisfaction" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm font-semibold bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-gray-700 transition-colors">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-medium mb-6">
          <Zap size={12} />
          AI-Powered Developer Platform
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl leading-tight">
          Code smarter. Learn faster.{" "}
          <span className="text-blue-600">Get hired.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed">
          VeriCode AI combines AI assistance, coding practice, structured learning, and progress
          analytics into one platform built for developers at every stage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            Start for free <ArrowRight size={15} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
          >
            View dashboard demo
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">No credit card required</p>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to grow</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              A complete toolkit for developers to learn, practice, and get hired — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company trust bar */}
      <section id="about" className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-6">
            Practice questions from top companies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Google", "Amazon", "Microsoft", "TCS", "Infosys", "Adobe", "Meta", "Zoho", "Accenture", "Wipro"].map((c) => (
              <span key={c} className="text-sm font-medium text-gray-400 px-3 py-1 border border-gray-200 rounded-full">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-gray-500">Start free. Upgrade when you are ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  p.highlight
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="mb-4">
                  <div className={`text-sm font-medium mb-1 ${p.highlight ? "text-blue-100" : "text-gray-500"}`}>
                    {p.name}
                  </div>
                  <div className={`text-3xl font-bold ${p.highlight ? "text-white" : "text-gray-900"}`}>
                    {p.price}
                    <span className={`text-sm font-normal ml-1 ${p.highlight ? "text-blue-100" : "text-gray-400"}`}>
                      /{p.period}
                    </span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2.5 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className={p.highlight ? "text-blue-200" : "text-green-500"} />
                      <span className={p.highlight ? "text-blue-50" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`text-center text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                    p.highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Shield size={32} className="mx-auto mb-4 text-blue-400" />
          <h2 className="text-3xl font-bold mb-3">Ready to level up your coding?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of developers who use VeriCode AI to practice, learn, and land their dream job.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            Get started for free <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-gray-400">2026 VeriCode AI. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
