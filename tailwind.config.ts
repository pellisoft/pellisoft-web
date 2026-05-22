import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fondos
        carbon:              '#0A0A0A',
        slate_dark:          '#111318',
        // Marca principal — gradiente tech
        tech_blue:           '#1E40AF',
        tech_blue_light:     '#3B82F6',
        tech_purple:         '#7C3AED',
        tech_purple_light:   '#A855F7',
        // Identidad territorial — Teruel
        encina:              '#2D5016',
        encina_light:        '#4A7C2F',
        encina_deep:         '#1A2F0D',
        // Acento cálido
        arcilla:             '#C1440E',
        arcilla_light:       '#E05520',
        // Tipografía
        white_soft:          '#F5F5F5',
        muted:               '#6B7280',
        muted_light:         '#9CA3AF',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'gradient-tech':   'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
        'gradient-hero':   'radial-gradient(ellipse at top right, #3B82F620 0%, transparent 60%)',
        'gradient-encina': 'linear-gradient(180deg, #2D501610 0%, transparent 100%)',
      },
      boxShadow: {
        'glow-encina':  '0 0 20px rgba(45, 80, 22, 0.4)',
        'glow-blue':    '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-purple':  '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-arcilla': '0 0 20px rgba(193, 68, 14, 0.4)',
        'card':         '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        glow_pulse: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%':      { opacity: '1',   filter: 'blur(12px)' },
        },
        cursor_blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        fade_up: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-pulse': 'glow_pulse 4s ease-in-out infinite',
        'cursor':     'cursor_blink 0.8s step-end infinite',
        'fade-up':    'fade_up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
