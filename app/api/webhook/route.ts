import { NextRequest, NextResponse } from "next/server"

/**
 * Webhook endpoint for Farcaster Mini App notifications
 * This receives events from the Farcaster client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the webhook event (you can process it as needed)
    console.log("Webhook received:", body)
    
    // Return success response
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

// Handle GET requests (for health checks)
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 })
}

