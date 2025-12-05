"use client"

import { Menu, X } from "lucide-react"

interface TopbarProps {
  isAuthenticated: boolean
  user: any
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
}

export default function Topbar({ isAuthenticated, user, sidebarOpen, onToggleSidebar }: TopbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:px-6 flex-shrink-0">
      {/* Logo/Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-lg hover:bg-muted p-1.5 transition-colors text-foreground"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
        <h1 className="text-lg font-bold text-foreground hidden sm:block">LEGNA</h1>
      </div>

      {/* Right side - User info */}
      {isAuthenticated && user && (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">{user?.fullName || user?.email}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {(user?.fullName || user?.email || "U").charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
