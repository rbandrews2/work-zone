'use client'

import { TrainingModuleCard, TrainingModule } from '@/components/training/TrainingModuleCard'
import { AITrainingAssistant } from '@/components/training/AITrainingAssistant'

const modules: TrainingModule[] = [
  {
    id: 'flagger',
    title: 'Flagger Safety Refresher',
    description: 'Core responsibilities, communication, and safe positioning for flaggers.',
    level: 'beginner',
    estimatedMinutes: 20
  },
  {
    id: 'ttc-basics',
    title: 'TTC Basics',
    description: 'Temporary Traffic Control fundamentals and MUTCD-aligned setups.',
    level: 'intermediate',
    estimatedMinutes: 25
  },
  {
    id: 'night-work',
    title: 'Night Work Safety',
    description: 'Lighting, visibility, and fatigue management for nighttime work zones.',
    level: 'advanced',
    estimatedMinutes: 30
  }
]

export default function TrainingPage() {
  const handleStart = (module: TrainingModule) => {
    console.log('Start module', module.id)
  }

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Training & Certifications</h1>
        <p className="text-gray-600 mt-2">
          Review key work zone safety topics and chat with the AI assistant for quick refreshers.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          {modules.map(m => (
            <TrainingModuleCard key={m.id} module={m} onStart={handleStart} />
          ))}
        </section>

        <section className="lg:col-span-1">
          <AITrainingAssistant />
        </section>
      </div>
    </div>
  )
}
