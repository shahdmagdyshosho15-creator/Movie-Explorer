import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 border-t border-brand/30 bg-black px-6 md:px-12 pt-8 pb-6 text-sm text-gray-400">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <p className="text-brand font-extrabold tracking-widest uppercase">
            Movie<span className="text-white">Explorer</span>
          </p>
          <p className="mt-2">Discover, search and save your favorite movies.</p>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-white">About</Link>
          <a href="mailto:shahdmagdyelshora@gmail.com" className="hover:text-white">Contact</a>
        </div>
      </div>

      <p className="mt-6 text-xs">
        © {new Date().getFullYear()} Movie Explorer. This product uses the TMDB API
        but is not endorsed or certified by TMDB.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">
          Designed &amp; Built by
        </p>
        <p className="mt-2 text-3xl md:text-5xl font-black tracking-[0.2em] bg-gradient-to-r from-brand via-[#ff6a3d] to-[#f5c518] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(229,9,20,0.5)]">
           SHAHD MAGDY
        </p>
      </div>
    </footer>
  );
}

export default Footer;