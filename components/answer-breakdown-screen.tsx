"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import type { QuizResult } from "@/app/page"

interface AnswerBreakdownScreenProps {
  result: QuizResult
  onRetake: () => void
  onBack: () => void
}

export function AnswerBreakdownScreen({ result, onRetake, onBack }: AnswerBreakdownScreenProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0)
  const totalQuestions = result.questions.length
  const percentage = Math.round((result.rawScore / totalQuestions) * 100)

  return (
    <div className="min-h-screen py-6 px-4 sm:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
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
          <span className="text-sm font-medium">Back to Results</span>
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden mb-6">
          {/* Quiz Info */}
          <div className="p-6 text-center border-b border-[#D7DDF0]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF1FB] mb-3">
              <span className="text-xs font-semibold text-[#4A4A4A]">{result.categoryName}</span>
              <div className="w-1 h-1 rounded-full bg-[#A9B4D8]" />
              <span className="text-xs font-semibold text-[#1A1A1A]">{result.quizName}</span>
            </div>
            <h1 className="text-2xl font-black text-[#1A1A1A]">Answer Breakdown</h1>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 divide-x divide-[#D7DDF0]">
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-[#12C28D]">{result.rawScore}</div>
              <div className="text-xs font-medium text-[#4A4A4A]">Correct</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-[#FF4D4D]">{totalQuestions - result.rawScore}</div>
              <div className="text-xs font-medium text-[#4A4A4A]">Wrong</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-2xl font-black text-[#1A4BE8]">{percentage}%</div>
              <div className="text-xs font-medium text-[#4A4A4A]">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-6">
          {result.questions.map((question, index) => {
            const userAnswerIndex = result.userAnswers[index]
            const isCorrect = userAnswerIndex === question.correctOptionIndex
            const userAnswerText =
              userAnswerIndex !== null && userAnswerIndex !== undefined
                ? question.options[userAnswerIndex]
                : "Not answered"
            const isExpanded = expandedQuestion === index

            return (
              <div 
                key={question.id} 
                className="bg-white rounded-2xl shadow-lg shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden"
              >
                {/* Question Header */}
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#EEF1FB] transition-colors"
                >
                  <div className="flex items-center gap-3 text-left flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm
                        ${isCorrect 
                          ? 'bg-gradient-to-br from-[#12C28D] to-[#0EA372]' 
                          : 'bg-gradient-to-br from-[#FF4D4D] to-[#E04545]'
                        }`}
                    >
                      {isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#1A1A1A]">Question {index + 1}</p>
                      <p className="text-sm text-[#4A4A4A] truncate">{question.questionText}</p>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-[#4A4A4A] flex-shrink-0 ml-2 transition-transform duration-300 
                      ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-[#D7DDF0] p-4 space-y-4 bg-[#F5F7FF]">
                    {/* Question Text */}
                    <div>
                      <p className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider mb-2">Question</p>
                      <p className="text-[#1A1A1A] font-medium">{question.questionText}</p>
                    </div>

                    {/* Your Answer */}
                    <div>
                      <p className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider mb-2">Your Answer</p>
                      <div
                        className={`p-3 rounded-xl ${
                          isCorrect
                            ? 'bg-[#12C28D]/10 border border-[#12C28D]/30'
                            : 'bg-[#FF4D4D]/10 border border-[#FF4D4D]/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={isCorrect ? 'text-[#12C28D]' : 'text-[#FF4D4D]'}>
                            {isCorrect ? '✓' : '✗'}
                          </span>
                          <span className={`font-semibold ${isCorrect ? 'text-[#0EA372]' : 'text-[#E04545]'}`}>
                            {userAnswerText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Correct Answer (if wrong) */}
                    {!isCorrect && (
                      <div>
                        <p className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider mb-2">Correct Answer</p>
                        <div className="p-3 rounded-xl bg-[#12C28D]/10 border border-[#12C28D]/30">
                          <div className="flex items-center gap-2">
                            <span className="text-[#12C28D]">✓</span>
                            <span className="font-semibold text-[#0EA372]">
                              {question.options[question.correctOptionIndex]}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    <div>
                      <p className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider mb-2">Explanation</p>
                      <div className="p-3 rounded-xl bg-[#1A4BE8]/10 border border-[#1A4BE8]/20">
                        <p className="text-[#0E2C83] text-sm leading-relaxed">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onRetake} 
              className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] 
                hover:from-[#163FC2] hover:to-[#102F90] shadow-lg shadow-[#1A4BE8]/25 
                text-base font-bold"
            >
              Try Another Quiz
            </Button>
            <Button 
              onClick={onBack} 
              variant="outline" 
              className="flex-1 py-6 rounded-2xl bg-transparent border-[#D7DDF0] 
                hover:bg-[#EEF1FB] text-base font-semibold"
            >
              Back to Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
