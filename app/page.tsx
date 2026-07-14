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

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Buildanta Material Helper
        </h1>
        <p className="text-gray-500 mb-6">
          Enter a construction material and get quick buying tips.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            placeholder="e.g. TMT bar, cement, tiles"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 whitespace-pre-wrap text-gray-800">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}