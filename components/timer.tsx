interface TimerProps {
  timeRemaining: number
}

export function Timer({ timeRemaining }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  const isLowTime = timeRemaining < 60

  return (
    <div
      className={`px-4 py-2 rounded-lg font-mono font-bold text-lg ${
        isLowTime ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
      }`}
    >
      {`${minutes}:${seconds.toString().padStart(2, "0")}`}
    </div>
  )
}
