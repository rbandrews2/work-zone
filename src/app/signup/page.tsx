'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signupError || !data.user) {
      setError(signupError?.message || 'Signup failed')
      setLoading(false)
      return
    }

    // Create organization + profile via RPC call
    const { error: rpcError } = await supabase.rpc('create_org_and_profile', {
      org_name: companyName,
      user_id: data.user.id,
      user_name: fullName,
      user_email: email
    })

    if (rpcError) {
      setError(rpcError.message)
      setLoading(false)
      return
    }

    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <input 
          type="text"
          placeholder="Full Name"
          className="input"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <input 
          type="text"
          placeholder="Company Name"
          className="input mt-2"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />

        <input 
          type="email"
          placeholder="Email"
          className="input mt-2"
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
          {loading ? "Creating..." : "Sign Up"}
        </button>

      </form>
    </div>
  )
}
