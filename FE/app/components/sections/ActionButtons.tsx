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
      const response = await fetch(`${API_BASE}/v1/submissions/${token}/download`, {
        method: 'GET',
        headers: {
          'x-app-key': API_KEY
        }
      })
      if (!response.ok) throw new Error('Download failed')
      const blob = await response.blob()
      const file = new File([blob], `zyn-moment-${token}.jpg`, { type: blob.type || 'image/jpeg' })

      // Check if Web Share API is available and supports sharing files (iOS Safari supports this)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Zyn Moment',
        })
        onDownloadSuccess?.()
        return
      }

      // Fallback for desktop or unsupported browsers
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'zyn-moment.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      onDownloadSuccess?.()
    } catch {
      window.open(imageUrl, '_blank')
      onDownloadSuccess?.()
    }
  }, [imageUrl, onDownloadSuccess])

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
