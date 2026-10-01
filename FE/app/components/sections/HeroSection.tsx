import React from 'react'

interface HeroSectionProps {
  imageUrl: string
}

export function HeroSection({ imageUrl }: HeroSectionProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Background image from backend */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="Session moment background"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />

      {/* Dark gradient overlay — stronger at bottom to blend into bg-primary */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(2,3,24,0.1) 0%, rgba(2,3,24,0) 28%, rgba(2,3,24,0.08) 58%, rgba(2,3,24,0.72) 82%, rgba(2,3,24,1) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
