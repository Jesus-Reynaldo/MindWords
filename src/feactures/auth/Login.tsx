'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type FormData = {
  email: string
  password: string
  remember?: boolean
}

export default function Login() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: 'onBlur' })

  async function onSubmit(values: FormData) {
    setServerError(null)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
    const data = await res.json()
    if (!res.ok) return setServerError(data.error ?? 'Login failed')
    localStorage.setItem('token', data.token)
    if (values.remember) localStorage.setItem('remember', '1')
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">Log in to continue.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <input
              type="email"
              placeholder="you@email.com"
              className="mt-1 w-full rounded-xl border border-gray-300 p-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-800">Password</span>
            <div className="mt-1 flex items-center rounded-xl border border-gray-300 p-0.5 pr-2">
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-xl p-3 outline-none"
                {...register('password', { required: 'Password is required' })}
              />
              <button type="button" onClick={() => setShow(s => !s)} className="text-sm text-gray-500 hover:text-gray-800">
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
          </label>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register('remember')} />
              Remember me
            </label>
            <button type="button" className="text-sm text-blue-700 hover:underline" onClick={() => alert('Add password reset later')}>
              Forgot password?
            </button>
          </div>

          {serverError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{serverError}</div>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-blue-600 p-3 text-white font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New here?{' '}
          <Link href="/signup" className="text-blue-700 font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
