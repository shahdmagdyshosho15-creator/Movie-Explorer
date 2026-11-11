const INFINITY_PATH =
  "M50 25 C60 5, 90 5, 90 25 C90 45, 60 45, 50 25 C40 5, 10 5, 10 25 C10 45, 40 45, 50 25 Z";

function Loading({ text = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <svg viewBox="0 0 100 50" className="w-32 h-16 infinity-svg">
        <defs>
          <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#f5c518" />
          </linearGradient>
        </defs>

    
        <path
          d={INFINITY_PATH}
          fill="none"
          stroke="url(#infGrad)"
          strokeOpacity="0.2"
          strokeWidth="5"
          strokeLinecap="round"
        />

  
        <path
          d={INFINITY_PATH}
          pathLength="200"
          fill="none"
          stroke="url(#infGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          className="infinity-path"
        />
      </svg>

      <span className="text-xl font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-brand to-[#f5c518] bg-clip-text text-transparent animate-pulse">
        {text}
      </span>
    </div>
  );
}

export default Loading;