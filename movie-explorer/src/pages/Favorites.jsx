import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-brand pl-3">
        My Favorites{" "}
        <span className="text-brand text-xl">({favorites.length})</span>
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-6">
            You haven't added any favorites yet.
          </p>
          <Link
            to="/movies"
            className="inline-block bg-brand hover:bg-brand-dark px-8 py-3 rounded-md font-bold transition shadow-[0_0_20px_rgba(229,9,20,0.5)]"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;