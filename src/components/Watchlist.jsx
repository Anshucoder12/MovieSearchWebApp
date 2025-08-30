import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import "./Watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">⭐ Your Watchlist</h2>

      {watchlist.length > 0 ? (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          🎬 No movies in your watchlist yet. Start adding some!
        </p>
      )}

      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
