import { useState } from "react";

export default function Navbar({ setPage, setSearchQuery, darkMode, setDarkMode }) {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSearchQuery(input);
    setPage("search");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 dark:bg-indigo-800 text-white shadow-lg">
      <h1
        onClick={() => setPage("home")}
        className="text-xl font-bold cursor-pointer"
      >
        🎬 MovieSearch
      </h1>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-3 py-1 rounded-l-lg text-black"
        />
        <button type="submit" className="bg-yellow-500 px-4 rounded-r-lg">
          Search
        </button>
      </form>
      <div className="flex items-center gap-4">
        <button onClick={() => setPage("watchlist")}>⭐ Watchlist</button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-2 py-1 rounded"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
