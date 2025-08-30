import { useEffect, useState } from "react";
import "./MovieModal.css";

export default function MovieModal({ imdbID, onClose }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=3e213055&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [imdbID]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <img src={movie.Poster} alt={movie.Title} className="modal-img" />
        <h2>{movie.Title}</h2>
        <p>{movie.Year} | {movie.Genre}</p>
        <p>{movie.Plot}</p>
      </div>
    </div>
  );
}
