"use client"

import { Button } from "./ui/button"
import type { Question } from "@/lib/quiz-data"

interface QuizScreenProps {
  currentQuestionIndex: number
  totalQuestions: number
  question: Question
  selectedAnswer: number | null
  timeRemaining: number
  onSelectAnswer: (optionIndex: number) => void
  onPrevious: () => void
  onNext: () => void
  onFinish: () => void
  isLastQuestion: boolean
  canGoPrevious: boolean
}

export function QuizScreen({
  currentQuestionIndex,
  totalQuestions,
  question,
  selectedAnswer,
  timeRemaining,
  onSelectAnswer,
  onPrevious,
  onNext,
  onFinish,
  isLastQuestion,
  canGoPrevious,
}: QuizScreenProps) {
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLowTime = timeRemaining < 60

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl px-4">
        {/* Floating Timer */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
            ${isLowTime 
              ? 'bg-[#FF4D4D]/10 border border-[#FF4D4D]/30' 
              : 'bg-white border border-[#D7DDF0]'} 
            shadow-lg shadow-[rgba(0,0,0,0.08)]`}>
            <div className={`w-2 h-2 rounded-full ${isLowTime ? 'bg-[#FF4D4D] animate-pulse' : 'bg-[#12C28D]'}`} />
            <span className={`font-mono text-lg font-bold ${isLowTime ? 'text-[#FF4D4D]' : 'text-[#1A1A1A]'}`}>
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden">
          {/* Progress Header */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#4A4A4A]">
                QUESTION {currentQuestionIndex + 1}/{totalQuestions}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i < currentQuestionIndex
                        ? 'bg-[#12C28D]'
                        : i === currentQuestionIndex
                        ? 'bg-[#1A4BE8] scale-125'
                        : 'bg-[#D7DDF0]'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 bg-[#EEF1FB] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1A4BE8] to-[#4E8CFF] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="px-6 py-6">
            <p className="text-xl sm:text-2xl text-[#1A1A1A] font-semibold leading-relaxed">
              {question.questionText}
            </p>
          </div>

          {/* Options */}
          <div className="px-6 pb-6 space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const letter = String.fromCharCode(65 + index)
              
              return (
                <button
                  key={index}
                  onClick={() => onSelectAnswer(index)}
                  className={`w-full p-4 rounded-2xl text-left transition-all duration-200 
                    ${isSelected
                      ? 'bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] border-transparent shadow-lg shadow-[#1A4BE8]/25'
                      : 'bg-[#EEF1FB] border border-[#D7DDF0] hover:border-[#1A4BE8] hover:bg-[#F5F7FF]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                        ${isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-white border border-[#D7DDF0] text-[#4A4A4A]'
                        }`}
                    >
                      {letter}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {option}
                    </span>
                    
                    {/* Checkmark for selected */}
                    {isSelected && (
                      <div className="ml-auto">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6">
            <div className="flex gap-3">
              <Button 
                onClick={onPrevious} 
                disabled={!canGoPrevious} 
                variant="outline" 
                className="flex-1 py-6 rounded-2xl bg-transparent border-[#D7DDF0] hover:bg-[#EEF1FB] 
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>

              {isLastQuestion ? (
                <Button 
                  onClick={onFinish} 
                  className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-[#12C28D] to-[#0EA372] 
                    hover:from-[#10A87A] hover:to-[#0C8F64] shadow-lg shadow-[#12C28D]/25"
                >
                  Finish Quiz
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </Button>
              ) : (
                <Button 
                  onClick={onNext} 
                  className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] 
                    hover:from-[#163FC2] hover:to-[#102F90] shadow-lg shadow-[#1A4BE8]/25"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tip */}
        <p className="text-center text-xs text-[#4A4A4A] mt-4 font-medium">
          Tap any option to select • Navigate freely before finishing
        </p>
      </div>
    </div>
  )
}
