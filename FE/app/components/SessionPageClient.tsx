'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { ActionButtons } from '@/components/sections/ActionButtons'
import { DeleteModal } from '@/components/modals/DeleteModal'
import { SuccessDeleteModal } from '@/components/modals/SuccessDeleteModal'
import { DataDeletedPage } from '@/components/states/DataDeletedPage'
import { deleteSessionData, getImageUrl } from '@/lib/api'
import type { SessionData } from '@/lib/api'

interface SessionPageClientProps {
  data: SessionData
  token: string
}

type UIState = 'normal' | 'delete-modal' | 'deleting' | 'delete-success' | 'deleted'

export function SessionPageClient({ data, token }: SessionPageClientProps) {
  const [uiState, setUiState] = useState<UIState>('normal')
  const [hasDownloaded, setHasDownloaded] = useState(false)
  const [showDownloadToast, setShowDownloadToast] = useState(false)
  const [toastTimeoutId, setToastTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)

  const imageUrl = getImageUrl(data.imageUrl)

  // Clean up toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutId) clearTimeout(toastTimeoutId)
    }
  }, [toastTimeoutId])

  // Deteksi cerdas di sisi Client:
  // Karena kita mem-bypass pengecekan Vercel (agar tidak diblokir Cloudflare),
  // kita suruh browser pengguna untuk mencoba memuat gambar secara diam-diam.
  // Jika gagal dimuat (misal karena 404 terhapus), kita ubah layar ke halaman 'deleted'.
  useEffect(() => {
    if (uiState === 'deleted') return; // Jika sudah di state deleted, abaikan

    const img = new window.Image()
    img.onerror = () => {
      // Gambar gagal dimuat (kemungkinan besar 404 Not Found karena sudah dihapus)
      setUiState('deleted')
    }
    img.src = imageUrl
  }, [imageUrl, uiState])

  // Handle Escape key to close delete modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && uiState === 'delete-modal') {
        setUiState('normal')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [uiState])

  const handleDeleteClick = useCallback(() => {
    if (!hasDownloaded) return
    setUiState('delete-modal')
  }, [hasDownloaded])

  const handleDeleteClose = useCallback(() => {
    setUiState('normal')
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    setUiState('deleting')

    const result = await deleteSessionData(token)

    if (result.success) {
      setUiState('delete-success')
    } else {
      setUiState('delete-modal')
    }
  }, [token])

  const handleDeleteDone = useCallback(() => {
    setUiState('deleted')
  }, [])

  const handleDownloadSuccess = useCallback(() => {
    // Unlock delete button after downloading
    setHasDownloaded(true)

    if (toastTimeoutId) clearTimeout(toastTimeoutId)
    setShowDownloadToast(true)
    const id = setTimeout(() => {
      setShowDownloadToast(false)
    }, 3000)
    setToastTimeoutId(id)
  }, [toastTimeoutId])

  // If data fully deleted, show deleted page
  if (uiState === 'deleted') {
    return <DataDeletedPage />
  }

  const isModalOpen = uiState === 'delete-modal' || uiState === 'deleting'
  const isSuccessOpen = uiState === 'delete-success'
  const isDeleting = uiState === 'deleting'

  return (
    <>
      <main
        style={{
          position: 'relative',
          width: 'min(100vw, calc(100dvh * 0.5625))',
          height: '100dvh',
          minHeight: '100dvh',
          maxHeight: '100dvh',
          margin: '0 auto',
          backgroundColor: '#020318',
          backgroundImage: "url('/images/bgdatatidakada.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Agar frame otomatis berada di tengah
          padding: '16px 16px 140px 16px', // Padding bawah yang lebih besar untuk area tombol action
          color: '#ffffff',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* --- TEKS DI ATAS FRAME --- */}
        <div style={{ textAlign: 'center', marginBottom: '28px', zIndex: 10, flexShrink: 0, paddingTop: '10px' }}>
          <h3 style={{ 
            fontSize: 'clamp(14px, 2dvh, 18px)', 
            fontWeight: 300, 
            letterSpacing: '1px',
            margin: 0,
            color: 'rgba(255,255,255,0.8)' 
          }}>
            ROAD TO
          </h3>
          <h1 className="font-display" style={{ 
            fontSize: 'clamp(32px, 5dvh, 48px)', 
            fontWeight: 800,
            margin: '-5px 0 0 0',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            letterSpacing: '2px', // Jarak antar huruf diperbaiki
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)', // Cahaya sangat lembut agar tidak "terbakar" di iPhone
          }}>
            UNLIMITED
          </h1>
        </div>

        {/* --- FRAME (Simple Border, 9:16 Ratio) --- */}
        <div 
          style={{
            width: '100%',
            maxWidth: 'calc(min(420px, (100dvh - 290px) * 9 / 16))', // Menyesuaikan jarak baru
            aspectRatio: '9 / 16', 
            borderRadius: 'clamp(16px, 2.5dvh, 32px)',
            border: '1px solid rgba(150, 180, 255, 0.3)', // Garis lebih tipis & transparan
            boxShadow: '0 0 6px rgba(120, 150, 255, 0.15), inset 0 0 4px rgba(120, 150, 255, 0.1)', // Sangat redup, hanya hint cahaya
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            flexShrink: 1, 
          }}
        >
          {/* Gambar dari API (Portrait) yang sudah mengandung teks & status */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain', // Menjamin gambar tidak terpotong (tidak dicrop)
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }} />
        </div>

        {/* Action Buttons Row at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            width: '100%',
            padding: 'clamp(16px, 2.5dvh, 36px) clamp(12px, 2vw, 24px) max(clamp(16px, 2.5dvh, 44px), env(safe-area-inset-bottom))',
            background: 'linear-gradient(to bottom, rgba(2,3,24,0) 0%, rgba(2,3,24,0.65) 30%, rgba(2,3,24,0.98) 75%, #020318 100%)',
            boxSizing: 'border-box',
          }}
        >
          <ActionButtons
            imageUrl={imageUrl}
            token={token}
            onDeleteClick={handleDeleteClick}
            onDownloadSuccess={handleDownloadSuccess}
            canDelete={hasDownloaded}
          />
        </div>

        {/* Download success toast & background blur overlay matching tampilanketikapopupdownload.png & popupsuccesdownload.png */}
        {showDownloadToast && (
          <>
            {/* Dark blur backdrop overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 90,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                background: 'rgba(2, 3, 24, 0.38)',
                pointerEvents: 'none',
              }}
            />
            {/* Flexbox wrapper for 100% bulletproof horizontal centering */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4.5dvh, 64px)',
                left: 0,
                right: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                padding: '0 16px',
                boxSizing: 'border-box',
                pointerEvents: 'none',
              }}
            >
              <div
                className="animate-toast"
                role="status"
                aria-live="polite"
                style={{
                  pointerEvents: 'auto',
                  background: 'rgba(62, 65, 94, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '9999px',
                  padding: 'clamp(8px, 1.2dvh, 18px) clamp(16px, 2.2vw, 36px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(6px, 1vw, 14px)',
                  maxWidth: '100%',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  boxSizing: 'border-box',
                }}
              >
                <svg
                  width="1.1em"
                  height="1.1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, fontSize: 'clamp(14px, 1.8dvh, 26px)' }}
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 'clamp(12px, 1.65dvh, 24px)',
                    color: 'white',
                    textShadow: '0 0 10px rgba(255,255,255,0.75)',
                    lineHeight: 1,
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Success to download
                </span>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={isModalOpen}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteClose}
      />

      {/* Delete success modal */}
      <SuccessDeleteModal isOpen={isSuccessOpen} onDone={handleDeleteDone} />
    </>
  )
}
