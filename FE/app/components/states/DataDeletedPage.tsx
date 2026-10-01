import React from 'react'
import { TrashIcon } from '@/components/ui/TrashIcon'

export function DataDeletedPage() {
  return (
    <main
      style={{
        position: 'relative',
        width: 'min(100vw, calc(100dvh * 0.5625))',
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        margin: '0 auto',
        background: '#020318',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/bgdatatidakada.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />

      {/* Content overlay centered inside neon circle */}
      <div
        className="animate-fade-in-up"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(14px, 2dvh, 36px)',
          padding: '0 24px',
          textAlign: 'center',
          maxWidth: '84%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: '4px' }}>
          <TrashIcon size={76} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(14px, 1.85dvh, 32px)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            textShadow: '0 0 16px rgba(255,255,255,0.85), 0 0 32px rgba(255,255,255,0.4)',
          }}
        >
          YOUR DATA HAS BEEN DELETED
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.45dvh, 25px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            letterSpacing: '0.03em',
            maxWidth: '90%',
          }}
        >
          Your session data is no longer available. You can always start a new journey whenever you&apos;re ready.
        </p>
      </div>
    </main>
  )
}
