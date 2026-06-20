"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Eye, EyeOff, AlertCircle, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

// Demo account for testing (no backend required)
const DEMO_ACCOUNT = {
  email: "demo@vericode.ai",
  password: "Demo1234",
  name: "Demo User",
  skillLevel: "Intermediate",
  language: "Python",
  goal: "Interview prep",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      // Check demo account credentials
      if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
        localStorage.setItem("vericode_user", JSON.stringify(DEMO_ACCOUNT));
        router.push("/dashboard");
        return;
      }
      // Check any user registered via signup
      const stored = localStorage.getItem("vericode_registered_user");
      if (stored) {
        const registeredUser = JSON.parse(stored);
        if (registeredUser.email === email && registeredUser.password === password) {
          localStorage.setItem("vericode_user", JSON.stringify(registeredUser));
          router.push("/dashboard");
          return;
        }
      }
      setError("Invalid email or password. Try demo@vericode.ai / Demo1234");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="auth-bg"
      style={{ background: "var(--muted)", minHeight: "100vh" }}
    >
      {/* Theme toggle top-right */}
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
          <h1
            style={{
              marginTop: "1.25rem",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
            Sign in to your account
          </p>
        </div>

        {/* Demo account hint */}
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "var(--brand-light)",
            border: "1px solid var(--brand)",
            fontSize: "0.8rem",
            color: "var(--brand-text)",
          }}
        >
          <strong>Test account ready:</strong><br />
          Email: <code>demo@vericode.ai</code>&nbsp; Password: <code>Demo1234</code>
        </div>

        {/* Card */}
        <div className="auth-card">
          {error && (
            <div
              style={{
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
              }}
            >
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label
                style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}
                htmlFor="login-email"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-input"
                autoComplete="email"
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                <label
                  style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}
                  htmlFor="login-password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  style={{ fontSize: "0.75rem", color: "var(--brand)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingRight: "2.5rem" }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted-foreground)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", marginTop: "0.25rem" }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ margin: "1rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <button
              className="btn-outline"
              style={{ fontSize: "0.8125rem" }}
              onClick={() => setError("OAuth not connected yet — use demo account above.")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              className="btn-outline"
              style={{ fontSize: "0.8125rem" }}
              onClick={() => setError("OAuth not connected yet — use demo account above.")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        <p style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "var(--brand)", fontWeight: 500 }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

