"use client";

import { useState } from "react";

export default function Home() {
  const [material, setMaterial] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult("");

    if (!material.trim()) {
      setError("Please enter a material name first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ material }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-600/30">
            <span className="text-2xl">🏗️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Buildanta Material Helper
          </h1>
          <p className="text-slate-400">
            Get expert buying tips for any construction material in Kanpur
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. TMT bar, cement, tiles"
              className="flex-1 bg-white/10 border border-white/10 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Thinking...
                </>
              ) : (
                "Get Tips"
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 animate-[fadeIn_0.2s_ease-in]">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-5 py-4 animate-[fadeIn_0.3s_ease-in]">
              <div className="flex items-center gap-2 mb-2">
                <span>✅</span>
                <span className="text-emerald-400 font-medium text-sm">
                  Buying tips for &ldquo;{material}&rdquo;
                </span>
              </div>
              <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                {result}
              </p>
            </div>
          )}
        </div>

        
      </div>
    </main>
  );
}