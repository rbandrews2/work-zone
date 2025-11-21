import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!

export const genAI = new GoogleGenerativeAI(apiKey)

export function getGemini(model: string = "gemini-pro") {
  return genAI.getGenerativeModel({ model })
}
