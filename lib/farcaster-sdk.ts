import sdk, { type Context } from "@farcaster/miniapp-sdk"

let isInitialized = false
let cachedContext: Context.MiniApp | null = null

/**
 * Initialize the Farcaster Mini App SDK
 * Call this once when the app loads to signal readiness to the Farcaster client
 */
export async function initializeFarcasterSDK(): Promise<Context.MiniApp | null> {
  if (isInitialized && cachedContext) return cachedContext

  try {
    // Check if we're in a mini app context
    const isInMiniApp = await sdk.isInMiniApp()
    
    if (!isInMiniApp) {
      console.log("Not running inside Farcaster Mini App")
      isInitialized = true
      return null
    }

    // Get the context before calling ready
    const context = await sdk.context

    // Signal to Farcaster that the Mini App is ready
    // This hides the splash screen
    await sdk.actions.ready({})

    cachedContext = context
    isInitialized = true
    console.log("Farcaster Mini App SDK initialized successfully")
    console.log("User FID:", context.user?.fid)
    
    return context
  } catch (error) {
    console.error("Failed to initialize Farcaster SDK:", error)
    isInitialized = true
    return null
  }
}

/**
 * Check if running inside a Farcaster Mini App context
 */
export function isInFarcasterContext(): boolean {
  return cachedContext !== null
}

/**
 * Get the cached Farcaster context
 */
export function getFarcasterContext(): Context.MiniApp | null {
  return cachedContext
}

/**
 * Get the Farcaster SDK instance for direct access
 */
export function getFarcasterSDK() {
  return sdk
}

/**
 * Get safe area insets from the Farcaster client
 */
export function getSafeAreaInsets() {
  if (!cachedContext?.client?.safeAreaInsets) {
    return { top: 0, bottom: 0, left: 0, right: 0 }
  }
  return cachedContext.client.safeAreaInsets
}

/**
 * Open a URL using the Farcaster SDK (opens in browser or in-app)
 */
export async function openUrl(url: string): Promise<void> {
  try {
    await sdk.actions.openUrl(url)
  } catch (error) {
    // Fallback to regular window.open
    window.open(url, "_blank")
  }
}

/**
 * Close the mini app
 */
export async function closeMiniApp(): Promise<void> {
  try {
    await sdk.actions.close()
  } catch (error) {
    console.error("Failed to close mini app:", error)
  }
}

/**
 * Share a cast/post to Farcaster
 */
export async function composeCast(text: string, embeds?: string[]): Promise<void> {
  try {
    await sdk.actions.composeCast({
      text,
      embeds: embeds?.map(url => ({ url })),
    })
  } catch (error) {
    console.error("Failed to compose cast:", error)
  }
}
