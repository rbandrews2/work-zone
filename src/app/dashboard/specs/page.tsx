"use client"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/GlassCard"
import { useAiChat } from "@/lib/ai/useAiChat"

// Replace with however you're loading spec content (Supabase, JSON, etc.)
async function fetchSpec(specId: string) {
  const res = await fetch(`/api/specs/${specId}`)
  return res.json()
}

export default function SpecPage({ params }: { params: { id: string } }) {
  const specId = params.id

  const [specTitle, setSpecTitle] = useState("")
  const [specContent, setSpecContent] = useState("")
  const [loadingSpec, setLoadingSpec] = useState(true)

  // AI hook for "spec" mode
  const { messages, loading: aiLoading, error: aiError, send } = useAiChat("spec")

  useEffect(() => {
    async function load() {
      setLoadingSpec(true)
      const data = await fetchSpec(specId)
      setSpecTitle(data.title)
      setSpecContent(data.content)
      setLoadingSpec(false)
    }
    load()
  }, [specId])

  // AI Feature
  async function explainSpec() {
    await send(`
      Explain the following work zone specification in clear, simple language for field workers:
      
      TITLE: ${specTitle}

      CONTENT:
      ${specContent}
    `)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{specTitle}</h1>

      <GlassCard>
        {loadingSpec ? (
          <p className="text-gray-400 text-sm">Loading spec…</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-3">Specification Details</h2>

            <pre className="whitespace-pre-wrap text-gray-200 text-sm mb-6">
              {specContent}
            </pre>

            {/** AI BUTTON HERE — THIS IS THE ONE YOU REQUESTED */}
            <button
              onClick={explainSpec}
              className="text-xs px-3 py-1 rounded-full border border-wz_yellow text-wz_yellow hover:bg-wz_yellow hover:text-black transition"
            >
              AI: Explain This Spec
            </button>

            {/** AI OUTPUT */}
            <div className="mt-6">
              {aiLoading && <p className="text-gray-300 text-sm">AI analyzing…</p>}
              {aiError && <p className="text-red-400 text-sm">{aiError}</p>}

              {messages.length > 0 && (
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3 mt-4">
                  <h3 className="text-lg font-semibold">AI Explanation</h3>
                  {messages.map((m, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-100 whitespace-pre-wrap"
                    >
                      {m.content}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </GlassCard>
    </div>
  )
}
