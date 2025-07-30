"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineStar,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";

type BibleVerse = {
  reference: string;
  text: string;
};

export default function Bible() {
  const [query, setQuery] = useState("");
  const [verseData, setVerseData] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starredVerses, setStarredVerses] = useState<BibleVerse[]>([]);

  // Load starred from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("starredVerses");
    if (stored) {
      setStarredVerses(JSON.parse(stored));
    }
  }, []);

  // Save starred to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("starredVerses", JSON.stringify(starredVerses));
  }, [starredVerses]);

  const fetchVerse = async (input = query) => {
    if (!input) return;
    setLoading(true);
    setError("");
    setVerseData(null);

    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(input)}`);
      const data = await res.json();

      if (data?.text) {
        setVerseData({
          reference: data.reference,
          text: data.text.trim(),
        });
      } else {
        setError("Verse not found.");
      }
    } catch (err) {
      setError("Failed to fetch verse.");
    } finally {
      setLoading(false);
    }
  };

  const starVerse = () => {
    if (!verseData) return;
    const exists = starredVerses.some((v) => v.reference === verseData.reference);
    if (exists) return;

    if (starredVerses.length >= 5) {
      alert("You can only star up to 5 verses.");
      return;
    }

    setStarredVerses((prev) => [...prev, verseData]);
  };

  const unstarVerse = (ref: string) => {
    setStarredVerses((prev) => prev.filter((v) => v.reference !== ref));
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 bg-[var(--background)] text-[var(--foreground)] font-dm-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          <span className="inline-flex items-center gap-2">
            <AiOutlineSearch />
            Bible Search (KJV)
          </span>
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="e.g., John 3:16"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-zinc-700 text-black dark:text-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={() => fetchVerse()}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <AiOutlineSearch />
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-sm opacity-80 flex justify-center items-center gap-2">
            <AiOutlineSearch className="animate-spin" />
            Loading...
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {verseData && (
          <div className="relative bg-zinc-100 dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 p-5 rounded-xl shadow-md">
            <button
              onClick={() => setVerseData(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <AiOutlineClose size={18} />
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{verseData.reference}</p>
            <p className="text-lg leading-relaxed">{verseData.text}</p>
            <button
              onClick={starVerse}
              className="mt-4 inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition"
            >
              <AiOutlineStar />
              Star
            </button>
          </div>
        )}

        {starredVerses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AiOutlineStar className="text-yellow-500" />
              Starred Verses
            </h2>
            <ul className="space-y-4">
              {starredVerses.map((verse, idx) => (
                <li
                  key={idx}
                  className="relative bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700 shadow"
                >
                  <button
                    onClick={() => unstarVerse(verse.reference)}
                    className="absolute top-3 right-3 text-white hover:text-red-300 transition"
                  >
                    <AiOutlineDelete />
                  </button>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {verse.reference}
                  </p>
                  <p className="text-base">{verse.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
