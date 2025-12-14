"use client"

import { useFarcaster } from "./providers"
import { useAccount } from "wagmi"

interface UserProfileProps {
  size?: "sm" | "md" | "lg"
  showUsername?: boolean
  className?: string
}

// List of dummy/placeholder usernames to filter out
const DUMMY_USERNAMES = [
  "dummyaccount",
  "dummy",
  "testuser",
  "placeholder",
  "user",
  "anonymous",
]

// Format wallet address to show first 6 and last 4 characters
function formatAddress(address: string): string {
  if (!address) return ""
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function UserProfile({ size = "md", showUsername = true, className = "" }: UserProfileProps) {
  const { user } = useFarcaster()
  const { address } = useAccount()

  // Get wallet address as fallback
  const walletAddress = address || (user as any)?.custodyAddress || null

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  // Get avatar URL - try different possible property names
  const avatarUrl = user ? ((user as any).pfpUrl || (user as any).avatar || (user as any).profileImage || (user as any).pfp?.url) : null
  
  // Get username - try different possible property names
  const rawUsername = user ? ((user as any).username || (user as any).displayName || (user as any).name || (user as any).display_name) : null
  
  // Filter out dummy usernames - only show if we have a real username
  const isDummyUsername = rawUsername && DUMMY_USERNAMES.includes(rawUsername.toLowerCase().trim())
  const username = isDummyUsername ? null : rawUsername

  // Determine what to display: username (if valid) or wallet address (as fallback)
  const displayName = username || (walletAddress ? formatAddress(walletAddress) : null)
  
  // Don't render if we don't have anything to show
  if (!displayName) {
    return null
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (username) {
      return username[0]?.toUpperCase() || "?"
    }
    if (walletAddress) {
      // Use first character after 0x or first character
      return walletAddress.slice(2, 3).toUpperCase() || walletAddress[0]?.toUpperCase() || "?"
    }
    return "?"
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Avatar */}
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#1A4BE8] to-[#4E8CFF] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm`}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={displayName || "User"} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `<span class="text-white font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}">${getInitials()}</span>`
              }
            }}
          />
        ) : (
          <span className={`text-white font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}`}>
            {getInitials()}
          </span>
        )}
      </div>
      
      {/* Display Name (Username or Wallet Address) */}
      {showUsername && displayName && (
        <span className={`font-semibold text-[#1A1A1A] ${textSizeClasses[size]} ${!username ? 'font-mono' : ''}`}>
          {displayName}
        </span>
      )}
    </div>
  )
}
