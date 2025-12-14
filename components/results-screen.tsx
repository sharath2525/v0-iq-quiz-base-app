"use client"

import { Button } from "./ui/button"
import type { QuizResult } from "@/app/page"
import { getScoreInterpretation } from "@/lib/quiz-data"
import { UserProfile } from "./user-profile"

interface ResultsScreenProps {
  result: QuizResult
  onViewBreakdown: () => void
  onRetake: () => void
}

export function ResultsScreen({ result, onViewBreakdown, onRetake }: ResultsScreenProps) {
  const totalQuestions = result.questions.length
  const scoreInterpretation = getScoreInterpretation(result.rawScore, totalQuestions)
  const roundedIQ = Math.round(result.iqScore)
  const percentage = Math.round((result.rawScore / totalQuestions) * 100)
  
  // Determine score tier for styling
  const isExcellent = percentage >= 80
  const isGood = percentage >= 60 && percentage < 80
  const gradientClass = isExcellent 
    ? 'from-[#12C28D] to-[#0EA372]' 
    : isGood 
    ? 'from-[#1A4BE8] to-[#0E2C83]'
    : 'from-[#FFB84D] to-[#E5A33D]'
  const shadowColor = isExcellent 
    ? 'shadow-[#12C28D]/20' 
    : isGood 
    ? 'shadow-[#1A4BE8]/20'
    : 'shadow-[#FFB84D]/20'

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full blur-3xl`} />
        </div>

        <div className="relative">
          {/* User Profile Header */}
          <div className="mb-4 flex justify-end">
            <UserProfile size="sm" showUsername={true} />
          </div>

          {/* Quiz Info Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D7DDF0] shadow-sm">
              <span className="text-xs font-semibold text-[#4A4A4A]">{result.categoryName}</span>
              <div className="w-1 h-1 rounded-full bg-[#A9B4D8]" />
              <span className="text-xs font-semibold text-[#1A1A1A]">{result.quizName}</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden">
            {/* Score Header */}
            <div className={`bg-gradient-to-br ${gradientClass} p-8 text-center`}>
              <p className="text-white/80 text-sm font-semibold mb-2">YOUR SCORE</p>
              <div className="text-7xl sm:text-8xl font-black text-white mb-2">{roundedIQ}</div>
              <p className="text-white/90 font-semibold text-lg">{scoreInterpretation}</p>
            </div>

            {/* Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[#EEF1FB] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-[#12C28D]">{result.rawScore}</div>
                  <div className="text-xs font-medium text-[#4A4A4A] mt-1">Correct</div>
                </div>
                <div className="bg-[#EEF1FB] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-[#FF4D4D]">{totalQuestions - result.rawScore}</div>
                  <div className="text-xs font-medium text-[#4A4A4A] mt-1">Wrong</div>
                </div>
                <div className="bg-[#EEF1FB] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-[#1A4BE8]">{percentage}%</div>
                  <div className="text-xs font-medium text-[#4A4A4A] mt-1">Accuracy</div>
                </div>
              </div>

              {/* Formula */}
              <div className="bg-[#EEF1FB] rounded-2xl p-4 mb-6">
                <p className="text-xs font-semibold text-[#4A4A4A] mb-2">SCORE CALCULATION</p>
                <p className="font-mono text-sm text-[#4A4A4A]">
                  70 + ({result.rawScore}/{totalQuestions}) × 60 = <span className="font-bold text-[#1A1A1A]">{roundedIQ}</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={onViewBreakdown} 
                  className={`w-full py-6 rounded-2xl bg-gradient-to-r ${gradientClass} 
                    hover:opacity-90 shadow-lg ${shadowColor} text-base font-bold`}
                >
                  View Answer Breakdown
                </Button>
                <Button 
                  onClick={onRetake} 
                  variant="outline" 
                  className="w-full py-6 rounded-2xl bg-transparent border-[#D7DDF0] 
                    hover:bg-[#EEF1FB] text-base font-semibold"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
