export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "LOADED" : "MISSING",
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "LOADED" : "MISSING",
  })
}
