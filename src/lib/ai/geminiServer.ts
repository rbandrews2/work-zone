import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing.")
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export function getGeminiModel(model: string = "gemini-pro") {
  if (!genAI) {
    throw new Error("Gemini client not initialized.")
  }
  return genAI.getGenerativeModel({ model })
}
