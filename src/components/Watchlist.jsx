import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">⭐ Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>
      ) : (
        <p>No movies in watchlist yet 🎬</p>
      )}
      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
