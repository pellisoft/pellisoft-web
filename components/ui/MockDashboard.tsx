'use client'

const HOURS = ['H-8', 'H-7', 'H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1']
const BAR_HEIGHTS_PCT = [65, 80, 72, 88, 94, 90, 96, 92]
const MAX_BAR_H = 85
const START_X = 14
const BAR_W = 28
const GAP = 4
// SVG y baseline for bars = top padding (10) + max bar height (85) = 95
const BAR_BASELINE = 95

export default function MockDashboard() {
  return (
    <div className="bg-[#0D1117] rounded-xl border border-encina/25 overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="bg-[#161B22] px-4 py-3 flex items-center justify-between border-b border-encina/15">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        </div>
        <span className="text-encina_light text-xs tracking-widest">SISTEMA MES INDUSTRIAL</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
          <span className="text-muted text-xs">LÍNEA: ACTIVA</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-px bg-encina/10 border-b border-encina/15">
        <div className="bg-[#0D1117] p-4 text-center">
          <p className="text-encina_light text-2xl font-bold">94.2%</p>
          <p className="text-muted text-xs mt-1">OEE</p>
        </div>
        <div className="bg-[#0D1117] p-4 text-center">
          <p className="text-tech_blue_light text-2xl font-bold">1.450</p>
          <p className="text-muted text-xs mt-1">PRODUCCIÓN</p>
        </div>
        <div className="bg-[#0D1117] p-4 text-center">
          <p className="text-white_soft text-2xl font-bold">0</p>
          <p className="text-muted text-xs mt-1">ALERTAS</p>
        </div>
      </div>

      {/* Chart area */}
      <div className="bg-[#0D1117] p-4">
        <svg viewBox="0 0 280 120" className="w-full" aria-hidden="true">
          {BAR_HEIGHTS_PCT.map((pct, i) => {
            const barH = (pct / 100) * MAX_BAR_H
            const x = START_X + i * (BAR_W + GAP)
            const y = BAR_BASELINE - barH
            const isActive = i === BAR_HEIGHTS_PCT.length - 1
            return (
              <g key={HOURS[i]}>
                <rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={barH}
                  fill={isActive ? '#4A7C2F' : 'rgba(45,80,22,0.6)'}
                  rx={2}
                />
                <text
                  x={x + BAR_W / 2}
                  y={112}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#6B7280"
                >
                  {HOURS[i]}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Footer */}
      <div className="bg-[#161B22] px-4 py-2 text-muted text-xs flex justify-between border-t border-encina/15">
        <span>TURNO: MAÑANA</span>
        <span>08:47:32 — 2026-01-15</span>
      </div>
    </div>
  )
}
