"use client";
import { useState, useEffect } from "react";
import { Camera, Check } from "lucide-react";

export default function ProfileSettingsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [saved, setSaved] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("vericode_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        const nameParts = (user.name || "").split(" ");
        setForm((prev) => ({
          ...prev,
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          username: (user.email || "").split("@")[0] || "",
          email: user.email || "",
        }));
      } catch {
        // ignore
      }
    }
  }, []);

  function update(k: string, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 400));
    // Persist updated name to session
    const stored = localStorage.getItem("vericode_user");
    if (stored) {
      const user = JSON.parse(stored);
      user.name = [form.firstName, form.lastName].filter(Boolean).join(" ");
      localStorage.setItem("vericode_user", JSON.stringify(user));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const initials = [form.firstName[0], form.lastName[0]].filter(Boolean).join("").toUpperCase() || "?";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 700 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
        <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem" }}>{form.username || "account"}</span>
        <span style={{ color: "var(--muted-foreground)" }}>/ Your personal account</span>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1.25rem" }}>Public profile</h2>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label htmlFor="settings-firstname" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                First Name
              </label>
              <input id="settings-firstname" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="form-input" />
            </div>
            <div>
              <label htmlFor="settings-lastname" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
                Last Name
              </label>
              <input id="settings-lastname" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="form-input" />
            </div>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "-0.75rem" }}>
            Your name may appear around VeriCode AI where you contribute or are mentioned.
          </p>

          {/* Username */}
          <div>
            <label htmlFor="settings-username" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>@</span>
              <input
                id="settings-username"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                className="form-input"
                style={{ paddingLeft: "1.75rem" }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="settings-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Public email
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                id="settings-email"
                value={form.email}
                readOnly
                className="form-input"
                style={{ flex: 1, background: "var(--muted)", color: "var(--muted-foreground)", cursor: "not-allowed" }}
              />
              <button type="button" style={{ fontSize: "0.75rem", color: "var(--destructive)", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                Remove
              </button>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
              You can manage verified email addresses in your{" "}
              <a href="#" style={{ color: "var(--brand)", textDecoration: "none" }}>email settings</a>.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="settings-phone" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Phone number
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                style={{
                  padding: "0.5rem 0.5rem",
                  fontSize: "0.875rem",
                  border: "1px solid var(--input-border)",
                  borderRadius: "0.5rem",
                  background: "var(--input-bg)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              >
                <option>+1 (US/CA)</option>
                <option>+62 (ID)</option>
                <option>+91 (IN)</option>
                <option>+44 (UK)</option>
              </select>
              <input
                id="settings-phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="e.g. 555-0198"
                className="form-input"
                style={{ flex: 1 }}
              />
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
              Your phone number is used for account recovery and important alerts. It will not be displayed publicly.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="settings-bio" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)", marginBottom: "0.375rem" }}>
              Bio
            </label>
            <textarea
              id="settings-bio"
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={3}
              placeholder="Tell others about yourself..."
              className="form-input"
              style={{ resize: "none" }}
            />
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
              You can @mention other users and organizations to link to them.
            </p>
          </div>

          <button
            id="settings-save"
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              background: saved ? "#22c55e" : "var(--brand)",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              width: "fit-content",
            }}
          >
            {saved && <Check size={14} />}
            {saved ? "Saved!" : "Update profile"}
          </button>
        </form>
      </div>

      {/* Avatar section */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", marginBottom: "1rem" }}>Profile picture</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--brand-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--brand)" }}>{initials}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.5rem",
                background: "var(--card)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget).style.background = "var(--muted)")}
              onMouseLeave={(e) => ((e.currentTarget).style.background = "var(--card)")}
            >
              <Camera size={14} />
              Upload photo
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </label>
            <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
