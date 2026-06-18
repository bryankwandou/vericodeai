import { Construction } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Construction size={40} className="text-gray-300 mb-4" />
      <h1 className="text-xl font-bold text-gray-900 mb-2">Community — Coming Soon</h1>
      <p className="text-sm text-gray-500 max-w-xs">
        We are building something exciting. Stay tuned.
      </p>
    </div>
  );
}
