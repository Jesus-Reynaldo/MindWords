
import { Navigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8">Loading…</div>
  return user ? <>{children}</> : <Navigate to="/login" replace />
}
