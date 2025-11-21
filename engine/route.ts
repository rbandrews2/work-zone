import { NextRequest, NextResponse } from "next/server"
import { getGeminiModel } from "@/lib/ai/geminiServer"

type Role = "user" | "assistant" | "system"

interface ChatMessage {
  role: Role | string
  content: string
}

interface EngineBody {
  mode?: string
  messages: ChatMessage[]
  context?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EngineBody
    const { mode = "assistant", messages, context } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      )
    }

    const system = systemPrompt(mode)

    const historyText = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n")

    const prompt =
      system +
      (context ? `\n\nCONTEXT:\n${context}\n\n` : "\n\n") +
      historyText

    const model = getGeminiModel("gemini-pro")
    const result = await model.generateContent(prompt)
    const reply = result.response.text()

    return NextResponse.json({ reply })
  } catch (err) {
    console.error("AI engine error:", err)
    return NextResponse.json(
      { error: "AI Engine failed" },
      { status: 500 }
    )
  }
}

function systemPrompt(mode: string): string {
  switch (mode) {
    case "dvir":
      return (
        "You are an AI assistant for DVIR (Daily Vehicle Inspection Reports). " +
        "Summarize mechanical defects and safety issues in clear, professional language."
      )
    case "incident":
      return (
        "You are an AI assistant for work zone incidents. " +
        "Write factual, neutral incident narratives: what, where, when, who, immediate actions."
      )
    case "hazard":
      return (
        "You are an AI safety analyst. Evaluate work zone hazards, " +
        "assign a risk level, and recommend control measures."
      )
    case "spec":
      return (
        "You explain work zone specifications, MUTCD layouts, tapers, " +
        "buffer zones, and safety devices in plain language."
      )
    case "toolbox":
      return (
        "You generate toolbox talks for road crews, using OSHA/VDOT/FHWA concepts. " +
        "Return structured talks with key hazards, PPE, and discussion questions."
      )
    case "supervisor_report":
      return (
        "You generate supervisor-grade daily summaries of road work operations, " +
        "highlighting safety, productivity, incidents, and recommendations."
      )
    case "coach":
      return (
        "You provide supportive, practical coaching to field crews and supervisors " +
        "based on status updates and notes."
      )
    case "assistant":
    default:
      return (
        "You are an AI assistant embedded in a road crew operations platform called Work Zone OS. " +
        "You assist with safety, training, inspections, incidents, hazards, and crew coordination."
      )
  }
}
