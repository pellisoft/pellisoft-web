interface IconProps {
  size?: number
  className?: string
}

export default function FacturacionIcon({ size = 40, className }: IconProps) {
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
      {/* Documento base */}
      <path d="M 8,4 L 24,4 L 32,12 L 32,36 L 8,36 Z" />

      {/* Esquina doblada del documento */}
      <path d="M 24,4 L 24,12 L 32,12" />

      {/* Líneas de contenido (texto de factura) */}
      <line x1="12" y1="18" x2="25" y2="18" />
      <line x1="12" y1="22" x2="22" y2="22" />
      <line x1="12" y1="26" x2="24" y2="26" />

      {/* Símbolo de precio/moneda abajo */}
      <line x1="13" y1="31" x2="19" y2="31" />
      <line x1="16" y1="29" x2="16" y2="33" strokeOpacity="0.7" />

      {/* Nube/SaaS conectada */}
      <path d="M 30,6 Q 34,6 34,10 Q 34,14 30,14 L 26,14 Q 23,14 23,11 Q 23,8 26,8 Q 27,5 30,6 Z" strokeOpacity="0.8" />

      {/* Línea punteada de conexión documento→nube */}
      <line x1="24" y1="10" x2="26" y2="10" strokeDasharray="2,2" strokeOpacity="0.5" />
    </svg>
  )
}
