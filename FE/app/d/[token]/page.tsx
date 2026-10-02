import React from 'react'
import { getSessionData } from '@/lib/api'
import { SessionPageClient } from '@/components/SessionPageClient'
import { DataDeletedPage } from '@/components/states/DataDeletedPage'

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function SessionPage({ params }: PageProps) {
  const { token } = await params

  const { data, error } = await getSessionData(token)

  // No data or already deleted
  if (error === 'not_found' || !data) {
    if (error?.startsWith('api_error')) {
      return (
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1>System Error</h1>
          <p>Failed to fetch from backend. Cloudflare might be blocking Vercel, or the API URL is wrong.</p>
          <p>Debug info: Token = {token} | Error = {error}</p>
        </div>
      )
    }
    return <DataDeletedPage />
  }

  return <SessionPageClient data={data} token={token} />
}
