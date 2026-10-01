'use client'

import React from 'react'
import { TrashIcon } from '@/components/ui/TrashIcon'
import { Button } from '@/components/ui/Button'

interface DeleteModalProps {
  isOpen: boolean
  isDeleting: boolean
  onConfirm: () => void
  onClose: () => void
}

export function DeleteModal({ isOpen, isDeleting, onConfirm, onClose }: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="neon-card animate-slide-up-modal"
        style={{
          width: 'min(92vw, calc(100dvh * 0.46))',
          padding: 'clamp(28px, 3.8dvh, 64px) clamp(16px, 2vw, 36px) clamp(24px, 3.2dvh, 52px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(18px, 2.5dvh, 42px)',
          textAlign: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title - exactly 1 line matching popupdelete.png */}
        <h2
          id="delete-modal-title"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 'clamp(13px, 1.75dvh, 32px)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.01em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            textShadow: '0 0 14px rgba(255,255,255,0.9), 0 0 28px rgba(255,255,255,0.4)',
          }}
        >
          READY TO DELETE YOUR DATA ?
        </h2>

        {/* Trash Icon */}
        <div style={{ margin: '4px 0' }}>
          <TrashIcon size={76} />
        </div>

        {/* Warning text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.45dvh, 25px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.45,
            letterSpacing: '0.03em',
            maxWidth: '88%',
          }}
        >
          Make sure you&apos;ve saved your moment. Once you continue, your session data will be permanently deleted.
        </p>

        {/* Delete & Finish Button */}
        <Button
          variant="red"
          size="lg"
          loading={isDeleting}
          loadingText="Deleting"
          onClick={onConfirm}
          disabled={isDeleting}
          aria-label="Confirm delete and finish"
          style={{
            marginTop: '4px',
            width: '92%',
          }}
        >
          Delete &amp; Finish
        </Button>

        {/* Go Back button */}
        {!isDeleting && (
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              fontSize: 'clamp(14px, 1.8dvh, 32px)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 16px 0',
              textShadow: '0 0 14px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.45)',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label="Go back"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  )
}
