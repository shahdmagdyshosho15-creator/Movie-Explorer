function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for movies..."
      className="w-full md:w-96 bg-card border border-white/10 focus:border-brand outline-none rounded-md px-4 py-3 text-white placeholder-gray-500 transition"
    />
  );
}

export default SearchBar;