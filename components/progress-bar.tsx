interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercent = (current / total) * 100

  return (
    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
      <div
        className="bg-blue-600 h-full rounded-full transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  )
}
