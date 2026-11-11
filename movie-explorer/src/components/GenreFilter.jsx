function GenreFilter({ genres, selected, onSelect }) {
  const base = "px-4 py-2 rounded-full text-sm font-medium border transition";
  const active = "bg-brand border-brand text-white shadow-[0_0_12px_rgba(229,9,20,0.6)]";
  const idle = "border-white/20 text-gray-300 hover:border-brand hover:text-white";

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onSelect("")} className={`${base} ${selected === "" ? active : idle}`}>
        All
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(String(g.id))}
          className={`${base} ${selected === String(g.id) ? active : idle}`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;