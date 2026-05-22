'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'

interface PIsotypeProps {
  size?: number
  className?: string
  style?: CSSProperties
}

export default function PIsotype({ size, className, style }: PIsotypeProps) {
  const wrapperStyle: CSSProperties = {
    ...(size ? { width: size, height: size } : {}),
    ...style,
  }

  return (
    <div className={className} style={wrapperStyle}>
      <style>{`
        @keyframes pisotype-glow {
          0%, 100% {
            filter: drop-shadow(0 0 0 rgba(124,58,237,0));
            opacity: 0.95;
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(124,58,237,0.5));
            opacity: 1;
          }
        }
        .pisotype-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: pisotype-glow 3s ease-in-out infinite;
        }
      `}</style>
      <Image
        src="/logos/logo-morado.png"
        alt="Pellisoft isotipo"
        width={400}
        height={400}
        className="pisotype-img"
        priority
      />
    </div>
  )
}



