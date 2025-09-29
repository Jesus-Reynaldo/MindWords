import { useEffect, useState } from 'react'
import { supabase } from '../../core/lib/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'


export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  return { session, loading, user: session?.user as User | undefined }
}
