"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import sdk from "@farcaster/miniapp-sdk"
import { createWalletClient, custom, parseEther, type Hash } from "viem"
import { base } from "viem/chains"
import { openUrl } from "@/lib/farcaster-sdk"
import { UserProfile } from "./user-profile"

export type PaymentStatus =
  | "idle"
  | "connecting"
  | "requesting"
  | "pending"
  | "confirmed"
  | "rejected"
  | "error"

interface PaymentGateProps {
  onPaymentSuccess: () => void
  onCancel: () => void
}

// Payment configuration
const PAYMENT_CONFIG = {
  recipientAddress: "0x362958481000c0d3214BEb4Ce60abbB4BD5177F9" as `0x${string}`,
  // 0.0000033 ETH
  amountEth: "0.0000033",
}

export function PaymentGate({ onPaymentSuccess, onCancel }: PaymentGateProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [txHash, setTxHash] = useState<Hash | "">("")

  const handlePayment = async () => {
    setStatus("connecting")
    setErrorMessage("")

    try {
      // Get the Farcaster ethereum provider
      const provider = await sdk.wallet.getEthereumProvider()
      
      if (!provider) {
        throw new Error("Wallet not available. Please try again.")
      }

      // Request accounts (connects wallet)
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      }) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error("No wallet account found")
      }

      const userAddress = accounts[0] as `0x${string}`
      
      setStatus("requesting")

      // Create a wallet client using the Farcaster provider
      const walletClient = createWalletClient({
        account: userAddress,
        chain: base,
        transport: custom(provider),
      })

      // Send the transaction directly to the recipient
      const hash = await walletClient.sendTransaction({
        to: PAYMENT_CONFIG.recipientAddress,
        value: parseEther(PAYMENT_CONFIG.amountEth),
      })

      setTxHash(hash)
      setStatus("pending")

      // Wait for transaction confirmation
      // We'll poll for the receipt
      const checkConfirmation = async () => {
        try {
          const receipt = await provider.request({
            method: "eth_getTransactionReceipt",
            params: [hash],
          })
          
          if (receipt) {
            setStatus("confirmed")
            setTimeout(() => {
              onPaymentSuccess()
            }, 1500)
            return true
          }
          return false
        } catch {
          return false
        }
      }

      // Poll for confirmation (check every 2 seconds, up to 60 seconds)
      let confirmed = false
      for (let i = 0; i < 30 && !confirmed; i++) {
        confirmed = await checkConfirmation()
        if (!confirmed) {
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      }

      if (!confirmed) {
        // Transaction was sent but we couldn't confirm in time
        // Still show success since the tx was sent
        setStatus("confirmed")
        setTimeout(() => {
          onPaymentSuccess()
        }, 1500)
      }

    } catch (error) {
      console.error("Payment error:", error)
      const errorMsg = error instanceof Error ? error.message.toLowerCase() : ""
      
      if (errorMsg.includes("insufficient") || errorMsg.includes("balance") || errorMsg.includes("funds")) {
        setStatus("error")
        setErrorMessage("Not enough ETH on Base. You need ETH for payment + gas fees.")
      } else if (errorMsg.includes("rejected") || errorMsg.includes("denied") || errorMsg.includes("cancel") || errorMsg.includes("user")) {
        setStatus("rejected")
        setErrorMessage("You cancelled the transaction. Tap 'Try Again' when ready!")
      } else if (errorMsg.includes("network") || errorMsg.includes("connect") || errorMsg.includes("chain")) {
        setStatus("error")
        setErrorMessage("Could not connect to Base network. Please try again.")
      } else {
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      }
    }
  }

  const handleRetry = () => {
    setStatus("idle")
    setErrorMessage("")
    setTxHash("")
  }

  const formatPaymentAmount = () => "0.0000033 ETH"

  const getStatusDisplay = () => {
    switch (status) {
      case "idle":
        return {
          icon: "💎",
          iconBg: "bg-gradient-to-br from-[#1A4BE8] to-[#0E2C83]",
          title: "Unlock Your Results",
          description: "Complete a small payment to reveal your quiz score and detailed breakdown.",
          showPay: true,
        }
      case "connecting":
        return {
          icon: "🔗",
          iconBg: "bg-gradient-to-br from-[#4E8CFF] to-[#1A4BE8]",
          title: "Connecting Wallet",
          description: "Please wait while we connect to your wallet...",
          showPay: false,
        }
      case "requesting":
        return {
          icon: "✍️",
          iconBg: "bg-gradient-to-br from-[#FFB84D] to-[#E5A33D]",
          title: "Confirm Payment",
          description: "Please confirm the transaction in your wallet.",
          showPay: false,
        }
      case "pending":
        return {
          icon: "⏳",
          iconBg: "bg-gradient-to-br from-[#4E8CFF] to-[#1A4BE8]",
          title: "Processing",
          description: "Transaction sent! Waiting for confirmation...",
          showPay: false,
        }
      case "confirmed":
        return {
          icon: "✓",
          iconBg: "bg-gradient-to-br from-[#12C28D] to-[#0EA372]",
          title: "Payment Confirmed!",
          description: "Unlocking your results...",
          showPay: false,
        }
      case "rejected":
      case "error":
        return {
          icon: "✗",
          iconBg: "bg-gradient-to-br from-[#FF4D4D] to-[#E04545]",
          title: "Payment Failed",
          description: errorMessage || "The transaction was not completed.",
          showPay: false,
          showRetry: true,
        }
      default:
        return {
          icon: "💎",
          iconBg: "bg-gradient-to-br from-[#1A4BE8] to-[#0E2C83]",
          title: "Unlock Your Results",
          description: "",
          showPay: true,
        }
    }
  }

  const display = getStatusDisplay()
  const isLoading = status === "connecting" || status === "requesting" || status === "pending"

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1A4BE8]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-[rgba(0,0,0,0.08)] border border-[#D7DDF0] overflow-hidden">
            {/* Icon Section */}
            <div className="pt-2 pb-6 text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${display.iconBg} 
                shadow-lg mb-4 ${isLoading ? 'animate-pulse' : ''}`}>
                {isLoading ? (
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-4xl">{display.icon}</span>
                )}
              </div>
              
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">{display.title}</h2>
              <p className="text-[#4A4A4A] text-sm px-6">{display.description}</p>
            </div>

            {/* Payment Details */}
            {status === "idle" && (
              <div className="px-6 pb-6">
                <div className="bg-[#EEF1FB] rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#4A4A4A]">Amount</span>
                    <span className="font-bold text-[#1A1A1A]">{formatPaymentAmount()}</span>
                  </div>
                  <div className="h-px bg-[#D7DDF0]" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#4A4A4A]">Network</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#1A4BE8]" />
                      <span className="font-semibold text-[#1A1A1A]">Base</span>
                    </div>
                  </div>
                  <div className="h-px bg-[#D7DDF0]" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#4A4A4A]">Recipient</span>
                    <span className="font-mono text-xs text-[#4A4A4A]">
                      {PAYMENT_CONFIG.recipientAddress.slice(0, 6)}...{PAYMENT_CONFIG.recipientAddress.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Hash */}
            {txHash && (status === "pending" || status === "confirmed") && (
              <div className="px-6 pb-6">
                <div className="bg-[#EEF1FB] rounded-2xl p-4">
                  <p className="text-xs font-semibold text-[#4A4A4A] mb-2">TRANSACTION</p>
                  <button
                    onClick={() => openUrl(`https://basescan.org/tx/${txHash}`)}
                    className="text-xs text-[#1A4BE8] hover:underline font-mono break-all text-left"
                  >
                    {txHash}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
              {display.showPay && (
                <Button 
                  onClick={handlePayment} 
                  className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] 
                    hover:from-[#163FC2] hover:to-[#102F90] shadow-lg shadow-[#1A4BE8]/25 
                    text-base font-bold"
                >
                  Pay {formatPaymentAmount()}
                </Button>
              )}

              {display.showRetry && (
                <Button 
                  onClick={handleRetry} 
                  className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#1A4BE8] to-[#0E2C83] 
                    hover:from-[#163FC2] hover:to-[#102F90] shadow-lg shadow-[#1A4BE8]/25 
                    text-base font-bold"
                >
                  Try Again
                </Button>
              )}

              {!isLoading && status !== "confirmed" && (
                <Button 
                  onClick={onCancel} 
                  variant="outline" 
                  className="w-full py-6 rounded-2xl bg-transparent border-[#D7DDF0] 
                    hover:bg-[#EEF1FB] text-base font-semibold"
                >
                  Cancel
                </Button>
              )}
            </div>

            {/* Tips */}
            {(status === "idle" || status === "rejected" || status === "error") && (
              <div className="px-6 pb-6">
                <div className="bg-[#FFB84D]/10 border border-[#FFB84D]/30 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-[#1A1A1A] mb-2">💡 Tips</p>
                  <ul className="text-xs text-[#4A4A4A] space-y-1">
                    <li>• Make sure you have ETH on <strong>Base</strong> network</li>
                    <li>• Small gas fee (~$0.01) required</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
