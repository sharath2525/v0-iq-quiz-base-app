"use client"

import { useFarcaster } from "./providers"

interface UserProfileProps {
  size?: "sm" | "md" | "lg"
  showUsername?: boolean
  className?: string
}

export function UserProfile({ size = "md", showUsername = true, className = "" }: UserProfileProps) {
  const { user } = useFarcaster()

  if (!user) {
    return null
  }

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
  const avatarUrl = (user as any).pfpUrl || (user as any).avatar || (user as any).profileImage
  
  // Get username - try different possible property names
  const username = (user as any).username || (user as any).displayName || (user as any).name

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Avatar */}
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#1A4BE8] to-[#4E8CFF] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm`}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={username || "User"} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `<span class="text-white font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}">${username?.[0]?.toUpperCase() || "?"}</span>`
              }
            }}
          />
        ) : (
          <span className={`text-white font-bold ${size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"}`}>
            {username?.[0]?.toUpperCase() || "?"}
          </span>
        )}
      </div>
      
      {/* Username */}
      {showUsername && username && (
        <span className={`font-semibold text-[#1A1A1A] ${textSizeClasses[size]}`}>
          {username}
        </span>
      )}
    </div>
  )
}

