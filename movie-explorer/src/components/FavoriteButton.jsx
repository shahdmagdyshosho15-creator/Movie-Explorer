import { useFavorites } from "../context/FavoritesContext";

function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.id);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className={`px-6 py-3 rounded-md font-bold border transition ${
        fav
          ? "border-brand text-brand hover:bg-brand/10"
          : "bg-brand border-brand hover:bg-brand-dark shadow-[0_0_20px_rgba(229,9,20,0.5)]"
      }`}
    >
      {fav ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
    </button>
  );
}

export default FavoriteButton;