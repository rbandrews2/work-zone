'use client'

import { useState } from 'react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function AITrainingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'I am your Work Zone OS training assistant. Ask me about flagger safety, TTC basics, or night work best practices.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Placeholder AI response.
    const simulatedReply: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "This is a placeholder AI response. Wire this component to your Supabase Edge Function or Next.js API route to power real GPT-backed training assistance."
    }

    setTimeout(() => {
      setMessages(prev => [...prev, simulatedReply])
      setLoading(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col h-full max-h-[480px]">
      <h3 className="text-lg font-semibold mb-2">AI Training Assistant</h3>
      <div className="flex-1 overflow-y-auto border rounded-md p-2 mb-3 bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 input"
          placeholder="Ask about a safety topic..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-3 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-600 disabled:opacity-60"
        >
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </div>
    </div>
  )
}
