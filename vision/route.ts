import { NextRequest, NextResponse } from "next/server"
import { getGeminiModel } from "@/lib/ai/geminiServer"

interface VisionBody {
  imageBase64: string
  mimeType: string
  mode?: "hazard" | "ppe" | "general"
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, mode = "hazard" } =
      (await req.json()) as VisionBody

    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: "imageBase64 and mimeType are required" },
        { status: 400 }
      )
    }

    const model = getGeminiModel("gemini-1.5-pro")

    const prompt = buildPrompt(mode)

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ])

    const reply = result.response.text()
    return NextResponse.json({ reply })
  } catch (err) {
    console.error("Vision AI error:", err)
    return NextResponse.json(
      { error: "Vision AI failed" },
      { status: 500 }
    )
  }
}

function buildPrompt(mode: VisionBody["mode"]): string {
  switch (mode) {
    case "ppe":
      return (
        "You are a safety AI. Look for PPE (hard hats, vests, gloves, eye protection, " +
        "footwear) and explain if anybody is missing required PPE for a typical road work zone."
      )
    case "general":
      return (
        "You are a safety AI. Describe what you see in this road work image and " +
        "mention any obvious safety concerns."
      )
    case "hazard":
    default:
      return (
        "You are a work zone safety inspector. Analyze this image and identify " +
        "hazards or unsafe conditions: traffic exposure, taper setup, cone spacing, " +
        "buffer zones, worker position, signage, and equipment placement. " +
        "Return a short risk summary and recommended corrections."
      )
  }
}
