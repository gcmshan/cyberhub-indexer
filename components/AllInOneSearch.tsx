"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AllInOneSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [trustedSites, setTrustedSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Suggestions from Local FastAPI Backend (No CORS Issue!)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length >= 2) {
        try {
          const res = await fetch(
            `https://amazing-salamander-896e62.netlify.app/api/suggestions?q=${encodeURIComponent(trimmedQuery)}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.suggestions && data.suggestions.length > 0) {
              setSuggestions(data.suggestions);
              setShowSuggestions(true);
            } else {
              setSuggestions([]);
            }
          }
        } catch (e) {
          console.error("Suggestion fetch error:", e);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    setLoading(true);
    try {
      const res = await fetch(
        `const res = await fetch(`https://amazing-salamander-896e62.netlify.app/api/search?q=${encodeURIComponent(query)}`);/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setTrustedSites(data.trustedSites || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults(query);
  };

  return (
    <div className="w-full px-4 text-white py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          CyberHub Games Indexer
        </h1>
        <p className="text-slate-400 text-sm">
          Direct BitTorrent & Repack Page Extractor
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative mb-6" ref={searchRef}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
              placeholder="Type game name (e.g. God of War, GTA V)..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Indexing..." : "Search"}
            </button>
          </form>

          {/* Auto Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-28 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
              {suggestions.map((title, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setQuery(title);
                    fetchResults(title);
                  }}
                  className="px-4 py-3 hover:bg-slate-800 text-sm cursor-pointer border-b border-slate-800/50 last:border-0 text-slate-300 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <span>🎮</span>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct Portals */}
        {trustedSites.length > 0 && (
          <div className="mb-8 bg-slate-900/80 border border-indigo-500/30 p-4 rounded-2xl">
            <h2 className="text-xs font-bold text-indigo-400 tracking-wider uppercase mb-3">
              🎯 DIRECT PORTALS SEARCH LINKS:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {trustedSites.map((site: any, i: number) => (
                <a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="font-semibold text-sm text-white">{site.name}</p>
                    <p className="text-xs text-indigo-300">{site.badge}</p>
                  </div>
                  <span className="text-xs bg-indigo-600 px-2.5 py-1 rounded-lg">Open ↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 font-semibold animate-pulse">
            Extracting Repacks and Magnet Links...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((item: any) => {
              const isFitGirl = item.source?.includes("FitGirl");
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            isFitGirl
                              ? "bg-pink-500/20 text-pink-400 border-pink-500/30"
                              : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                          }`}
                        >
                          {item.source}
                        </span>
                        <span className="text-xs text-slate-400">Repack Release</span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-4 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2.5 mt-2">
                      {item.magnetUrl ? (
                        <a
                          href={item.magnetUrl}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-center transition-colors text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                        >
                          🧲 Direct Magnet / Torrent Link
                        </a>
                      ) : (
                        <a
                          href={item.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-amber-600/80 hover:bg-amber-600 text-white font-medium py-3 rounded-xl text-center transition-colors text-xs flex items-center justify-center gap-1.5"
                        >
                          🔗 Open Page for Magnet & Mirror Links ↗
                        </a>
                      )}

                      <a
                        href={item.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-xl text-center transition-colors text-xs block"
                      >
                        🌐 Open {item.source} Page ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}