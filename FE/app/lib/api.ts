// Types for API responses
export interface SessionData {
  id: string
  token: string
  imageUrl: string
  name?: string
  stats: {
    confidence: number
    focus: number
    resilience: number
    control: number
  }
  eventName?: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? ''

// Default mock data for testing without backend
export const MOCK_SESSION_DATA: SessionData = {
  id: 'session-demo-123',
  token: 'demo',
  imageUrl: '/images/demo-bg.png',
  name: 'User Demo',
  eventName: 'AWAKENING',
  stats: {
    confidence: 23,
    focus: 23,
    resilience: 23,
    control: 23,
  },
}

/**
 * Fetch session data by token
 */
export async function getSessionData(token: string): Promise<ApiResponse<SessionData>> {
  // Langsung kembalikan URL ke komponen Client.
  // KITA TIDAK BOLEH melakukan fetch() di sini karena Vercel akan diblokir oleh Cloudflare (Error 403)
  // yang menyebabkan Vercel mengira gambarnya tidak ada (Data Deleted).
  // Biarkan browser pengguna yang langsung memuat gambarnya!
  
  const sessionData: SessionData = {
    id: token,
    token: token,
    imageUrl: `${API_BASE}/v1/submissions/${token}/download`,
    name: '',
    eventName: 'AWAKENING',
    stats: MOCK_SESSION_DATA.stats,
  }

  return { data: sessionData, error: null }
}

/**
 * Delete session data by token
 */
export async function deleteSessionData(token: string): Promise<{ success: boolean; error?: string }> {
  if (token === 'demo' || process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
    return { success: true }
  }

  try {
    const res = await fetch(`${API_BASE}/v1/submissions/${token}/file`, {
      method: 'DELETE',
      headers: {
        'x-app-key': API_KEY,
      },
    })
    
    if (!res.ok) {
        return { success: false, error: 'Failed to delete data on backend' }
    }

    return { success: true }
  } catch (err) {
    console.error(`[ZYN API] Delete request failed:`, err)
    return { success: false, error: 'Network error or backend unreachable' }
  }
}

/**
 * Get image URL for background
 */
export function getImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) return imageUrl
  return `${API_BASE}${imageUrl}`
}
