/** 站点标识 — CityU 橙红渐变 */
export default function CityUMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="32" y="32" width="448" height="448" rx="96" fill="url(#mark-bg)" />
      <path
        fill="#FFFFFF"
        d="M148 356V156h52c38 0 58 18 58 46 0 20-9 36-26 44l52 62h-62l-46-55h-28v55h-48zm48-98h36c16 0 25-8 25-21s-9-21-25-21h-36v42z"
      />
      <path
        d="M296 340 L336 300 L368 318 L408 260"
        stroke="#FFFFFF"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle cx="408" cy="260" r="9" fill="#FFFFFF" />
      <defs>
        <linearGradient id="mark-bg" x1="80" y1="64" x2="432" y2="448" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58220" />
          <stop offset="0.55" stopColor="#C4364A" />
          <stop offset="1" stopColor="#8E1A31" />
        </linearGradient>
      </defs>
    </svg>
  );
}
