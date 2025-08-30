import { useEffect, useState } from "react";

export default function MovieModal({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=3e213055&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [imdbID]);

  const isInWatchlist = watchlist.some((m) => m.imdbID === imdbID);

  const toggleWatchlist = () => {
    let updatedList;
    if (isInWatchlist) {
      updatedList = watchlist.filter((m) => m.imdbID !== imdbID);
    } else {
      updatedList = [...watchlist, movie];
    }
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded"
        >
          ✖
        </button>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="rounded-lg mb-4 w-full"
        />
        <h2 className="text-xl font-bold">{movie.Title}</h2>
        <p className="text-sm mb-2">
          {movie.Year} • {movie.Genre} • {movie.Runtime}
        </p>
        <p className="text-sm mb-2">⭐ {movie.imdbRating} / 10</p>
        <p className="text-sm mb-2 italic">{movie.Actors}</p>
        <p className="text-sm">{movie.Plot}</p>
        <button
          onClick={toggleWatchlist}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded"
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
