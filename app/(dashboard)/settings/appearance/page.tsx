"use client";
// API_KEY: PATCH /api/user/preferences — body: { theme, fontSize, language }
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "light", label: "Light", preview: "bg-white border-gray-200" },
  { id: "dark", label: "Dark", preview: "bg-gray-900 border-gray-700" },
  { id: "system", label: "System", preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400" },
];

const fontSizes = ["12px", "13px", "14px", "15px", "16px"];
const editorThemes = ["VS Dark", "GitHub Light", "Monokai", "Dracula", "Solarized"];

export default function AppearancePage() {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("14px");
  const [editorTheme, setEditorTheme] = useState("VS Dark");
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    // TODO (backend): PATCH /api/user/preferences with { theme, fontSize, editorTheme }
    await new Promise((r) => setTimeout(r, 400));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Theme */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "relative flex flex-col gap-2 p-3 rounded-xl border-2 transition-all",
                theme === t.id ? "border-blue-600" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className={cn("h-12 rounded-lg border", t.preview)} />
              <span className="text-xs font-medium text-gray-700">{t.label}</span>
              {theme === t.id && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Code editor */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Code Editor</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Editor theme</label>
            <div className="flex flex-wrap gap-2">
              {editorThemes.map((t) => (
                <button
                  key={t}
                  onClick={() => setEditorTheme(t)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                    editorTheme === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font size</label>
            <div className="flex flex-wrap gap-2">
              {fontSizes.map((f) => (
                <button
                  key={f}
                  onClick={() => setFontSize(f)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                    fontSize === f ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {saved && <Check size={14} />}
        {saved ? "Saved!" : "Save preferences"}
      </button>
    </div>
  );
}
