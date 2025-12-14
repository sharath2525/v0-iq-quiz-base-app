"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, useAccount, useConnect } from "wagmi"
import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { wagmiConfig } from "@/lib/wagmi-config"
import { initializeFarcasterSDK, getSafeAreaInsets, type FarcasterContext } from "@/lib/farcaster-sdk"
import sdk from "@farcaster/miniapp-sdk"

// Farcaster Context Type
interface FarcasterContextType {
  context: FarcasterContext | null
  isLoading: boolean
  isInMiniApp: boolean
  safeAreaInsets: { top: number; bottom: number; left: number; right: number }
  user: FarcasterContext["user"] | null
}

const FarcasterContextProvider = createContext<FarcasterContextType>({
  context: null,
  isLoading: true,
  isInMiniApp: false,
  safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  user: null,
})

export function useFarcaster() {
  return useContext(FarcasterContextProvider)
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
    <FarcasterContextProvider.Provider value={farcasterState}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </FarcasterContextProvider.Provider>
  )
}
