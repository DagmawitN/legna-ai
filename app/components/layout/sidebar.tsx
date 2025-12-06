"use client"

import { Settings, LogOut, X, Plus } from "lucide-react"
import { useState } from "react"
import Image from "next/image" // ✅ Next.js Image

import { AppLanguage } from "@/app/components/layout/chat-layout" // ✅ use the shared type

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  language: AppLanguage // ✅ updated
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
  oromigna: {
    newChat: "Waliigala haaraa",
    search: "Barbaadi",
    library: "Maktabaa",
    history: "Seenaa",
    settings: "Qindaa’inoota",
    logout: "Ba’i",
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
            <Image
              src={logos.newChat}
              alt="New Chat"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            {isOpen && labels.newChat}
          </button>
        </div>

        {/* Search and Library */}
        {isOpen && (
          <div className="px-3 space-y-2 flex-shrink-0">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <Image
                src={logos.search}
                alt="Search"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              {labels.search}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <Image
                src={logos.library}
                alt="Library"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              {labels.library}
            </button>
          </div>
        )}

        {/* Chat History */}
        {isOpen && chatHistory.length > 0 && (
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 min-h-0">
            <p className="text-xs font-semibold text-sidebar-foreground/50 px-2 mb-2">
              Your chats
            </p>
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

        {/* User Actions */}
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
        {isMobileOpen ? <X className="h-6 w-6 text-primary-foreground" /> : <Plus className="h-6 w-6 text-primary-foreground" />}
      </button>

      {/* Mobile sidebar panel */}
      {isMobileOpen && (
        <aside className="md:hidden fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto flex flex-col shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border flex-shrink-0">
            <h2 className="text-lg font-bold text-sidebar-foreground">Menu</h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-3 flex-shrink-0">
            <button className="w-full flex items-center justify-center gap-3 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 px-3 py-2.5 text-sidebar-foreground font-medium text-sm transition-colors">
              <Image src={logos.newChat} alt="New Chat" width={20} height={20} />
              {labels.newChat}
            </button>
          </div>

          <div className="px-3 space-y-2 flex-shrink-0">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <Image src={logos.search} alt="Search" width={16} height={16} />
              {labels.search}
            </button>
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
              <Image src={logos.library} alt="Library" width={16} height={16} />
              {labels.library}
            </button>
          </div>
        </aside>
      )}
    </>
  )
}
