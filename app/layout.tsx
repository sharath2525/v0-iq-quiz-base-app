import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// Viewport configuration for mobile mini apps
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // For safe area insets
}

export const metadata: Metadata = {
  title: "IQ Quiz Contest - Test Your Logic and Pattern Recognition",
  description:
    "Take a fun 10-question IQ-style quiz under time pressure. Answer logic puzzles, number sequences, and pattern recognition questions in 10 minutes.",
  // Farcaster Mini App meta tags (new format)
  other: {
    "base:app_id": "693afd76e6be54f5ed71d66a",
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://base-quizz.vercel.app/icon.png",
      button: {
        title: "Take IQ Quiz",
        action: {
          type: "launch_miniapp",
          name: "IQ Quiz Contest",
          url: "https://base-quizz.vercel.app"
        }
      }
    }),
  },
  openGraph: {
    title: "IQ Quiz Contest",
    description: "Test your IQ with 10 logic and pattern recognition questions. Can you beat the clock?",
    images: [
      {
        url: "https://base-quizz.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "IQ Quiz Contest",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
