"use client"

import { Menu, X, Globe, Bell, User, Search } from "lucide-react"

interface TopbarProps {
  isAuthenticated: boolean
  user: any
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
  onOpenLanguageModal?: () => void
}

export default function Topbar({ 
  isAuthenticated, 
  user, 
  sidebarOpen, 
  onToggleSidebar,
  onOpenLanguageModal 
}: TopbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 flex-shrink-0 shadow-sm">
      {/* Left side - Logo and toggle */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="rounded-xl hover:bg-gray-100 p-2 transition-all duration-300 text-gray-700 hover:text-gray-900 group"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
            ) : (
              <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
            )}
          </button>
        )}
        
        {/* Logo/Title with language selector */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-white">L</span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
            LEGNA AI
          </h1>
        </div>
      </div>

     

      {/* Right side - Actions and user */}
      <div className="flex items-center gap-2">
        {/* Language selector button */}
        {onOpenLanguageModal && (
          <button
            onClick={onOpenLanguageModal}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors relative group"
            title="Change Language"
          >
            <Globe className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"></div>
          </button>
        )}

        {/* Notifications */}
        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors relative group">
          <Bell className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </button>

        {/* User info */}
        {isAuthenticated && user && (
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.fullName || user?.email}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm cursor-pointer">
                <span className="text-sm font-bold text-white">
                  {(user?.fullName || user?.email || "U").charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}