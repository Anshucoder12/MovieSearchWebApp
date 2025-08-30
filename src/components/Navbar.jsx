import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ setPage, setSearchQuery, darkMode, setDarkMode }) {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSearchQuery(input);
    setPage("search");
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <h1 className="logo" onClick={() => setPage("home")}>
        🎬 MovieSearch
      </h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="actions">
        <button onClick={() => setPage("watchlist")}>⭐ Watchlist</button>
        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
