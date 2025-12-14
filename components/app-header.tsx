"use client"

import { UserProfile } from "./user-profile"
import { useFarcaster } from "./providers"

/**
 * Persistent app header with user profile
 * Shows in top-right corner on all screens
 */
export function AppHeader() {
  const { safeAreaInsets } = useFarcaster()

  return (
    <div 
      className="fixed top-0 right-0 z-50 p-4"
      style={{ 
        paddingTop: `calc(1rem + ${safeAreaInsets.top}px)`,
        paddingRight: `calc(1rem + ${safeAreaInsets.right}px)`,
      }}
    >
      <UserProfile size="sm" showUsername={true} />
    </div>
  )
}

