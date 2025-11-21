"use client"

import { useState } from "react"
import { GlassCard } from "@/components/GlassCard"
import { supabase } from "@/lib/supabase/client"
import { useAiChat } from "@/lib/ai/useAiChat"

const HAZARD_TYPES = [
  "Aggressive Traffic",
  "Low Visibility",
  "Unsafe Neighborhood",
  "Steep Grade",
  "Blind Curve",
  "High-Speed Zone",
  "Weather Hazard",
  "Equipment Hazard",
  "Other"
]

export default function NewHazardPage() {
  const [locationText, setLocationText] = useState("")
  const [hazardType, setHazardType] = useState("")
  const [notes, setNotes] = useState("")
  const [riskLevel, setRiskLevel] = useState("Medium")
  const [photo, setPhoto] = useState<File | null>(null)
  const [previewMapUrl, setPreviewMapUrl] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { messages, loading: aiLoading, error: aiError, send } = useAiChat("hazard")

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    setPhoto(e.target.files[0])
  }

  async function generateMapPreview() {
    if (!locationText.trim()) return
    const encoded = encodeURIComponent(locationText)
    const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${encoded}&zoom=15&size=600x350&markers=${encoded}&maptype=mapnik`
    setPreviewMapUrl(url)
  }

  async function generateRiskRecommendation() {
    await send(`
      Analyze the following hazard description and recommend a risk level (Low, Medium, High, Extreme):

      Hazard Type: ${hazardType}
      Location: ${locationText}
      Notes: ${notes}

      Return ONLY the recommended risk level and a one-sentence explanation.
    `)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setMessage(null)

    try {
      let latitude: number | null = null
      let longitude: number | null = null

      // Let AI try to extract lat/lon later, for now leave null.

      const { data, error: hazardError } = await supabase
        .from("hazard_zones")
        .insert({
          location_description: locationText,
          risk_level: riskLevel,
          notes,
          latitude,
          longitude
        })
        .select()
        .single()

      if (hazardError) {
        console.error(hazardError)
        throw new Error("Failed to save hazard.")
      }

      if (photo) {
        const path = `hazard-${data.id}/${Date.now()}-${photo.name}`
        const { error: uploadError } = await supabase
          .storage
          .from("workzone-incidents")
          .upload(path, photo)

        if (uploadError) {
          console.error(uploadError)
        }
      }

      setMessage("Hazard reported successfully.")
      setHazardType("")
      setLocationText("")
      setNotes("")
      setRiskLevel("Medium")
      setPhoto(null)
      setPreviewMapUrl(null)
    } catch (err: any) {
      setError(err.message || "Error saving hazard.")
    }

    setSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Report a Hazardous Area</h1>

      <GlassCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* LOCATION FIELD */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Location</label>
            <input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              placeholder="Street name, nearest intersection, description..."
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-100"
            />

            <button
              type="button"
              onClick={generateMapPreview}
              className="text-xs mt-2 px-3 py-1 rounded-full border border-wz_yellow text-wz_yellow hover:bg-wz_yellow hover:text-black"
            >
              Preview Map
            </button>

            {previewMapUrl && (
              <div className="mt-4">
                <img
                  src={previewMapUrl}
                  alt="Map preview"
                  className="rounded-xl border border-white/10 max-w-full"
                />
              </div>
            )}
          </div>

          {/* HAZARD TYPE */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Hazard Type</label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-100"
            >
              <option value="">Select hazard...</option>
              {HAZARD_TYPES.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Notes / Description</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[120px] bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-100"
              placeholder="Describe why this location is hazardous..."
            />
          </div>

          {/* AI RISK HELP */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={generateRiskRecommendation}
              className="text-xs px-3 py-1 rounded-full border border-wz_yellow text-wz_yellow hover:bg-wz_yellow hover:text-black"
            >
              AI: Recommend Severity
            </button>

            {aiLoading && (
              <span className="text-xs text-gray-300">AI thinking…</span>
            )}
          </div>

          {/* AI RESPONSE */}
          {messages.length > 0 && (
            <div className="bg-black/40 border border-white/10 p-3 rounded-xl text-sm text-gray-100 whitespace-pre-wrap">
              {messages[messages.length - 1].content}
            </div>
          )}

          {/* PHOTO */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Attach Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="text-gray-200 text-sm"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-wz_yellow text-black rounded hover:bg-wz_yellow_glow transition disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Submit Hazard"}
          </button>

          {message && (
            <p className="text-green-400 text-sm mt-2">{message}</p>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

        </form>
      </GlassCard>
    </div>
  )
}
