import { createServer } from '@/lib/supabase/server'

export default async function Dashboard() {
  const supabase = createServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user?.email}</p>
    </div>
  )
}
