'use client'

export type TrainingModule = {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  completed?: boolean
}

interface TrainingModuleCardProps {
  module: TrainingModule
  onStart?: (module: TrainingModule) => void
}

export function TrainingModuleCard({ module, onStart }: TrainingModuleCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{module.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Level: <span className="font-medium capitalize">{module.level}</span> ·{' '}
          {module.estimatedMinutes} min
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {module.completed && (
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
            Completed
          </span>
        )}
        <button
          onClick={() => onStart && onStart(module)}
          className="ml-auto px-3 py-1 text-sm rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
        >
          {module.completed ? 'Review' : 'Start'}
        </button>
      </div>
    </div>
  )
}
