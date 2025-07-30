"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineStar,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineDown,
  AiOutlineBook,
  AiOutlineFileText,
} from "react-icons/ai";

type BibleVerse = {
  reference: string;
  text: string;
};

type BibleBook = {
  name: string;
  chapters: number;
  testament: "old" | "new";
};

export default function Bible() {
  const [query, setQuery] = useState("");
  const [verseData, setVerseData] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [starredVerses, setStarredVerses] = useState<BibleVerse[]>([]);
  const [showBooks, setShowBooks] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showChapters, setShowChapters] = useState(false);
  const [showVerseRange, setShowVerseRange] = useState(false);
  const [startVerse, setStartVerse] = useState<number | null>(null);
  const [endVerse, setEndVerse] = useState<number | null>(null);
  const [verseCount, setVerseCount] = useState(0);

  const bibleBooks: BibleBook[] = [
    // Old Testament books...
    { name: "Genesis", chapters: 50, testament: "old" },
    { name: "Exodus", chapters: 40, testament: "old" },
    { name: "Leviticus", chapters: 27, testament: "old" },
    { name: "Numbers", chapters: 36, testament: "old" },
    { name: "Deuteronomy", chapters: 34, testament: "old" },
    { name: "Joshua", chapters: 24, testament: "old" },
    { name: "Judges", chapters: 21, testament: "old" },
    { name: "Ruth", chapters: 4, testament: "old" },
    { name: "1 Samuel", chapters: 31, testament: "old" },
    { name: "2 Samuel", chapters: 24, testament: "old" },
    { name: "1 Kings", chapters: 22, testament: "old" },
    { name: "2 Kings", chapters: 25, testament: "old" },
    { name: "1 Chronicles", chapters: 29, testament: "old" },
    { name: "2 Chronicles", chapters: 36, testament: "old" },
    { name: "Ezra", chapters: 10, testament: "old" },
    { name: "Nehemiah", chapters: 13, testament: "old" },
    { name: "Esther", chapters: 10, testament: "old" },
    { name: "Job", chapters: 42, testament: "old" },
    { name: "Psalms", chapters: 150, testament: "old" },
    { name: "Proverbs", chapters: 31, testament: "old" },
    { name: "Ecclesiastes", chapters: 12, testament: "old" },
    { name: "Song of Solomon", chapters: 8, testament: "old" },
    { name: "Isaiah", chapters: 66, testament: "old" },
    { name: "Jeremiah", chapters: 52, testament: "old" },
    { name: "Lamentations", chapters: 5, testament: "old" },
    { name: "Ezekiel", chapters: 48, testament: "old" },
    { name: "Daniel", chapters: 12, testament: "old" },
    { name: "Hosea", chapters: 14, testament: "old" },
    { name: "Joel", chapters: 3, testament: "old" },
    { name: "Amos", chapters: 9, testament: "old" },
    { name: "Obadiah", chapters: 1, testament: "old" },
    { name: "Jonah", chapters: 4, testament: "old" },
    { name: "Micah", chapters: 7, testament: "old" },
    { name: "Nahum", chapters: 3, testament: "old" },
    { name: "Habakkuk", chapters: 3, testament: "old" },
    { name: "Zephaniah", chapters: 3, testament: "old" },
    { name: "Haggai", chapters: 2, testament: "old" },
    { name: "Zechariah", chapters: 14, testament: "old" },
    { name: "Malachi", chapters: 4, testament: "old" },
    // New Testament
    { name: "Matthew", chapters: 28, testament: "new" },
    { name: "Mark", chapters: 16, testament: "new" },
    { name: "Luke", chapters: 24, testament: "new" },
    { name: "John", chapters: 21, testament: "new" },
    { name: "Acts", chapters: 28, testament: "new" },
    { name: "Romans", chapters: 16, testament: "new" },
    { name: "1 Corinthians", chapters: 16, testament: "new" },
    { name: "2 Corinthians", chapters: 13, testament: "new" },
    { name: "Galatians", chapters: 6, testament: "new" },
    { name: "Ephesians", chapters: 6, testament: "new" },
    { name: "Philippians", chapters: 4, testament: "new" },
    { name: "Colossians", chapters: 4, testament: "new" },
    { name: "1 Thessalonians", chapters: 5, testament: "new" },
    { name: "2 Thessalonians", chapters: 3, testament: "new" },
    { name: "1 Timothy", chapters: 6, testament: "new" },
    { name: "2 Timothy", chapters: 4, testament: "new" },
    { name: "Titus", chapters: 3, testament: "new" },
    { name: "Philemon", chapters: 1, testament: "new" },
    { name: "Hebrews", chapters: 13, testament: "new" },
    { name: "James", chapters: 5, testament: "new" },
    { name: "1 Peter", chapters: 5, testament: "new" },
    { name: "2 Peter", chapters: 3, testament: "new" },
    { name: "1 John", chapters: 5, testament: "new" },
    { name: "2 John", chapters: 1, testament: "new" },
    { name: "3 John", chapters: 1, testament: "new" },
    { name: "Jude", chapters: 1, testament: "new" },
    { name: "Revelation", chapters: 22, testament: "new" },
  ];

  // Load starred from memory (simulating localStorage)
  useEffect(() => {
    // In a real app, this would use localStorage
    // const stored = localStorage.getItem("starredVerses");
    // if (stored) {
    //   setStarredVerses(JSON.parse(stored));
    // }
  }, []);

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

  const fetchVerseCount = async (book: string, chapter: number) => {
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(`${book} ${chapter}:1`)}`);
      const data = await res.json();
      if (data.verses) {
        let maxVerse = 0;
        data.verses.forEach((verse: any) => {
          const verseNum = parseInt(verse.verse);
          if (verseNum > maxVerse) maxVerse = verseNum;
        });
        setVerseCount(maxVerse);
      }
    } catch (err) {
      console.error("Could not determine verse count");
      setVerseCount(30);
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

  const handleBookSelect = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setShowBooks(false);
    setShowChapters(true);
    setShowVerseRange(false);
    setStartVerse(null);
    setEndVerse(null);
  };

  const handleChapterSelect = async (chapter: number) => {
    setSelectedChapter(chapter);
    setShowChapters(false);
    setShowVerseRange(true);
    await fetchVerseCount(selectedBook!, chapter);
  };

  const handleVerseSelect = () => {
    if (!selectedBook || !selectedChapter || !startVerse) return;
    
    const verseRange = endVerse 
      ? `${selectedBook} ${selectedChapter}:${startVerse}-${endVerse}`
      : `${selectedBook} ${selectedChapter}:${startVerse}`;
    
    fetchVerse(verseRange);
    setShowVerseRange(false);
  };

  const resetSelection = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
    setShowBooks(false);
    setShowChapters(false);
    setShowVerseRange(false);
    setStartVerse(null);
    setEndVerse(null);
  };

  const getCurrentSelectionText = () => {
    if (!selectedBook) return "Select a book";
    if (!selectedChapter) return selectedBook;
    if (!startVerse) return `${selectedBook} ${selectedChapter}`;
    if (!endVerse) return `${selectedBook} ${selectedChapter}:${startVerse}`;
    return `${selectedBook} ${selectedChapter}:${startVerse}-${endVerse}`;
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

        {/* Sleek Navigation Breadcrumb */}
        <div className=" backdrop-blur-md border border-black/20 dark:border-white/20 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <AiOutlineBook className="text-lg" />
              <span>Navigation</span>
            </div>
            {(selectedBook || selectedChapter) && (
              <button
                onClick={resetSelection}
                className="text-xs px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition"
              >
                Reset
              </button>
            )}
          </div>
          
          <div className="text-lg font-medium mb-4">
            {getCurrentSelectionText()}
          </div>

          {/* Step-by-step Navigation */}
          <div className="space-y-3">
            {/* Step 1: Book Selection */}
            <div className={`transition-all duration-300 ${!selectedBook ? 'opacity-100' : 'opacity-60'}`}>
              <button
                onClick={() => setShowBooks(!showBooks)}
                
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20 transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">1</div>
                  <span>{selectedBook || "Choose Book"}</span>
                </div>
                <AiOutlineDown className={`transition-transform ${showBooks ? "rotate-180" : ""}`} />
              </button>

              {showBooks && (
                <div className="mt-2 rounded-lg bg-black/20 dark:bg-white/10 backdrop-blur-lg border border-black/20 dark:border-white/30 shadow-xl overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-3 bg-black/10 dark:bg-white/5 border-b border-black/20 dark:border-white/20">
                      <h3 className="font-semibold text-sm text-gray-800 dark:text-white/90 mb-2">Old Testament</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {bibleBooks
                          .filter((book) => book.testament === "old")
                          .map((book) => (
                            <button
                              key={book.name}
                              onClick={() => handleBookSelect(book.name)}
                              className="px-2 py-1.5 text-xs text-left rounded hover:bg-black/20 dark:hover:bg-white/20 transition truncate text-gray-700 dark:text-white/80"
                            >
                              {book.name}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="p-3 bg-black/10 dark:bg-white/5">
                      <h3 className="font-semibold text-sm text-gray-800 dark:text-white/90 mb-2">New Testament</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                        {bibleBooks
                          .filter((book) => book.testament === "new")
                          .map((book) => (
                            <button
                              key={book.name}
                              onClick={() => handleBookSelect(book.name)}
                              className="px-2 py-1.5 text-xs text-left rounded hover:bg-black/20 dark:hover:bg-white/20 transition truncate text-gray-700 dark:text-white/80"
                            >
                              {book.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Chapter Selection */}
            {selectedBook && (
              <div className={`transition-all duration-300 ${showChapters ? 'opacity-100' : 'opacity-60'}`}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">2</div>
                  <span>Choose Chapter{selectedChapter ? ` (${selectedChapter})` : ''}</span>
                </div>
                
                {showChapters && (
                  <div className="mt-2 p-3 rounded-lg bg-black/20 dark:bg-white/10 backdrop-blur-lg border border-black/20 dark:border-white/30">
                    <div className="grid grid-cols-8 sm:grid-cols-10 gap-1 max-h-40 overflow-y-auto">
                      {Array.from(
                        { length: bibleBooks.find((b) => b.name === selectedBook)?.chapters || 0 },
                        (_, i) => i + 1
                      ).map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => handleChapterSelect(chapter)}
                          className="px-2 py-1.5 text-sm rounded hover:bg-black/20 dark:hover:bg-white/20 transition text-center text-gray-700 dark:text-white/80"
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Verse Selection */}
            {selectedChapter && (
              <div className={`transition-all duration-300 ${showVerseRange ? 'opacity-100' : 'opacity-60'}`}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20">
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">3</div>
                  <span>Choose Verses{startVerse ? ` (${startVerse}${endVerse ? `-${endVerse}` : ''})` : ''}</span>
                </div>

                {showVerseRange && (
                  <div className="mt-2 p-4 rounded-lg bg-black/20 dark:bg-white/10 backdrop-blur-lg border border-black/20 dark:border-white/30">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-2 opacity-80">Start Verse</label>
                        <input
                          type="number"
                          min="1"
                          max={verseCount}
                          value={startVerse || ""}
                          onChange={(e) => setStartVerse(Number(e.target.value))}
                          placeholder="Type verse #"
                          className="w-full bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-2 opacity-80">End Verse (optional)</label>
                        <input
                          type="number"
                          min={startVerse || 1}
                          max={verseCount}
                          value={endVerse || ""}
                          onChange={(e) => setEndVerse(Number(e.target.value))}
                          placeholder="Type verse #"
                          disabled={!startVerse}
                          className="w-full bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={handleVerseSelect}
                      disabled={!startVerse}
                      className={`w-full py-2.5 rounded-lg font-medium transition ${
                        startVerse 
                          ? "bg-red-600 hover:bg-red-700 text-white" 
                          : "bg-black/10 dark:bg-white/10 cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <AiOutlineFileText />
                        Show Verses
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
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