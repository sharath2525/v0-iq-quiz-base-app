"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { wagmiConfig } from "@/lib/wagmi-config"
import { initializeFarcasterSDK, getFarcasterContext, getSafeAreaInsets } from "@/lib/farcaster-sdk"
import type { Context } from "@farcaster/miniapp-sdk"

// Farcaster Context
interface FarcasterContextType {
  context: Context.MiniApp | null
  isLoading: boolean
  isInMiniApp: boolean
  safeAreaInsets: { top: number; bottom: number; left: number; right: number }
  user: Context.MiniApp["user"] | null
}

const FarcasterContext = createContext<FarcasterContextType>({
  context: null,
  isLoading: true,
  isInMiniApp: false,
  safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  user: null,
})

export function useFarcaster() {
  return useContext(FarcasterContext)
}

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  const [farcasterState, setFarcasterState] = useState<FarcasterContextType>({
    context: null,
    isLoading: true,
    isInMiniApp: false,
    safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
    user: null,
  })

  // Initialize Farcaster SDK on mount
  useEffect(() => {
    const init = async () => {
      const context = await initializeFarcasterSDK()
      
      setFarcasterState({
        context,
        isLoading: false,
        isInMiniApp: context !== null,
        safeAreaInsets: getSafeAreaInsets(),
        user: context?.user ?? null,
      })
    }

    init()
  }, [])

  return (
    <FarcasterContext.Provider value={farcasterState}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </FarcasterContext.Provider>
  )
}
