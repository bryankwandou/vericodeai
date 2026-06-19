import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--muted)" }}
    >
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
