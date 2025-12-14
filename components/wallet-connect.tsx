"use client"

import { useEffect, useState } from "react"
import { useAccount, useConnect } from "wagmi"
import { Button } from "./ui/button"
import sdk from "@farcaster/miniapp-sdk"
import { useFarcaster } from "./providers"

export function WalletConnect() {
  const { isConnected, address } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { isInMiniApp, isLoading } = useFarcaster()
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasAutoConnected, setHasAutoConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto-connect on mount if in mini app and not connected
  useEffect(() => {
    const autoConnect = async () => {
      // Only auto-connect if we're in a mini app, not already connected, and haven't tried yet
      if (isLoading || !isInMiniApp || isConnected || hasAutoConnected || isConnecting) {
        return
      }

      try {
        setIsConnecting(true)
        setError(null)

        // Check if we're in a mini app first
        const isInMiniAppCheck = await sdk.isInMiniApp()
        if (!isInMiniAppCheck) {
          console.log("Not in mini app context")
          setIsConnecting(false)
          setHasAutoConnected(true)
          return
        }

        // Get the provider using the SDK method
        let provider
        try {
          provider = await sdk.wallet.getEthereumProvider()
        } catch (providerError) {
          console.log("Failed to get provider:", providerError)
          setIsConnecting(false)
          setHasAutoConnected(true)
          return
        }
        
        if (!provider || typeof provider !== 'object' || !('request' in provider)) {
          console.log("Wallet provider not available or invalid")
          setIsConnecting(false)
          setHasAutoConnected(true)
          return
        }

        // Request accounts - this will prompt the user
        try {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          }) as string[]

          if (accounts && accounts.length > 0) {
            // Find the injected connector and connect
            const injectedConnector = connectors.find(c => c.id === "injected" || c.name === "Farcaster" || c.id === "farcasterFrame")
            if (injectedConnector) {
              connect({ connector: injectedConnector })
            }
          }
        } catch (requestError: any) {
          // User might have rejected the connection
          console.log("Connection request failed or rejected:", requestError?.message || requestError)
          setError("Connection was rejected or failed")
        }
        
        setHasAutoConnected(true)
        setIsConnecting(false)
      } catch (error: any) {
        console.error("Auto-connect failed:", error)
        setError(error?.message || "Failed to connect wallet")
        setIsConnecting(false)
        setHasAutoConnected(true)
      }
    }

    // Delay to ensure SDK is ready
    const timer = setTimeout(autoConnect, 1000)
    return () => clearTimeout(timer)
  }, [isInMiniApp, isConnected, hasAutoConnected, isConnecting, connect, connectors, isLoading])

  // Manual connect handler
  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      setError(null)

      // Check if we're in a mini app
      const isInMiniAppCheck = await sdk.isInMiniApp()
      if (!isInMiniAppCheck) {
        setError("Please open this app in Base app to connect your wallet")
        setIsConnecting(false)
        return
      }

      // Get the provider using the SDK method
      let provider
      try {
        provider = await sdk.wallet.getEthereumProvider()
      } catch (providerError) {
        setError("Wallet not available. Please open this app in Base app.")
        setIsConnecting(false)
        return
      }
      
      if (!provider || typeof provider !== 'object' || !('request' in provider)) {
        setError("Wallet not available. Please open this app in Base app.")
        setIsConnecting(false)
        return
      }

      // Request accounts
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        }) as string[]

        if (accounts && accounts.length > 0) {
          const injectedConnector = connectors.find(c => c.id === "injected" || c.name === "Farcaster" || c.id === "farcasterFrame")
          if (injectedConnector) {
            connect({ connector: injectedConnector })
          } else {
            setError("Wallet connector not found")
          }
        } else {
          setError("No wallet account found")
        }
      } catch (requestError: any) {
        // User might have rejected
        const errorMessage = requestError?.message || requestError?.error?.message || "Connection rejected or failed"
        setError(errorMessage)
        console.error("Connection request error:", requestError)
      }
      
      setIsConnecting(false)
    } catch (error: any) {
      console.error("Connection failed:", error)
      setError(error?.message || "Failed to connect wallet")
      setIsConnecting(false)
    }
  }

  // Don't show anything if already connected
  if (isConnected) {
    return null
  }

  // Don't show if not in mini app (for development)
  if (!isInMiniApp && !isLoading) {
    return (
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-yellow-800 text-sm text-center">
            ⚠️ Please open this app in Base app to connect your wallet
          </p>
        </div>
      </div>
    )
  }

  // Show connection prompt
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] rounded-2xl p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl">👛</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Connect Wallet</p>
                <p className="text-white/80 text-xs">Connect your Base wallet to get started</p>
              </div>
            </div>
            <Button
              onClick={handleConnect}
              disabled={isPending || isConnecting || isLoading}
              className="bg-white text-[#1A4BE8] hover:bg-white/90 font-bold px-4 py-2 rounded-xl text-sm disabled:opacity-50"
            >
              {isPending || isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2">
              <p className="text-white text-xs">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
