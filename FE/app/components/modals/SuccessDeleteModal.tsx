'use client'

import React from 'react'
import { CheckCircleIcon } from '@/components/ui/CheckCircleIcon'

interface SuccessDeleteModalProps {
  isOpen: boolean
  onDone: () => void
}

export function SuccessDeleteModal({ isOpen, onDone }: SuccessDeleteModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-delete-title"
    >
      <div
        className="neon-card animate-slide-up-modal"
        style={{
          width: 'min(92vw, calc(100dvh * 0.46))',
          padding: 'clamp(32px, 4.5dvh, 72px) clamp(16px, 2vw, 36px) clamp(24px, 3.2dvh, 52px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(20px, 2.8dvh, 48px)',
          textAlign: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Check Icon */}
        <CheckCircleIcon size={84} />

        {/* Title */}
        <h2
          id="success-delete-title"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.4dvh, 40px)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textShadow: '0 0 14px rgba(255,255,255,0.9), 0 0 28px rgba(255,255,255,0.4)',
          }}
        >
          Data Deleted
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.45dvh, 25px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.45,
            letterSpacing: '0.03em',
            maxWidth: '85%',
          }}
        >
          Your session data has been permanently deleted from our system
        </p>

        {/* Done button */}
        <button
          onClick={onDone}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(16px, 2dvh, 34px)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 24px 0',
            textShadow: '0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.45)',
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-label="Done"
        >
          Done
        </button>
      </div>
    </div>
  )
}
