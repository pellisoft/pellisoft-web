'use client'

import { useEffect } from 'react'

// Lleva a la sección del hash (/#proyectos…) al cargar o al volver atrás a la landing.
// El scroll nativo del navegador no es fiable aquí: el contenido se anima al entrar
// y Next puede resetear el scroll durante la navegación.
export default function HashScroller() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    // setTimeout y no requestAnimationFrame: rAF no se ejecuta en pestañas en segundo plano
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return null
}
