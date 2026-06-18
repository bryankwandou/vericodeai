"use client";
// API_KEY: GET /api/user/me — returns: { firstName, lastName, username, email, phone, bio, avatar }
// API_KEY: PATCH /api/user/me — body: { firstName, lastName, username, phone, bio }
// API_KEY: POST /api/user/avatar — body: FormData(file) — returns: { avatarUrl }
import { useState } from "react";
import { Camera, Check } from "lucide-react";

export default function ProfileSettingsPage() {
  const [form, setForm] = useState({
    firstName: "gani",
    lastName: "",
    username: "gani",
    email: "broganesh93@gmail.com",
    phone: "",
    bio: "",
  });
  const [saved, setSaved] = useState(false);

  function update(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })); setSaved(false); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO (backend): PATCH /api/user/me with form data
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-800 text-sm">gani</span>
        <span className="text-gray-400">/ Your personal account</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Public profile</h2>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 -mt-3">Your name may appear around VeriCode AI where you contribute or are mentioned.</p>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
              <input
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Public email</label>
            <div className="flex items-center gap-2">
              <input
                value={form.email}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <button type="button" className="text-xs text-red-500 hover:text-red-700 font-medium">
                × Remove
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">You can manage verified email addresses in your <a href="#" className="text-blue-600 hover:underline">email settings</a>.</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
            <div className="flex gap-2">
              <select className="px-2 py-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-blue-500">
                <option>+1 (US/CA)</option>
                <option>+62 (ID)</option>
                <option>+91 (IN)</option>
                <option>+44 (UK)</option>
              </select>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="e.g. 555-0198"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Your phone number is used for account recovery and important alerts. It will not be displayed publicly.</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={3}
              placeholder="Tell others about yourself..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">You can @mention other users and organizations to link to them.</p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            {saved && <Check size={14} />}
            {saved ? "Saved!" : "Update profile"}
          </button>
        </form>
      </div>

      {/* Avatar section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Profile picture</h2>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center relative">
            <span className="text-2xl font-bold text-blue-600">G</span>
          </div>
          <div className="space-y-2">
            {/* TODO (backend): POST /api/user/avatar with FormData */}
            <label className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <Camera size={14} /> Upload photo
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <p className="text-xs text-gray-400">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
