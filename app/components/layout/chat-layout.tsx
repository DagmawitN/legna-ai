"use client"

import { useState, useRef, useEffect } from "react"
import Sidebar from "@/app/components/layout/sidebar"
import Topbar from "@/app/components/layout/topbar"
import ChatPanel from "@/app/components/chat/chat-panel"
import WelcomeMessage from "@/app/components/chat/welcome-message"
import MessageInput from "@/app/components/chat/message-input"
import AuthModal from "@/app/components/modals/auth-modal"

interface ChatLayoutProps {
  isAuthenticated: boolean
  user: any
  language: "english" | "amharic" | "oromigna" | "tigrinya"
  onShowSettings: () => void
  onLogout: () => void
  onLanguageChange: (lang: "english" | "amharic" | "oromigna" | "tigrinya") => void
  languageSelected: boolean
}

export default function ChatLayout({
  isAuthenticated,
  user,
  language,
  onShowSettings,
  onLogout,
  onLanguageChange,
  languageSelected,
}: ChatLayoutProps) {
  const [messages, setMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string }>>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"register" | "login">("login")
  const [currentUser, setCurrentUser] = useState(user)
  const [currentIsAuthenticated, setCurrentIsAuthenticated] = useState(isAuthenticated)
  
  const chatPanelRef = useRef<HTMLDivElement>(null)

  // Update local state when props change
  useEffect(() => {
    setCurrentUser(user)
    setCurrentIsAuthenticated(isAuthenticated)
  }, [user, isAuthenticated])

  useEffect(() => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleShowAuth = (mode: "register" | "login") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleAuthSuccess = (userData: any, token: string) => {
    // Store token in localStorage
    localStorage.setItem("legna_auth_token", token)
    localStorage.setItem("legna_user_data", JSON.stringify(userData))
    
    // Update state
    setCurrentUser(userData)
    setCurrentIsAuthenticated(true)
    
    // Close modal
    setShowAuthModal(false)
    
    // You might want to refresh the page or update parent component
    window.location.reload()
  }

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("legna_auth_token")
    localStorage.removeItem("legna_user_data")
    
    // Update state
    setCurrentUser(null)
    setCurrentIsAuthenticated(false)
    
    // Call parent logout
    onLogout()
  }

  const handleSendMessage = async (message: string) => {
    if (!currentIsAuthenticated) {
      handleShowAuth("login")
      return
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: message,
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const token = localStorage.getItem("legna_auth_token")
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message,
          language,
          businessName: currentUser?.businessType,
          userId: currentUser?.id,
        }),
      })

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: data.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Sorry, something went wrong. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {currentIsAuthenticated && (
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          language={language}
          onShowSettings={onShowSettings}
          onLogout={handleLogout}
          isAuthenticated={currentIsAuthenticated}
          userName={currentUser?.fullName || currentUser?.email}
        />
      )}

      {!currentIsAuthenticated && (
        <div className="w-20 bg-sidebar border-r border-sidebar-border flex-shrink-0 flex flex-col items-center py-3 space-y-3">
          {/* Logo Icon */}
          <button 
            onClick={() => handleShowAuth("login")}
            className="w-10 h-10 rounded-lg hover:bg-sidebar-accent/50 transition-colors flex items-center justify-center group"
          >
            <svg className="h-5 w-5 text-sidebar-foreground group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>

          {/* Divider */}
          <div className="w-8 h-px bg-sidebar-border/30" />
          
          {/* Login hint */}
          <div className="text-[10px] text-sidebar-foreground/50 text-center px-2 rotate-90 mt-8">
            Click to login
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {!currentIsAuthenticated && languageSelected && (
          <div className="flex items-center justify-between border-b border-border/30 bg-background/50 px-4 py-3 md:px-6 flex-shrink-0 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-foreground">LEGNA</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleShowAuth("login")}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleShowAuth("register")}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-opacity-90 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        {currentIsAuthenticated && (
          <Topbar
            isAuthenticated={currentIsAuthenticated}
            user={currentUser}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {!currentIsAuthenticated && languageSelected ? (
            <WelcomeMessage 
              language={language} 
              onLanguageChange={onLanguageChange} 
              onShowAuth={handleShowAuth} 
            />
          ) : currentIsAuthenticated ? (
            <>
              <ChatPanel
                ref={chatPanelRef}
                messages={messages}
                isAuthenticated={currentIsAuthenticated}
                language={language}
                isLoading={isLoading}
              />

              <MessageInput
                onSendMessage={handleSendMessage}
                language={language}
                disabled={isLoading}
                isAuthenticated={currentIsAuthenticated}
                onShowAuth={handleShowAuth}
                onLanguageChange={onLanguageChange}
              />
            </>
          ) : null}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          language={language}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          mode={authMode}
        />
      )}
    </div>
  )
}