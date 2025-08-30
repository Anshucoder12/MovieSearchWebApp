export default function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition cursor-pointer"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="rounded-t-lg w-full h-64 object-cover"
      />
      <div className="p-3">
        <h2 className="font-bold">{movie.Title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
}
