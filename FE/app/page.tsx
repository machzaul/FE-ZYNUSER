import { redirect } from 'next/navigation'

// Root route - redirect to a demo token for development
// In production, users always come via QR → /{token}
export default function RootPage() {
  // You can change this to any demo token for testing
  redirect('/demo')
}
