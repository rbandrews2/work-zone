"use client"

import { useEffect, useState, type FormEvent } from "react"
import { GlassCard } from "@/components/GlassCard"
import { supabase } from "@/lib/supabase/client"

type TripType = "pre-trip" | "post-trip"

type DvirRow = {
  id: string
  vehicle_id: string
  odometer: number | null
  trip_type: TripType | null
  defects: string | null
  created_at: string
}

export default function DVIRPage() {
  const [vehicleId, setVehicleId] = useState("")
  const [odometer, setOdometer] = useState("")
  const [tripType, setTripType] = useState<TripType>("pre-trip")
  const [defects, setDefects] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [recent, setRecent] = useState<DvirRow[]>([])
  const [loadingRecent, setLoadingRecent] = useState(false)

  useEffect(() => {
    void loadRecent()
  }, [])

  async function loadRecent() {
    setLoadingRecent(true)
    setErrorMessage(null)

    const { data, error } = await supabase
      .from("dvir_reports")
      .select("id, vehicle_id, odometer, trip_type, defects, created_at")
      .order("created_at", { ascending: false })
      .limit(5)

    if (error) {
      console.error(error)
      setErrorMessage("Failed to load recent DVIRs.")
    } else if (data) {
      setRecent(data as DvirRow[])
    }

    setLoadingRecent(false)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setSubmittedMessage(null)
    setErrorMessage(null)

    const { error } = await supabase.from("dvir_reports").insert({
      vehicle_id: vehicleId.trim(),
      odometer: odometer ? Number(odometer) : null,
      trip_type: tripType,
      defects: defects.trim() || null,
    })

    if (error) {
      console.error(error)
      setErrorMessage("Failed to submit DVIR. Please try again.")
    } else {
      setSubmittedMessage("DVIR submitted successfully.")
      setVehicleId("")
      setOdometer("")
      setTripType("pre-trip")
      setDefects("")
      void loadRecent()
    }

    setSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Daily Vehicle Inspection (DVIR)</h1>

      <GlassCard>
        <p className="text-gray-300 text-sm mb-4">
          Complete a pre-trip or post-trip inspection for each commercial vehicle. These reports
          are stored securely and can be reviewed for compliance and maintenance.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              label="Vehicle / Unit #"
              value={vehicleId}
              onChange={setVehicleId}
              required
            />
            <Field
              label="Odometer"
              value={odometer}
              onChange={setOdometer}
              type="number"
            />
            <div>
              <label className="block text-sm text-gray-200 mb-1">Trip Type</label>
              <div className="flex gap-3">
                <TripRadio
                  label="Pre-trip"
                  value="pre-trip"
                  current={tripType}
                  onChange={setTripType}
                />
                <TripRadio
                  label="Post-trip"
                  value="post-trip"
                  current={tripType}
                  onChange={setTripType}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Defects / Issues</label>
            <textarea
              value={defects}
              onChange={(e) => setDefects(e.target.value)}
              className="w-full min-h-[120px] bg-black/60 border border-white/20 rounded-lg p-2 text-sm text-gray-100"
              placeholder={`Example: "No defects found" or describe any issues discovered.`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !vehicleId.trim()}
            className="px-5 py-2 bg-wz_yellow text-black rounded hover:bg-wz_yellow_glow transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit DVIR"}
          </button>

          {submittedMessage && (
            <p className="text-xs text-green-400 mt-2">{submittedMessage}</p>
          )}
          {errorMessage && <p className="text-xs text-red-400 mt-2">{errorMessage}</p>}
        </form>
      </GlassCard>

      <GlassCard>
        <h2 className="text-xl font-semibold mb-3">Recent DVIRs</h2>

        {loadingRecent && <p className="text-sm text-gray-400">Loading...</p>}

        {!loadingRecent && recent.length === 0 && (
          <p className="text-sm text-gray-400">No DVIRs submitted yet.</p>
        )}

        {!loadingRecent && recent.length > 0 && (
          <div className="space-y-2 text-sm">
            {recent.map((row) => (
              <div
                key={row.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">
                    {row.vehicle_id}{" "}
                    <span className="text-xs text-gray-400">
                      ({row.trip_type ?? "N/A"})
                    </span>
                  </p>
                  {row.defects && (
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {row.defects}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 md:mt-0">
                  {new Date(row.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm text-gray-200 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-black/60 border border-white/20 rounded-lg px-2 py-2 text-sm text-gray-100"
      />
    </div>
  )
}

function TripRadio({
  label,
  value,
  current,
  onChange,
}: {
  label: string
  value: TripType
  current: TripType
  onChange: (v: TripType) => void
}) {
  const active = current === value
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`text-xs px-3 py-1 rounded-full border transition ${
        active
          ? "bg-wz_yellow text-black border-wz_yellow"
          : "bg-black/40 border-white/20 text-gray-100 hover:border-wz_yellow"
      }`}
    >
      {label}
    </button>
  )
}
