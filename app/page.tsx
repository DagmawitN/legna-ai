"use client"

import { useEffect, useState } from "react"
import LanguageModal from "@/app/components/modals/language-modal"
import AuthModal from "@/app/components/modals/auth-modal"
import SettingsModal from "@/app/components/modals/settings-modal"
import ChatLayout from "@/app/components/layout/chat-layout"

type AuthState = "unauthenticated" | "authenticating" | "authenticated"
type AuthMode = "register" | "login"

export default function Home() {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("register")
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [authState, setAuthState] = useState<AuthState>("unauthenticated")
  const [selectedLanguage, setSelectedLanguage] = useState<"tigrinya" | "amharic" | "english">("english")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [languageSelected, setLanguageSelected] = useState(false)

  useEffect(() => {
    // Check if user is logged in and language is selected
    const token = localStorage.getItem("token")
    const savedLanguage = localStorage.getItem("language") as "tigrinya" | "amharic" | "english" | null
    const savedUser = localStorage.getItem("user")

    if (savedLanguage) {
      setSelectedLanguage(savedLanguage)
      setLanguageSelected(true)
    } else {
      setShowLanguageModal(true)
    }

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setAuthState("authenticated")
    }

    setIsLoading(false)
  }, [])

  const handleLanguageSelect = (lang: "tigrinya" | "amharic" | "english") => {
    setSelectedLanguage(lang)
    localStorage.setItem("language", lang)
    setLanguageSelected(true)
    setShowLanguageModal(false)
  }

  const handleLanguageChange = (lang: "tigrinya" | "amharic" | "english") => {
    setSelectedLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const handleAuthSuccess = (userData: any, token: string) => {
    setUser(userData)
    setAuthState("authenticated")
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    setAuthState("unauthenticated")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const handleShowAuth = (mode: AuthMode = "register") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="space-y-3 text-center">
          <div className="text-2xl font-bold text-foreground">LEGNA</div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {showLanguageModal && <LanguageModal onSelect={handleLanguageSelect} />}
      {showAuthModal && (
        <AuthModal
          language={selectedLanguage}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          mode={authMode}
        />
      )}
      {showSettingsModal && user && (
        <SettingsModal
          user={user}
          language={selectedLanguage}
          onClose={() => setShowSettingsModal(false)}
          onLanguageChange={handleLanguageChange}
        />
      )}
      <ChatLayout
        isAuthenticated={authState === "authenticated"}
        user={user}
        language={selectedLanguage}
        onShowAuth={handleShowAuth}
        onShowSettings={() => setShowSettingsModal(true)}
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
        languageSelected={languageSelected}
      />
    </>
  )
}
