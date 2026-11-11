import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import Loading from "../components/Loading";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    tmdb
      .get("/genre/movie/list")
      .then((res) => setGenres(res.data.genres))
      .catch(() => {});
  }, []);


  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // fetch movies
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        let res;
        if (query.trim()) {
          res = await tmdb.get("/search/movie", { params: { query, page } });
        } else {
          res = await tmdb.get("/discover/movie", {
            params: {
              page,
              sort_by: sort,
              with_genres: genre || undefined,
              "vote_count.gte": sort === "vote_average.desc" ? 300 : undefined,
            },
          });
        }
        if (ignore) return;

        let results = res.data.results;
  
        if (query.trim() && genre) {
          results = results.filter((m) => m.genre_ids.includes(Number(genre)));
        }

        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
        setTotalPages(res.data.total_pages);
      } catch (err) {
        if (!ignore) setError("Failed to load movies");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [query, genre, sort, page]);

  const handleGenre = (id) => {
    setGenre(id);
    setPage(1);
  };

  const handleSort = (value) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold mb-6 border-l-4 border-brand pl-3">
        Explore Movies
      </h1>

      <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          disabled={!!query.trim()}
          className="bg-card border border-white/10 rounded-md px-4 py-3 text-white outline-none focus:border-brand disabled:opacity-40"
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="primary_release_date.desc">Release Date</option>
        </select>
      </div>

      <div className="mb-8">
        <GenreFilter genres={genres} selected={genre} onSelect={handleGenre} />
      </div>

      {error && <p className="text-brand text-center my-10">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-400 text-center my-20 text-lg">
          No movies found. Try another search.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
  {loading && <Loading />}
      {!loading && page < totalPages && (
        <div className="text-center mt-10">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-brand hover:bg-brand-dark px-8 py-3 rounded-md font-bold transition shadow-[0_0_20px_rgba(229,9,20,0.5)]"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies;