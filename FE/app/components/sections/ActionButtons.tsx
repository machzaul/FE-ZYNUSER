'use client'

import React, { useCallback } from 'react'
import { Button } from '@/components/ui/Button'

interface ActionButtonsProps {
  imageUrl: string
  token: string
  onDeleteClick: () => void
  onDownloadSuccess?: () => void
  canDelete?: boolean
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''

export function ActionButtons({
  imageUrl,
  token,
  onDeleteClick,
  onDownloadSuccess,
  canDelete = true,
}: ActionButtonsProps) {
  const handleDownload = useCallback(async () => {
    try {
      // Karena backend (unlimited-api-dev) sudah menyetel header 'Content-Disposition: attachment'
      // pada URL /download, kita hanya perlu mengarahkan browser ke URL tersebut.
      // Browser akan secara otomatis mengunduh file alih-alih membukanya di tab baru.
      
      const a = document.createElement('a')
      a.href = imageUrl
      a.download = `ZYN_Awakening_${token}.png` // Tetap tambahkan atribut fallback
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      onDownloadSuccess?.()
    } catch {
      window.open(imageUrl, '_blank')
      onDownloadSuccess?.()
    }
  }, [imageUrl, onDownloadSuccess, token])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Button
        variant="blue"
        size="lg"
        onClick={handleDownload}
        aria-label="Download your moment"
      >
        Download
      </Button>

      <Button
        variant={canDelete ? 'red' : 'red-muted'}
        size="lg"
        onClick={onDeleteClick}
        disabled={!canDelete}
        aria-label="Delete my data"
      >
        Delete My Data
      </Button>
    </div>
  )
}
