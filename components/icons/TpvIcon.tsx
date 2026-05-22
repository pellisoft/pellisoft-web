interface IconProps {
  size?: number
  className?: string
}

export default function TpvIcon({ size = 40, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Marco del monitor/terminal TPV */}
      <rect x="4" y="6" width="32" height="22" rx="2" />

      {/* Pantalla interior */}
      <rect x="7" y="9" width="26" height="16" rx="1" />

      {/* Base del monitor */}
      <line x1="14" y1="28" x2="14" y2="33" />
      <line x1="26" y1="28" x2="26" y2="33" />
      <line x1="10" y1="33" x2="30" y2="33" />

      {/* Señal wifi / conectividad en pantalla */}
      <path d="M 17,21 Q 20,18 23,21" />
      <path d="M 14,18 Q 20,13 26,18" strokeOpacity="0.6" />
      <path d="M 12,15 Q 20,9 28,15" strokeOpacity="0.3" />

      {/* Punto central de señal */}
      <circle cx="20" cy="23" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
