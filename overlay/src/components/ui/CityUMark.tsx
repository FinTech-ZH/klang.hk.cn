/** 城大风格标识 — 抽象几何 mark，非官方 Logo */
export default function CityUMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="40" height="40" rx="11" fill="url(#cityu-grad)" />
      <path
        d="M12 28V12h8.5c4.2 0 6.5 2.2 6.5 5.5 0 2.5-1.3 4.2-3.5 5l4.5 5.5h-4.8l-4-5H16v5H12zm4-9h4c1.8 0 2.8-.9 2.8-2.3S21.8 14.5 20 14.5h-4v4.5z"
        fill="white"
      />
      <circle cx="30" cy="10" r="3" fill="#FBBF24" opacity="0.9" />
      <defs>
        <linearGradient id="cityu-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="0.5" stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
