"use client"

import { useState } from "react"
import { GlassCard } from "@/components/GlassCard"

type VisionMode = "hazard" | "ppe" | "general"

export default function AIVisionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [mode, setMode] = useState<VisionMode>("hazard")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setResult(null)
    setError(null)

    if (f) {
      const url = URL.createObjectURL(f)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  async function runAnalysis() {
    if (!file) {
      setError("Select an image first.")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const base64 = await fileToBase64(file)
      // Remove prefix "data:image/...;base64,"
      const pureBase64 = base64.split(",")[1] ?? base64

      const res = await fetch("/api/ai/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: pureBase64,
          mimeType: file.type,
          mode,
        }),
      })

      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      setResult(data.reply ?? "No response.")
    } catch (err) {
      console.error(err)
      setError("Vision AI failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Vision – Work Zone Inspector</h1>

      <GlassCard>
        <p className="text-sm text-gray-300 mb-4">
          Upload a photo of your work zone, and Gemini Vision Pro will analyze it for
          hazards, PPE issues, and general safety concerns.
        </p>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-200"
            />

            <div className="flex gap-2">
              {modeButton("hazard", "Hazard Analysis", mode, setMode)}
              {modeButton("ppe", "PPE Check", mode, setMode)}
              {modeButton("general", "General Safety", mode, setMode)}
            </div>

            <button
              onClick={runAnalysis}
              disabled={!file || loading}
              className="px-4 py-2 bg-wz_yellow text-black rounded hover:bg-wz_yellow_glow transition disabled:opacity-50"
            >
              {loading ? "Analyzing…" : "Run Analysis"}
            </button>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-1">Preview:</p>
              <img
                src={previewUrl}
                alt="Work zone preview"
                className="max-h-64 rounded-xl border border-white/10 object-contain"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 mt-2">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 bg-black/40 border border-white/10 rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-2">AI Assessment</h2>
              <p className="text-sm text-gray-100 whitespace-pre-wrap">
                {result}
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

function modeButton(
  value: VisionMode,
  label: string,
  current: VisionMode,
  setMode: (m: VisionMode) => void
) {
  const active = current === value
  return (
    <button
      type="button"
      onClick={() => setMode(value)}
      className={`text-xs px-3 py-1 rounded-full border transition ${
        active
          ? "bg-wz_yellow text-black border-wz_yellow"
          : "border-white/30 text-gray-200 hover:border-wz_yellow"
      }`}
    >
      {label}
    </button>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}
