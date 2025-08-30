import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import "./Home.css";

export default function Home({ setPage, setSearchQuery }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load trending movies by default
    fetchMovies("Avengers");
  }, []);

  const fetchMovies = (query) => {
    fetch(`http://www.omdbapi.com/?apikey=3e213055&s=${query}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search || []));
  };

  // Add movie to watchlist in localStorage
  const addToWatchlist = (movie) => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
    const alreadyAdded = existing.find((m) => m.imdbID === movie.imdbID);
    if (!alreadyAdded) {
      localStorage.setItem("watchlist", JSON.stringify([...existing, movie]));
      alert(`${movie.Title} added to watchlist!`);
    } else {
      alert(`${movie.Title} is already in your watchlist.`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    fetchMovies(searchTerm);
    setPage("search"); // optional if you have a search page
  };

  return (
    <div className="home-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <h2 className="home-title">🔥 Trending / Search Results</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={setSelectedMovie}
            onAddToWatchlist={addToWatchlist}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
