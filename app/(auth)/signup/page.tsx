"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

// API_KEY: POST /api/auth/signup — body: { name, email, password, skillLevel, language, goal }
export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skillLevel: "",
    language: "",
    goal: "",
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    setError("");
  }

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    if (!form.skillLevel || !form.language || !form.goal) { setError("Please complete your profile."); return; }
    setLoading(true);
    try {
      // TODO (backend): replace with actual API call
      // await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 800));
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const languages = ["Python", "JavaScript", "Java", "C++", "C", "TypeScript", "SQL"];
  const goals = ["Learning", "Interview prep", "Build projects", "AI coding help"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Logo size="md" />
          <h1 className="mt-5 text-2xl font-bold text-gray-900">Create your account</h1>
          <div className="flex items-center gap-2 mt-3">
            {[1, 2].map((n) => (
              <div
                key={n}
                className={`h-1.5 rounded-full transition-all ${n === step ? "w-8 bg-blue-600" : n < step ? "w-8 bg-green-500" : "w-4 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {error && (
            <div className="mb-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {[form.password.length >= 8, /[A-Z]/.test(form.password), /[0-9]/.test(form.password)].map((ok, i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full ${ok ? "bg-green-500" : "bg-gray-200"}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {form.password.length < 8 ? "Weak" : /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? "Strong" : "Good"}
                    </span>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tell us about yourself</p>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Skill level</label>
                <div className="grid grid-cols-3 gap-2">
                  {skillLevels.map((s) => (
                    <button
                      key={s} type="button"
                      onClick={() => update("skillLevel", s)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-colors ${form.skillLevel === s ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Primary language</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button
                      key={l} type="button"
                      onClick={() => update("language", l)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${form.language === l ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Your goal</label>
                <div className="space-y-2">
                  {goals.map((g) => (
                    <button
                      key={g} type="button"
                      onClick={() => update("goal", g)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border transition-colors ${form.goal === g ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {g}
                      {form.goal === g && <CheckCircle size={14} />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button type="submit" disabled={loading} className="flex-1 bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
                  {loading ? "Creating..." : "Create account"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:text-blue-500">
            Sign in
          </Link>
        </p>
        <p className="mt-3 text-center text-xs text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-600">Terms</a> and{" "}
          <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
