import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

export default function Home({ setPage, setSearchQuery }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fake trending by searching "Avengers"
    fetch("http://www.omdbapi.com/?apikey=3e213055&s=Avengers")
      .then((res) => res.json())
      .then((data) => setMovies(data.Search || []));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🔥 Trending Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={setSelectedMovie} />
        ))}
      </div>
      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
