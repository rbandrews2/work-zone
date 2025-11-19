import { createServerClientWithAuth } from "@/lib/supabase/server"
import { GlassCard } from "@/components/GlassCard"

export default async function Dashboard() {
  const supabase = createServerClientWithAuth()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <GlassCard>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-300 mt-2">
          {user?.email ? `Signed in as ${user.email}` : "Not signed in"}
        </p>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h2 className="text-xl font-semibold">Training</h2>
          <p className="text-gray-300 mt-1">View and complete safety modules.</p>
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-semibold">Job Board</h2>
          <p className="text-gray-300 mt-1">Browse posted work or crew needs.</p>
        </GlassCard>
      </div>
    </div>
  )
}
