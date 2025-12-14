import sdk from "@farcaster/miniapp-sdk"

let isInitialized = false

/**
 * Initialize the Farcaster Mini App SDK
 * Call this once when the app loads to signal readiness to the Farcaster client
 */
export async function initializeFarcasterSDK(): Promise<void> {
  if (isInitialized) return

  try {
    // Signal to Farcaster that the Mini App is ready
    await sdk.actions.ready()
    isInitialized = true
    console.log("Farcaster Mini App SDK initialized successfully")
  } catch (error) {
    console.error("Failed to initialize Farcaster SDK:", error)
    // Don't throw - app should still work outside Farcaster
  }
}

/**
 * Check if running inside a Farcaster Mini App context
 */
export async function isInFarcasterContext(): Promise<boolean> {
  if (typeof window === "undefined") return false
  try {
    return await sdk.isInMiniApp()
  } catch {
    return false
  }
}

/**
 * Get the Farcaster SDK instance for direct access if needed
 */
export function getFarcasterSDK() {
  return sdk
}
