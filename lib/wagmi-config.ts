import { http, createConfig, injected } from "wagmi"
import { base } from "wagmi/chains"
import sdk from "@farcaster/miniapp-sdk"

// Wagmi config with Base chain
// Uses injected connector which works with Farcaster's ethereum provider
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected({
      target: {
        id: "farcasterFrame",
        name: "Farcaster",
        provider: () => {
          if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return sdk.wallet.ethProvider as any
          }
          return undefined
        },
      },
    }),
  ],
})

// Payment configuration
export const PAYMENT_CONFIG = {
  // Your wallet address to receive payments
  recipientAddress: "0x362958481000c0d3214BEb4Ce60abbB4BD5177F9" as `0x${string}`,
  // Payment amount: 0.0000033 ETH in wei
  paymentAmountWei: BigInt(3300000000000), // 0.0000033 ETH = 3.3e12 wei
  // Chain ID for Base
  chainId: base.id,
} as const

// Helper to format ETH amount for display
export function formatPaymentAmount(): string {
  return "0.0000033 ETH"
}
