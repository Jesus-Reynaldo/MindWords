'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '@mui/material'
import { Loading } from '@/shares/components/Loading'
import Layout from '@/feactures/layout/Layout'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
    } else {
      setOk(true)
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loading />
      </Box>
    )
  }

  if (!ok) return null

  return <Layout>{children}</Layout>
}
