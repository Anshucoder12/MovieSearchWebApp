import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

export default function SearchResults({ query }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=3e213055&s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.Search || []);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
        ))
      ) : (
        <p>No movies found. Try another title 🎭</p>
      )}
      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
