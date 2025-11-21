"use client"

import { useState } from "react"

export type Role = "user" | "assistant" | "system"

export interface ChatMessage {
  role: Role
  content: string
}

export function useAiChat(mode: string = "assistant") {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(content: string) {
    if (!content.trim()) return

    setError(null)
    setLoading(true)

    const userMessage: ChatMessage = { role: "user", content }
    const newMessages: ChatMessage[] = [...messages, userMessage]

    setMessages(newMessages)

    try {
      const res = await fetch("/api/ai/engine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: newMessages,
        }),
      })

      if (!res.ok) throw new Error("AI request failed")

      const data = await res.json()
      const reply: string = data.reply ?? ""

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: reply,
      }

      setMessages((prev: any) => [...prev, aiMessage])
    } catch (err) {
      console.error(err)
      setError("AI request failed")
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, error, send }
}
