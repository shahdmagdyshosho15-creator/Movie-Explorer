import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750/141414/e50914?text=No+Poster";

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group relative block bg-card rounded-xl overflow-hidden border border-white/10 transition duration-300 hover:-translate-y-2 hover:border-brand hover:shadow-[0_0_25px_rgba(229,9,20,0.5)]"
    >
      <div className="relative">
        <img src={poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
        <span className="absolute top-2 right-2 bg-brand text-white text-xs font-bold px-2 py-1 rounded-md">
          ⭐ {movie.vote_average?.toFixed(1)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-semibold truncate group-hover:text-brand transition">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;