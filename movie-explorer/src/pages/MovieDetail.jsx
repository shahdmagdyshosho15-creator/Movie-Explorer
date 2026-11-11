import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import FavoriteButton from "../components/FavoriteButton";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await tmdb.get(`/movie/${id}`, {
          params: { append_to_response: "videos,similar" },
        });
        if (!ignore) setMovie(res.data);
      } catch (err) {
        if (!ignore) setError("Failed to load movie details");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading)
    return <h2 className="text-center text-brand text-2xl mt-20 animate-pulse">Loading...</h2>;
  if (error || !movie)
    return <p className="text-center text-brand mt-20">{error || "Movie not found"}</p>;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750/141414/e50914?text=No+Poster";

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  const similar = movie.similar?.results.slice(0, 5) || [];
  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;

  return (
    <div>
      <section
        className="relative bg-cover bg-center"
        style={backdrop ? { backgroundImage: `url(${backdrop})` } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-black/60" />

        <div className="relative px-6 md:px-12 py-12 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <img
            src={poster}
            alt={movie.title}
            className="w-64 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(229,9,20,0.35)] self-center md:self-start"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-gray-400 italic mb-4">{movie.tagline}</p>}

            <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
              <span>📅 {movie.release_date}</span>
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              {movie.runtime > 0 && <span>⏱ {hours}h {mins}m</span>}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 rounded-full text-sm border border-brand text-brand"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>

            <div className="flex flex-wrap gap-3">
              <FavoriteButton movie={movie} />
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-md font-bold border border-white/30 hover:border-white transition"
                >
                  ▶ Watch Trailer
                </a>
              )}
              <Link
                to="/movies"
                className="px-6 py-3 rounded-md font-bold border border-white/30 hover:border-white transition"
              >
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-3">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {similar.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MovieDetail;