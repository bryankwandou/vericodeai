"use client";
// API_KEY: GET /api/practice/problems?topic={topic}&difficulty={difficulty}&company={company}&language={language}&status={status}&sort={sort} — returns: Problem[]
import { useState } from "react";
import { Search, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const topics = ["All Topics", "Algorithms", "Arrays & Strings", "Data Structures", "Interview Prep", "Problem Solving"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const problems = [
  { id: 1, title: "Binary Search", difficulty: "Easy", acceptance: "57.0%", topic: "Algorithms", solved: true, starred: true },
  { id: 2, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "56.4%", topic: "Algorithms", solved: false, starred: false },
  { id: 3, title: "Fibonacci Number", difficulty: "Easy", acceptance: "66.5%", topic: "Algorithms", solved: false, starred: false },
  { id: 4, title: "Climbing Stairs", difficulty: "Easy", acceptance: "50.0%", topic: "Algorithms", solved: false, starred: false },
  { id: 5, title: "Reverse String Recursively", difficulty: "Easy", acceptance: "42.2%", topic: "Arrays & Strings", solved: false, starred: false },
  { id: 6, title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", acceptance: "45.8%", topic: "Algorithms", solved: false, starred: false },
  { id: 7, title: "Sort an Array", difficulty: "Medium", acceptance: "38.1%", topic: "Algorithms", solved: false, starred: false },
  { id: 8, title: "Two Sum", difficulty: "Easy", acceptance: "72.3%", topic: "Arrays & Strings", solved: true, starred: false },
  { id: 9, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "34.5%", topic: "Arrays & Strings", solved: false, starred: false },
  { id: 10, title: "Merge Intervals", difficulty: "Medium", acceptance: "47.8%", topic: "Arrays & Strings", solved: false, starred: false },
  { id: 11, title: "Maximum Depth of Binary Tree", difficulty: "Easy", acceptance: "74.0%", topic: "Data Structures", solved: false, starred: false },
  { id: 12, title: "Valid Parentheses", difficulty: "Easy", acceptance: "69.2%", topic: "Data Structures", solved: false, starred: false },
];

const diffColor: Record<string, string> = {
  Easy: "text-green-600 bg-green-50",
  Medium: "text-yellow-600 bg-yellow-50",
  Hard: "text-red-600 bg-red-50",
};

export default function PracticePage() {
  const [topic, setTopic] = useState("All Topics");
  const [diff, setDiff] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Default Order");
  const [filter, setFilter] = useState("All Challenges");

  const filtered = problems.filter(
    (p) =>
      (topic === "All Topics" || p.topic === topic) &&
      (diff === "All" || p.difficulty === diff) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  const solved = problems.filter((p) => p.solved).length;

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Practice</h1>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-52 transition-all"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">{solved} / {problems.length} solved</span>
          <span className="text-gray-400">{Math.round((solved / problems.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(solved / problems.length) * 100}%` }} />
        </div>
      </div>

      {/* Topic tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
              topic === t ? "bg-pink-500 text-white border-pink-500" : "border-gray-200 text-gray-600 hover:border-gray-400"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-400 uppercase tracking-wide">SORT:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 outline-none text-xs"
          >
            <option>Default Order</option>
            <option>Acceptance Rate</option>
            <option>Difficulty</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-400 uppercase tracking-wide">FILTER:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 outline-none text-xs"
          >
            <option>All Challenges</option>
            <option>Unsolved</option>
            <option>Solved</option>
            <option>Bookmarked</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={cn(
                "px-2.5 py-1 rounded-md border transition-colors",
                diff === d ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 text-gray-600 hover:border-gray-400"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Problem list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer group transition-colors"
            >
              <span className="text-sm text-gray-400 w-6 shrink-0 text-right">{i + 1}.</span>
              {p.solved ? (
                <CheckCircle2 size={15} className="text-green-500 shrink-0" />
              ) : (
                <div className="w-[15px] h-[15px] rounded-full border-2 border-gray-200 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </span>
              </div>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full shrink-0", diffColor[p.difficulty])}>
                {p.difficulty}
              </span>
              <span className="text-xs text-gray-400 w-14 text-right shrink-0">{p.acceptance}</span>
              <button
                className={cn("shrink-0 transition-colors", p.starred ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400")}
                onClick={(e) => e.stopPropagation()}
              >
                <Star size={14} fill={p.starred ? "currentColor" : "none"} />
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <p className="text-sm">No problems found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
