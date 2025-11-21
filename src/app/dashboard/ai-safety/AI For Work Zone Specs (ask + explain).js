AI For Work Zone Specs (ask + explain)

Add an AI “Explain This Spec” button on each spec page.

Snippet to add to spec page:

import { useAiChat } from "@/lib/ai/useAiChat"

const { messages, loading, error, send } = useAiChat("spec")

async function explainSpec() {
  await send(`
    Explain this work zone spec in simple language for a field worker.
    SPEC CONTENT:
    ${specText}
  `)
}
