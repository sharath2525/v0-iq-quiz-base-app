"use client"

import { useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import sdk from "@farcaster/miniapp-sdk"
import { useFarcaster } from "./providers"

/**
 * Silent wallet auto-connect component
 * Automatically connects wallet when app opens in Base mini app
 */
export function WalletAutoConnect() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { isInMiniApp, isLoading } = useFarcaster()

  useEffect(() => {
    const autoConnectWallet = async () => {
      // Only auto-connect if in mini app, not loading, not already connected
      if (isLoading || !isInMiniApp || isConnected) {
        return
      }

      try {
        // Check if we're in a mini app
        const isInMiniAppCheck = await sdk.isInMiniApp()
        if (!isInMiniAppCheck) {
          return
        }

        // Get the provider
        const provider = await sdk.wallet.getEthereumProvider()
        
        if (!provider || typeof provider !== 'object' || !('request' in provider)) {
          console.log("Wallet provider not available")
          return
        }

        // Request accounts silently (this connects the wallet)
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        }) as string[]

        if (accounts && accounts.length > 0) {
          // Find the injected connector and connect
          const injectedConnector = connectors.find(c => c.id === "injected" || c.name === "Farcaster" || c.id === "farcasterFrame")
          if (injectedConnector && !isConnected) {
            connect({ connector: injectedConnector })
          }
        }
      } catch (error) {
        // Silently fail - wallet might not be available or user rejected
        console.log("Auto-connect wallet:", error)
      }
    }

    // Delay to ensure SDK is ready
    const timer = setTimeout(autoConnectWallet, 1500)
    return () => clearTimeout(timer)
  }, [isInMiniApp, isLoading, isConnected, connect, connectors])

  return null // This component doesn't render anything
}

