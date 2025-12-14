import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IQ Quiz Contest - Test Your Logic and Pattern Recognition",
  description:
    "Take a fun 10-question IQ-style quiz under time pressure. Answer logic puzzles, number sequences, and pattern recognition questions in 10 minutes.",
  // Farcaster Mini App meta tags
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://v0-iq-quiz-app-roan.vercel.app/image.png",
    "fc:frame:button:1": "Take IQ Quiz",
    "fc:frame:button:1:action": "launch_frame",
    "fc:frame:button:1:target": "https://v0-iq-quiz-app-roan.vercel.app",
  },
  openGraph: {
    title: "IQ Quiz Contest",
    description: "Test your IQ with 10 logic and pattern recognition questions. Can you beat the clock?",
    images: [
      {
        url: "https://v0-iq-quiz-app-roan.vercel.app/image.png",
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
