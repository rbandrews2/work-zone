'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/app/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Work Zone OS</h1>

        <input 
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          className="input mt-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 w-full py-2 mt-4 rounded text-black font-semibold hover:bg-yellow-600"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  )
}
