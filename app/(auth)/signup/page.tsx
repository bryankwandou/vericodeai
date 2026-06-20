"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, AlertCircle, CheckCircle, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
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

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    setError("");
  }

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    if (!form.skillLevel || !form.language || !form.goal) {
      setError("Please complete your profile.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      // Persist user for login flow
      localStorage.setItem("vericode_registered_user", JSON.stringify(form));
      localStorage.setItem("vericode_user", JSON.stringify(form));
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const languages = ["Python", "JavaScript", "Java", "C++", "C", "TypeScript", "SQL"];
  const goals = ["Learning", "Interview prep", "Build projects", "AI coding help"];

  const passwordStrength = form.password
    ? [form.password.length >= 8, /[A-Z]/.test(form.password), /[0-9]/.test(form.password)]
    : null;

  return (
    <div
      style={{ background: "var(--muted)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}
    >
      {/* Theme toggle */}
      <button
        onClick={toggleDark}
        style={{ color: "var(--muted-foreground)", position: "fixed", top: 16, right: 16 }}
        className="p-2 rounded-lg transition-colors z-10"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--card-border)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div style={{ width: "100%", maxWidth: 384 }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <Logo size="md" />
          <h1 style={{ marginTop: "1.25rem", fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)" }}>
            Create your account
          </h1>
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
            {[1, 2].map((n) => (
              <div
                key={n}
                style={{
                  height: "6px",
                  borderRadius: "3px",
                  width: n === step ? "2rem" : n < step ? "2rem" : "1rem",
                  background: n < step ? "#22c55e" : n === step ? "var(--brand)" : "var(--border)",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
            Step {step} of 2
          </p>
        </div>

        <div className="auth-card">
          {error && (
            <div style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--destructive)",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "0.5rem",
              padding: "0.75rem",
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleStep1} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label htmlFor="signup-name" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  Full name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="signup-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="signup-password" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="signup-password"
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className="form-input"
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {passwordStrength && (
                  <div style={{ marginTop: "0.375rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    {passwordStrength.map((ok, i) => (
                      <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: ok ? "#22c55e" : "var(--border)", transition: "background 0.2s" }} />
                    ))}
                    <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginLeft: "0.25rem", minWidth: "2.5rem" }}>
                      {form.password.length < 8 ? "Weak" : passwordStrength.every(Boolean) ? "Strong" : "Good"}
                    </span>
                  </div>
                )}
              </div>
              <button id="signup-continue" type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.25rem" }}>
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>Tell us about yourself</p>

              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "var(--muted-foreground)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Skill level
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                  {skillLevels.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update("skillLevel", s)}
                      style={{
                        padding: "0.5rem",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        borderRadius: "0.5rem",
                        border: form.skillLevel === s ? "1.5px solid var(--brand)" : "1px solid var(--border)",
                        background: form.skillLevel === s ? "var(--brand-light)" : "var(--card)",
                        color: form.skillLevel === s ? "var(--brand-text)" : "var(--foreground)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "var(--muted-foreground)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Primary language
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {languages.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => update("language", l)}
                      style={{
                        padding: "0.375rem 0.75rem",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        borderRadius: "999px",
                        border: form.language === l ? "1.5px solid var(--brand)" : "1px solid var(--border)",
                        background: form.language === l ? "var(--brand-light)" : "var(--card)",
                        color: form.language === l ? "var(--brand-text)" : "var(--foreground)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "var(--muted-foreground)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Your goal
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => update("goal", g)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.625rem 0.75rem",
                        fontSize: "0.875rem",
                        borderRadius: "0.5rem",
                        border: form.goal === g ? "1.5px solid var(--brand)" : "1px solid var(--border)",
                        background: form.goal === g ? "var(--brand-light)" : "var(--card)",
                        color: form.goal === g ? "var(--brand-text)" : "var(--foreground)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        textAlign: "left",
                      }}
                    >
                      {g}
                      {form.goal === g && <CheckCircle size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1 }}>
                  Back
                </button>
                <button id="signup-submit" type="submit" disabled={loading} className="btn-primary" style={{ flex: 1 }}>
                  {loading ? "Creating..." : "Create account"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--brand)", fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
        <p style={{ marginTop: "0.75rem", textAlign: "center", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
          By signing up, you agree to our{" "}
          <a href="#" style={{ textDecoration: "underline" }}>Terms</a> and{" "}
          <a href="#" style={{ textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

