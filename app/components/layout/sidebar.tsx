"use client"

import { Settings, LogOut, X, Plus } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  language: "tigrinya" | "amharic" | "english"
  onShowSettings: () => void
  onLogout: () => void
  isAuthenticated: boolean
  userName?: string
  chatHistory?: Array<{ id: string; title: string; date: string }>
}

const sidebarLabels = {
  tigrinya: {
    newChat: "ሓድሽ ርክብ",
    search: "ርክብ ፈትሽ",
    library: "ክምከተ",
    history: "ታሪኽ",
    settings: "ምምሕዳር",
    logout: "ወጣ",
  },
  amharic: {
    newChat: "አዲስ ውይይት",
    search: "ውይይት ፈልግ",
    library: "ቤተ-መፃህፍት",
    history: "ታሪክ",
    settings: "ቅንብሮች",
    logout: "ውጣ",
  },
  english: {
    newChat: "New chat",
    search: "Search chat",
    library: "Library",
    history: "History",
    settings: "Settings",
    logout: "Logout",
  },
}

export default function Sidebar({
  isOpen,
  onToggle,
  language,
  onShowSettings,
  onLogout,
  isAuthenticated,
  userName,
  chatHistory = [],
}: SidebarProps) {
  const labels = sidebarLabels[language]
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  
  const logos = {
    newChat: "/assets/mdi_pencil.svg",
    search: "/assets/material-symbols_search-rounded.svg",
    library: "/assets/uil_books.svg",
  }

  return (
    <>
      {/* Desktop/Tablet sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen overflow-hidden ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header with toggle */}
        <div className="flex items-center justify-between p-3 border-b border-sidebar-border flex-shrink-0">
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 flex-shrink-0">
          <button className="w-full flex items-center justify-center gap-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 px-3 py-2.5 text-sidebar-foreground font-medium text-sm transition-colors">
            <img 
              src={logos.newChat} 
              alt="New Chat" 
              className="h-5 w-5"
              style={{ filter: "var(--sidebar-icon-filter, none)" }}
            />
            {isOpen && labels.newChat}
          </button>
        </div>

        {/* Search and Library (only when open) */}
        {isOpen && (
          <div className="px-3 space-y-2 flex-shrink-0">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <img 
                src={logos.search} 
                alt="Search" 
                className="h-4 w-4"
                style={{ filter: "var(--sidebar-icon-filter, none)" }}
              />
              {labels.search}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <img 
                src={logos.library} 
                alt="Library" 
                className="h-4 w-4"
                style={{ filter: "var(--sidebar-icon-filter, none)" }}
              />
              {labels.library}
            </button>
          </div>
        )}

        {/* Chat History */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 min-h-0">
            {chatHistory.length > 0 && (
              <>
                <p className="text-xs font-semibold text-sidebar-foreground/50 px-2 mb-2">Your chats</p>
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm truncate group"
                  >
                    {chat.title}
                    <div className="text-xs text-sidebar-foreground/50 mt-1">{chat.date}</div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}

        {/* User Profile and Actions */}
        {isAuthenticated && isOpen && (
          <div className="border-t border-sidebar-border p-3 space-y-2 flex-shrink-0">
            <button
              onClick={onShowSettings}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
            >
              <Settings className="h-4 w-4" />
              {labels.settings}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
            >
              <LogOut className="h-4 w-4" />
              {labels.logout}
            </button>
            {userName && (
              <div className="px-3 py-2 text-xs text-sidebar-foreground/70 truncate bg-sidebar-accent/30 rounded-lg">
                {userName}
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Mobile sidebar toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Plus className="h-6 w-6 text-primary-foreground" />
        )}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar panel */}
      {isMobileOpen && (
        <aside className="md:hidden fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto flex flex-col shadow-xl">
          {/* Close button */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border flex-shrink-0">
            <h2 className="text-lg font-bold text-sidebar-foreground">Menu</h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu items */}
          <div className="p-3 flex-shrink-0">
            <button className="w-full flex items-center justify-center gap-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 px-3 py-2.5 text-sidebar-foreground font-medium text-sm transition-colors">
              <img 
                src={logos.newChat} 
                alt="New Chat" 
                className="h-5 w-5"
                style={{ filter: "var(--sidebar-icon-filter, none)" }}
              />
              {labels.newChat}
            </button>
          </div>

          <div className="px-3 space-y-2 flex-shrink-0">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <img 
                src={logos.search} 
                alt="Search" 
                className="h-4 w-4"
                style={{ filter: "var(--sidebar-icon-filter, none)" }}
              />
              {labels.search}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <img 
                src={logos.library} 
                alt="Library" 
                className="h-4 w-4"
                style={{ filter: "var(--sidebar-icon-filter, none)" }}
              />
              {labels.library}
            </button>
          </div>

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 min-h-0">
              <p className="text-xs font-semibold text-sidebar-foreground/50 px-2 mb-2">Your chats</p>
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm truncate group"
                >
                  {chat.title}
                  <div className="text-xs text-sidebar-foreground/50 mt-1">{chat.date}</div>
                </button>
              ))}
            </div>
          )}

          {/* User Profile and Actions */}
          {isAuthenticated && (
            <div className="border-t border-sidebar-border p-3 space-y-2 flex-shrink-0 mt-auto">
              <button
                onClick={() => {
                  onShowSettings()
                  setIsMobileOpen(false)
                }}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
              >
                <Settings className="h-4 w-4" />
                {labels.settings}
              </button>
              <button
                onClick={() => {
                  onLogout()
                  setIsMobileOpen(false)
                }}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
              >
                <LogOut className="h-4 w-4" />
                {labels.logout}
              </button>
              {userName && (
                <div className="px-3 py-2 text-xs text-sidebar-foreground/70 truncate bg-sidebar-accent/30 rounded-lg">
                  {userName}
                </div>
              )}
            </div>
          )}
        </aside>
      )}
    </>
  )
}