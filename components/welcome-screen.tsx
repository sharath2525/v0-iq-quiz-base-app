"use client"

import { Button } from "./ui/button"
import { type Quiz, type Category } from "@/lib/quiz-data"

interface WelcomeScreenProps {
  quiz: Quiz
  category: Category
  onStart: () => void
  onBack: () => void
}

export function WelcomeScreen({ quiz, category, onStart, onBack }: WelcomeScreenProps) {
  const timeMinutes = Math.floor(quiz.timeLimit / 60)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {/* Back Button - Minimal */}
        <button
          onClick={onBack}
          className="group mb-6 flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-[#D7DDF0] flex items-center justify-center
            shadow-sm group-hover:shadow group-hover:border-[#A9B4D8] transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-br ${category.color} p-6 sm:p-8`}>
            <div className="text-center">
              {/* Category badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <span className="text-sm">{category.icon}</span>
                <span className="text-xs font-semibold text-white/90">{category.name}</span>
              </div>
              
              {/* Quiz Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm
                flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl sm:text-4xl">{quiz.icon}</span>
              </div>
              
              {/* Quiz Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                {quiz.name}
              </h1>
              <p className="text-white/80 text-sm font-medium">
                {quiz.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#EEF1FB] rounded-2xl p-4 text-center border border-[#D7DDF0]">
                <div className="text-2xl font-black text-[#1A1A1A]">{quiz.questions.length}</div>
                <div className="text-xs font-medium text-[#4A4A4A] mt-0.5">Questions</div>
              </div>
              <div className="bg-[#EEF1FB] rounded-2xl p-4 text-center border border-[#D7DDF0]">
                <div className="text-2xl font-black text-[#1A1A1A]">{timeMinutes}</div>
                <div className="text-xs font-medium text-[#4A4A4A] mt-0.5">Minutes</div>
              </div>
            </div>

            {/* Payment info - subtle */}
            <div className="flex items-center justify-center gap-2 mb-6 py-3 px-4 rounded-xl bg-[#EEF1FB] border border-[#D7DDF0]">
              <span className="text-[#1A4BE8]">💎</span>
              <span className="text-xs font-medium text-[#4A4A4A]">
                <span className="font-bold text-[#1A4BE8]">0.0000033 ETH</span> to unlock results
              </span>
            </div>

            {/* Start Button */}
            <Button 
              onClick={onStart} 
              className="w-full py-6 text-lg font-bold rounded-2xl bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] 
                hover:from-[#163FC2] hover:to-[#102F90] transition-all shadow-lg shadow-[#1A4BE8]/25"
            >
              Start Quiz
            </Button>

            {/* Tip */}
            <p className="text-center text-xs text-[#4A4A4A] mt-4 font-medium">
              Navigate between questions before submitting
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
