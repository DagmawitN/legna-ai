"use client"

import { Settings, LogOut, X, Plus, Search, BookOpen, MessageSquare, ChevronRight, Moon, Sun, Bell, HelpCircle, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

import { AppLanguage } from "@/app/components/layout/chat-layout"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  language: AppLanguage
  onShowSettings: () => void
  onLogout: () => void
  isAuthenticated: boolean
  userName?: string
  userEmail?: string
  chatHistory?: Array<{ id: string; title: string; date: string }>
  onNewChat?: () => void
  onSelectChat?: (chatId: string) => void
  onOpenLanguageModal?: () => void
}

const sidebarLabels = {
  english: {
    newChat: "New Chat",
    search: "Search",
    library: "Library",
    history: "History",
    settings: "Settings",
    logout: "Logout",
    today: "Today",
    yesterday: "Yesterday",
    previous7Days: "Previous 7 Days",
    theme: "Theme",
    help: "Help & Support",
    changeLanguage: "Change Language",
  },
  amharic: {
    newChat: "አዲስ ውይይት",
    search: "ፈልግ",
    library: "ቤተ-መፃህፍት",
    history: "ታሪክ",
    settings: "ቅንብሮች",
    logout: "ውጣ",
    today: "ዛሬ",
    yesterday: "ትላንትና",
    previous7Days: "ቀዳሚ 7 ቀናት",
    theme: "ገጽታ",
    help: "እገዛ እና ድጋፍ",
    changeLanguage: "ቋንቋ ቀይር",
  },
  oromigna: {
    newChat: "Waliigala haaraa",
    search: "Barbaadi",
    library: "Maktabaa",
    history: "Seenaa",
    settings: "Qindaa'inoota",
    logout: "Ba'i",
    today: "Har'a",
    yesterday: "Kaleessa",
    previous7Days: "Guyyoota 7 duraanii",
    theme: "Mallattoo",
    help: "Gargaarsa fi deeggarsa",
    changeLanguage: "Afaan jijjiiri",
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
  userEmail,
  chatHistory = [],
  onNewChat,
  onSelectChat,
  onOpenLanguageModal,
}: SidebarProps) {
  const labels = sidebarLabels[language]
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeItem, setActiveItem] = useState<string | null>(null)

  // Group chats by date
  const groupedChats = {
    today: chatHistory.filter(chat => {
      const chatDate = new Date(chat.date)
      const today = new Date()
      return chatDate.toDateString() === today.toDateString()
    }),
    yesterday: chatHistory.filter(chat => {
      const chatDate = new Date(chat.date)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return chatDate.toDateString() === yesterday.toDateString()
    }),
    previous: chatHistory.filter(chat => {
      const chatDate = new Date(chat.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return chatDate < weekAgo
    })
  }

  const handleChatSelect = (chatId: string) => {
    setActiveItem(chatId)
    onSelectChat?.(chatId)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you would update the theme here
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      {/* Desktop/Tablet sidebar */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-500 h-screen overflow-hidden relative ${
          isOpen 
            ? "w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl" 
            : "w-20 bg-gradient-to-b from-gray-800 to-gray-900"
        }`}
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Header with logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50 flex-shrink-0 relative">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">LEGNA AI</h1>
                <p className="text-xs text-gray-400">Intelligent Assistant</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
          )}
          
          <button
            onClick={onToggle}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 hover:scale-110 ${
              isOpen 
                ? "bg-gray-700/50 hover:bg-gray-700 text-gray-300" 
                : "bg-gray-700/30 hover:bg-gray-700/50 text-gray-400"
            }`}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 flex-shrink-0">
          <button 
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white font-medium text-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="relative">
              <Plus className="h-5 w-5 transform group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
            </div>
            {isOpen && (
              <>
                <span className="flex-1 text-left">{labels.newChat}</span>
                <div className="px-2 py-1 text-xs bg-white/20 rounded-lg">⌘N</div>
              </>
            )}
          </button>
        </div>

        {/* Search Bar (only when open) */}
        {isOpen && (
          <div className="px-4 mb-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={labels.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div className="px-4 space-y-1 flex-shrink-0">
          {isOpen && (
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Access</h3>
            </div>
          )}
          
          <button 
            onClick={() => setActiveItem('library')}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 group ${
              activeItem === 'library' 
                ? 'bg-blue-500/20 text-blue-400 border-l-4 border-blue-500' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              activeItem === 'library' 
                ? 'bg-blue-500/30' 
                : 'bg-gray-700/50 group-hover:bg-gray-700'
            }`}>
              <BookOpen className="h-4 w-4" />
            </div>
            {isOpen && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{labels.library}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>

          {isOpen && onOpenLanguageModal && (
            <button 
              onClick={onOpenLanguageModal}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-all duration-300">
                <Globe className="h-4 w-4" />
              </div>
              <span className="flex-1 text-left text-sm font-medium">{labels.changeLanguage}</span>
              <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        {/* Chat History */}
        {isOpen && (groupedChats.today.length > 0 || groupedChats.yesterday.length > 0 || groupedChats.previous.length > 0) && (
          <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
            <div className="space-y-6">
              {/* Today */}
              {groupedChats.today.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.today}</h3>
                  <div className="space-y-1">
                    {groupedChats.today.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                          activeItem === chat.id 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activeItem === chat.id ? 'bg-blue-500' : 'bg-gray-600 group-hover:bg-gray-500'
                            }`}></div>
                            <span className="text-sm truncate flex-1">{chat.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{chat.date}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Yesterday */}
              {groupedChats.yesterday.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.yesterday}</h3>
                  <div className="space-y-1">
                    {groupedChats.yesterday.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                          activeItem === chat.id 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate flex-1">{chat.title}</span>
                          <span className="text-xs text-gray-500">{chat.date}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous */}
              {groupedChats.previous.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.previous7Days}</h3>
                  <div className="space-y-1">
                    {groupedChats.previous.slice(0, 5).map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                          activeItem === chat.id 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate flex-1">{chat.title}</span>
                          <span className="text-xs text-gray-500">{chat.date}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Actions & User Info */}
        <div className="border-t border-gray-700/50 p-4 space-y-3 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-all duration-300">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </div>
            {isOpen && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{labels.theme}</span>
                <div className={`w-10 h-6 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-all duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-1'} mt-1`}></div>
                </div>
              </>
            )}
          </button>

          {/* Help & Support */}
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 group">
            <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-all duration-300">
              <HelpCircle className="h-4 w-4" />
            </div>
            {isOpen && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{labels.help}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onShowSettings}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gray-700/50 group-hover:bg-gray-700 transition-all duration-300">
              <Settings className="h-4 w-4" />
            </div>
            {isOpen && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{labels.settings}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>

          {/* User Info & Logout */}
          {isAuthenticated && (
            <div className="pt-3 border-t border-gray-700/30">
              <div className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${isOpen ? 'bg-gray-800/30' : 'justify-center'}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">
                      {(userName || userEmail || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
                </div>
                
                {isOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{userName}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                  </div>
                )}
                
                <button
                  onClick={onLogout}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isOpen 
                      ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' 
                      : 'text-gray-500 hover:text-red-400'
                  }`}
                  title={labels.logout}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Version info */}
        {isOpen && (
          <div className="px-4 py-2 border-t border-gray-700/30">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>v1.0.0</span>
              <span>•</span>
              <span className="text-green-400">Online</span>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile sidebar toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
        {isMobileOpen ? (
          <X className="h-6 w-6 text-white relative z-10" />
        ) : (
          <Plus className="h-6 w-6 text-white relative z-10 transform group-hover:rotate-90 transition-transform duration-300" />
        )}
      </button>

      {/* Mobile sidebar panel */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="md:hidden fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-gray-900 to-gray-800 z-50 overflow-y-auto flex flex-col shadow-2xl animate-slideIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">LEGNA AI</h2>
                  <p className="text-sm text-gray-400">Intelligent Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
              >
                <X className="h-5 w-5 mx-auto" />
              </button>
            </div>

            {/* Mobile content - similar to desktop but optimized for mobile */}
            <div className="p-4 flex-1">
              {/* Similar content structure as desktop but mobile optimized */}
              {/* You can reuse the same components */}
            </div>
          </aside>
        </>
      )}
    </>
  )
}