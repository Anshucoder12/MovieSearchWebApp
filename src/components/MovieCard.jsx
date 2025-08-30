import "./MovieCard.css";

export default function MovieCard({ movie, onClick, onAddToWatchlist }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster}
        alt={movie.Title}
        onClick={() => onClick(movie.imdbID)}
      />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">{movie.Year}</p>

      {onAddToWatchlist && (
        <button
          className="add-watchlist-btn"
          onClick={() => onAddToWatchlist(movie)}
        >
          ⭐ Add to Watchlist
        </button>
      )}
    </div>
  );
}
