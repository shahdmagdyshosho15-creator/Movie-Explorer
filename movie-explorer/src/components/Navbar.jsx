import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `pb-1 border-b-2 transition ${
      isActive
        ? "border-brand text-white"
        : "border-transparent text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/90 backdrop-blur border-b border-brand/30">
      <Link to="/" className="text-2xl font-extrabold tracking-widest text-brand uppercase">
        Movie<span className="text-white">Explorer</span>
      </Link>

      <div className="flex items-center gap-6 font-medium">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/movies" className={linkClass}>Movies</NavLink>
        <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
        <Link to="/movies" aria-label="Search" className="hover:text-brand transition">
          🔍
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;