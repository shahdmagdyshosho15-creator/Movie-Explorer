import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

function Home() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const [popularRes, trendingRes] = await Promise.all([
          tmdb.get("/movie/popular"),
          tmdb.get("/trending/movie/week"),
        ]);
        setMovies(popularRes.data.results);
        setTrending(trendingRes.data.results);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  if (loading)
    return <Loading />;
  if (error)
    return <p className="text-center text-brand mt-20">{error}</p>;

  const hero = movies[0];

  return (
    <div>
      {hero && (
        <section
          className="relative h-[70vh] bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${hero.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />
          <div className="relative px-6 md:px-12 pb-12 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-3">{hero.title}</h1>
            <p className="text-gray-300 mb-2">
              {hero.release_date?.slice(0, 4)} • ⭐ {hero.vote_average?.toFixed(1)}
            </p>
            <p className="text-gray-300 line-clamp-3 mb-6">{hero.overview}</p>
            <Link
              to={`/movies/${hero.id}`}
              className="inline-block bg-brand hover:bg-brand-dark px-8 py-3 rounded-md font-bold transition shadow-[0_0_20px_rgba(229,9,20,0.6)]"
            >
              View Details
            </Link>
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 py-10">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-3">
          Popular Movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.slice(1, 11).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-10">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-brand pl-3">
          Trending This Week
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trending.slice(0, 5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <div className="text-center mt-10">
  <Link
    to="/movies"
    className="inline-block bg-brand hover:bg-brand-dark px-8 py-3 rounded-md font-bold transition shadow-[0_0_20px_rgba(229,9,20,0.5)]"
  >
    More Movies →
  </Link>
</div>
    </div>
  );
}

export default Home;