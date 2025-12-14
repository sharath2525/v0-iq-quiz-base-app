"use client"

import { type Category, type Quiz } from "@/lib/quiz-data"

interface CategoryScreenProps {
  category: Category
  onSelectQuiz: (quiz: Quiz) => void
  onBack: () => void
}

export function CategoryScreen({ category, onSelectQuiz, onBack }: CategoryScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {/* Back Button - Minimal */}
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-[#D7DDF0] flex items-center justify-center
            shadow-sm group-hover:shadow group-hover:border-[#A9B4D8] transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Category Header */}
        <div className="text-center mb-10">
          {/* Category Icon */}
          <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl 
            bg-gradient-to-br ${category.color} 
            flex items-center justify-center
            shadow-xl shadow-[rgba(0,0,0,0.08)]
            mb-5`}>
            <span className="text-4xl sm:text-5xl filter drop-shadow-sm">{category.icon}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] mb-2">
            {category.name}
          </h1>
          <p className="text-[#4A4A4A] font-medium">{category.description}</p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          {category.quizzes.map((quiz, index) => (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-square
                bg-white
                border border-[#D7DDF0]
                shadow-lg shadow-[rgba(0,0,0,0.08)]
                transform transition-all duration-300 ease-out
                group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-[#1A4BE8]
                group-active:scale-[0.98]">
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-2 sm:p-3">
                  {/* Quiz number badge */}
                  <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full 
                    bg-[#EEF1FB] border border-[#D7DDF0]
                    flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-bold text-[#4A4A4A]">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl 
                    bg-[#EEF1FB]
                    border border-[#D7DDF0]
                    flex items-center justify-center
                    transform transition-transform duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    group-hover:border-[#A9B4D8]">
                    <span className="text-xl sm:text-2xl">{quiz.icon}</span>
                  </div>
                  
                  {/* Name */}
                  <span className="mt-2 text-[10px] sm:text-xs font-bold text-[#1A1A1A] text-center leading-tight tracking-tight">
                    {quiz.name}
                  </span>
                  
                  {/* Question count */}
                  <span className="mt-0.5 text-[9px] sm:text-[10px] text-[#4A4A4A] font-medium">
                    {quiz.questions.length} Qs
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 text-[#4A4A4A]">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">10 min each</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#A9B4D8]"></div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-xs font-medium">10 questions</span>
          </div>
        </div>
      </div>
    </div>
  )
}
