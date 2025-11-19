import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServerClientWithAuth() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(key: string) {
          return (await cookieStore).get(key)?.value
        },
        async set(key: string, value: string, options: any) {
          try {
            (await cookieStore).set(key, value, options)
          } catch (e) {
            // Turbopack safe-fallback (avoid source-map failures)
          }
        },
        async remove(key: string, options: any) {
          try {
            (await cookieStore).set(key, "", options)
          } catch (e) {
            // Protected no-op
          }
        }
      }
    }
  )
}
