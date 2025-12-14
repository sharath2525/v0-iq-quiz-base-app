"use client"

import { useState, useEffect } from "react"
import { HomeScreen } from "@/components/home-screen"
import { CategoryScreen } from "@/components/category-screen"
import { WelcomeScreen } from "@/components/welcome-screen"
import { QuizScreen } from "@/components/quiz-screen"
import { ResultsScreen } from "@/components/results-screen"
import { AnswerBreakdownScreen } from "@/components/answer-breakdown-screen"
import { PaymentGate } from "@/components/payment-gate"
import { type Category, type Quiz, type Question, calculateScore } from "@/lib/quiz-data"
import { useFarcaster } from "@/components/providers"

// Extended app states to include category navigation
export type AppState = 
  | "home" 
  | "categoryView" 
  | "welcome" 
  | "inProgress" 
  | "awaitingPayment" 
  | "finished" 
  | "breakdown"

export interface QuizResult {
  rawScore: number
  iqScore: number
  userAnswers: (number | null)[]
  timeTaken: number
  questions: Question[]
  quizName: string
  categoryName: string
}

export default function Home() {
  // Farcaster context (SDK initialized in providers)
  const { safeAreaInsets, isLoading } = useFarcaster()

  // Navigation state
  const [appState, setAppState] = useState<AppState>("home")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  // Timer effect
  useEffect(() => {
    if (appState !== "inProgress" || !selectedQuiz) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - finish quiz and go to payment
          finishQuizAndRequestPayment()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [appState, selectedQuiz])

  // ============================================
  // NAVIGATION HANDLERS
  // ============================================

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
    setAppState("categoryView")
  }

  const handleSelectQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz)
    setAppState("welcome")
  }

  const handleBackToHome = () => {
    setSelectedCategory(null)
    setSelectedQuiz(null)
    setAppState("home")
  }

  const handleBackToCategory = () => {
    setSelectedQuiz(null)
    setAppState("categoryView")
  }

  // ============================================
  // QUIZ FLOW HANDLERS
  // ============================================

  const startQuiz = () => {
    if (!selectedQuiz) return
    
    setAppState("inProgress")
    setCurrentQuestionIndex(0)
    setUserAnswers(Array(selectedQuiz.questions.length).fill(null))
    setTimeRemaining(selectedQuiz.timeLimit)
  }

  const finishQuizAndRequestPayment = () => {
    if (!selectedQuiz || !selectedCategory) return

    const rawScore = userAnswers.filter(
      (ans, idx) => ans === selectedQuiz.questions[idx].correctOptionIndex
    ).length
    const iqScore = calculateScore(rawScore, selectedQuiz.questions.length)

    setQuizResult({
      rawScore,
      iqScore,
      userAnswers,
      timeTaken: selectedQuiz.timeLimit - timeRemaining,
      questions: selectedQuiz.questions,
      quizName: selectedQuiz.name,
      categoryName: selectedCategory.name,
    })

    setAppState("awaitingPayment")
  }

  const onPaymentSuccess = () => {
    setAppState("finished")
  }

  const onPaymentCancel = () => {
    // Go back to category view
    setAppState("categoryView")
    resetQuizState()
  }

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setUserAnswers(newAnswers)
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const goToNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const retakeQuiz = () => {
    // Go back to home instead of restarting same quiz
    handleBackToHome()
  }

  const viewBreakdown = () => {
    setAppState("breakdown")
  }

  const resetQuizState = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setTimeRemaining(600)
    setQuizResult(null)
  }

  // ============================================
  // RENDER
  // ============================================

  // Show loading while SDK initializes
  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-[#F5F7FF] flex items-center justify-center">
        <div className="animate-pulse text-[#1A4BE8] text-lg font-semibold">Loading...</div>
      </main>
    )
  }

  return (
    <main 
      className="min-h-screen w-full bg-[#F5F7FF] py-6 px-4 sm:py-8"
      style={{
        paddingTop: `calc(1.5rem + ${safeAreaInsets.top}px)`,
        paddingBottom: `calc(1.5rem + ${safeAreaInsets.bottom}px)`,
        paddingLeft: `calc(1rem + ${safeAreaInsets.left}px)`,
        paddingRight: `calc(1rem + ${safeAreaInsets.right}px)`,
      }}
    >
      {/* Home - Category Selection */}
      {appState === "home" && (
        <HomeScreen onSelectCategory={handleSelectCategory} />
      )}

      {/* Category View - Quiz Selection */}
      {appState === "categoryView" && selectedCategory && (
        <CategoryScreen
          category={selectedCategory}
          onSelectQuiz={handleSelectQuiz}
          onBack={handleBackToHome}
        />
      )}

      {/* Quiz Welcome Screen */}
      {appState === "welcome" && selectedQuiz && selectedCategory && (
        <WelcomeScreen
          quiz={selectedQuiz}
          category={selectedCategory}
          onStart={startQuiz}
          onBack={handleBackToCategory}
        />
      )}

      {/* Quiz In Progress */}
      {appState === "inProgress" && selectedQuiz && (
        <QuizScreen
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={selectedQuiz.questions.length}
          question={selectedQuiz.questions[currentQuestionIndex]}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          timeRemaining={timeRemaining}
          onSelectAnswer={selectAnswer}
          onPrevious={goToPreviousQuestion}
          onNext={goToNextQuestion}
          onFinish={finishQuizAndRequestPayment}
          isLastQuestion={currentQuestionIndex === selectedQuiz.questions.length - 1}
          canGoPrevious={currentQuestionIndex > 0}
        />
      )}

      {/* Payment Gate */}
      {appState === "awaitingPayment" && (
        <PaymentGate onPaymentSuccess={onPaymentSuccess} onCancel={onPaymentCancel} />
      )}

      {/* Results Screen */}
      {appState === "finished" && quizResult && (
        <ResultsScreen 
          result={quizResult} 
          onViewBreakdown={viewBreakdown} 
          onRetake={retakeQuiz} 
        />
      )}

      {/* Answer Breakdown */}
      {appState === "breakdown" && quizResult && (
        <AnswerBreakdownScreen
          result={quizResult}
          onRetake={retakeQuiz}
          onBack={() => setAppState("finished")}
        />
      )}
    </main>
  )
}
