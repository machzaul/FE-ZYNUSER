import React from 'react'
import { CircularProgress } from '@/components/ui/CircularProgress'

interface StatsSectionProps {
  confidence: number
  focus: number
  resilience: number
  control: number
}

export function StatsSection({ confidence, focus, resilience, control }: StatsSectionProps) {
  const stats = [
    { value: confidence, label: 'Confidence' },
    { value: focus, label: 'Focus' },
    { value: resilience, label: 'Resilience' },
    { value: control, label: 'Control' },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(14px, 4.4vw, 44px)',
        padding: '0 clamp(20px, 4.3vw, 40px)',
      }}
      role="list"
      aria-label="Session statistics"
    >
      {stats.map((stat) => (
        <div key={stat.label} role="listitem">
          <CircularProgress
            value={stat.value}
            max={100}
            size={54}
            strokeWidth={5}
            label={stat.label}
          />
        </div>
      ))}
    </div>
  )
}
