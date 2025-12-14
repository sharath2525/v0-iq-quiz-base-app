"use client"

import { QUIZ_CATEGORIES, type Category } from "@/lib/quiz-data"
import { UserProfile } from "./user-profile"
import { useFarcaster } from "./providers"

interface HomeScreenProps {
  onSelectCategory: (category: Category) => void
}

export function HomeScreen({ onSelectCategory }: HomeScreenProps) {
  const { user } = useFarcaster()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1A4BE8]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4E8CFF]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          {/* User Profile Header */}
          {user && (
            <div className="mb-6 flex justify-end">
              <UserProfile size="sm" showUsername={true} />
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A4BE8] to-[#0E2C83] shadow-lg shadow-[#1A4BE8]/30 mb-5">
              <span className="text-3xl">🧠</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] bg-clip-text text-transparent">
                QuizMaster
              </span>
            </h1>
            
            <p className="text-[#4A4A4A] font-medium text-base mb-4">
              Challenge yourself • Learn something new
            </p>

            {/* Onboarding Description */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="bg-[#EEF1FB] border border-[#D7DDF0] rounded-2xl p-4 text-left">
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                  <span>📚</span> How it works
                </h3>
                <ol className="text-xs text-[#4A4A4A] space-y-1.5 list-decimal list-inside">
                  <li>Choose a quiz category that interests you</li>
                  <li>Answer 10 questions under time pressure</li>
                  <li>Complete a small payment to unlock your results</li>
                  <li>See your IQ score and detailed breakdown</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {QUIZ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category)}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#1A4BE8] to-[#4E8CFF] rounded-3xl opacity-0 
                  group-hover:opacity-40 blur-lg transition-all duration-500" />
                
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl aspect-square
                  bg-white
                  border border-[#D7DDF0]
                  shadow-lg shadow-[rgba(0,0,0,0.08)]
                  transform transition-all duration-300 ease-out
                  group-hover:scale-[1.03] group-hover:shadow-xl
                  group-active:scale-[0.97]">
                  
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.08]`} />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-3">
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl 
                      bg-gradient-to-br ${category.color} 
                      flex items-center justify-center
                      shadow-lg
                      transform transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-6`}>
                      <span className="text-2xl sm:text-3xl filter drop-shadow-sm">{category.icon}</span>
                    </div>
                    
                    {/* Name */}
                    <span className="mt-3 text-sm font-bold text-[#1A1A1A] tracking-tight">
                      {category.name}
                    </span>
                    
                    {/* Quiz count */}
                    <div className="mt-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1A4BE8]" />
                      <span className="text-[11px] text-[#4A4A4A] font-semibold">
                        {category.quizzes.length} quizzes
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF1FB]">
              <span className="text-xs font-semibold text-[#4A4A4A]">⚡ Powered by</span>
              <span className="text-xs font-bold bg-gradient-to-r from-[#1A4BE8] to-[#4E8CFF] bg-clip-text text-transparent">
                Base Network
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
