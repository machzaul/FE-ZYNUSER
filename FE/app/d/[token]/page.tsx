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
    return <DataDeletedPage />
  }

  return <SessionPageClient data={data} token={token} />
}
