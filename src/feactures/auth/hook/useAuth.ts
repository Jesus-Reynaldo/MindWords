'use client'
import { useEffect, useState } from 'react'

export interface AuthUser {
  id: string
  email: string
}

function parseToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return { id: payload.userId, email: payload.email ?? '' }
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setUser(token ? parseToken(token) : null)
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return { user, loading, logout }
}
