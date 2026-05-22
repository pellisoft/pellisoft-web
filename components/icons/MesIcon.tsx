interface IconProps {
  size?: number
  className?: string
}

export default function MesIcon({ size = 40, className }: IconProps) {
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
      {/* Línea base de producción */}
      <line x1="2" y1="32" x2="38" y2="32" />

      {/* 3 estaciones/máquinas en la línea (escalado ascendente = crecimiento) */}
      <rect x="4" y="20" width="8" height="12" rx="1" />
      <rect x="16" y="14" width="8" height="18" rx="1" />
      <rect x="28" y="8" width="8" height="24" rx="1" />

      {/* Conexiones entre estaciones */}
      <line x1="12" y1="24" x2="16" y2="18" />
      <line x1="24" y1="18" x2="28" y2="12" />

      {/* Señal de monitorización sobre estación central */}
      <path d="M 17,10 Q 20,7 23,10" />
      <path d="M 15,8 Q 20,4 25,8" strokeOpacity="0.5" />

      {/* Nodo de datos */}
      <circle cx="20" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
