import { GlassCard } from "@/components/GlassCard"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-white py-10">

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
          Work Zone <span className="text-wz_yellow">OS</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          The next-generation productivity, safety, and communication platform 
          for road crews, contractors, and workforce teams.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="w-full max-w-5xl mb-12">
        <div className="
          bg-wz_glass 
          backdrop-blur-md 
          border border-wz_border 
          rounded-xl 
          shadow-glow
          p-10
          flex flex-col md:flex-row
          gap-8
          items-center
          justify-center
        ">
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold">
              Built for Safety. Powered by Intelligence.
            </h2>
            <p className="text-gray-300">
              A unified system connecting jobsites, teams, training modules, 
              messaging, and AI-assisted workflows — all in one place.
            </p>

            {/* Call to Action */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
              <Link
                href="/signup"
                className="px-5 py-2 bg-wz_yellow font-semibold rounded hover:bg-wz_yellow_glow hover:text-black transition"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="px-5 py-2 border border-wz_yellow rounded hover:bg-wz_yellow hover:text-black transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Visual Placeholder Card */}
          <div className="
            w-full md:w-1/2
            bg-wz_card 
            backdrop-blur-md 
            rounded-xl 
            border border-wz_border 
            shadow-inset_glow
            p-6 text-center
          ">
            <p className="text-gray-400 text-sm mb-4">
              Future Interactive Dashboard Preview
            </p>
            <div className="h-40 bg-wz_glass rounded-lg border border-wz_border shadow-glow"></div>
          </div>
        </div>
      </div>

      {/* Footer Mini-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        <GlassCard>
          <h3 className="text-xl font-semibold mb-2">Smart Training</h3>
          <p className="text-gray-300 text-sm">
            Integrated safety courses, refresher modules, certifications, 
            and AI-assisted learning.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-2">Crew Messaging</h3>
          <p className="text-gray-300 text-sm">
            Communicate instantly. Share info, instructions, and job details 
            across teams.
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-semibold mb-2">Job Board</h3>
          <p className="text-gray-300 text-sm">
            Post, accept, and organize shifts, crew requests, and jobsite 
            assignments with ease.
          </p>
        </GlassCard>
      </div>

    </div>
  )
}
