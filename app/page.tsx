"use client"

import { useState, useEffect } from "react"
import ChatLayout from "@/app/components/layout/chat-layout"
import LanguageModal from "@/app/components/modals/language-modal"
import { useAuth } from "@/app/context/auth-context"
import type { AppLanguage } from "@/app/components/layout/chat-layout"

export default function Home() {
  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth()
  const [language, setLanguage] = useState<AppLanguage>("english")
  const [languageSelected, setLanguageSelected] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // Check localStorage for previously selected language
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem("legna_selected_language") as AppLanguage
      const savedLanguageSelected = localStorage.getItem("legna_language_selected") === "true"
      
      if (savedLanguage && ["english", "amharic", "oromigna"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
      
      if (savedLanguageSelected) {
        setLanguageSelected(true)
      }
    }
  }, [])

  // If user is authenticated, they should go directly to chat
  useEffect(() => {
    if (isAuthenticated && !languageSelected) {
      const savedLanguage = localStorage.getItem("legna_selected_language") as AppLanguage
      if (savedLanguage) {
        setLanguage(savedLanguage)
        setLanguageSelected(true)
      }
    }
  }, [isAuthenticated, languageSelected])

  const handleLanguageSelect = (lang: AppLanguage) => {
    setLanguage(lang)
    setLanguageSelected(true)
    localStorage.setItem("legna_selected_language", lang)
    localStorage.setItem("legna_language_selected", "true")
  }

  const handleLanguageChange = (lang: AppLanguage) => {
    setLanguage(lang)
    localStorage.setItem("legna_selected_language", lang)
  }

  const handleShowSettings = () => {
    setShowSettings(true)
  }

  const handleLogout = () => {
    logout()
    // Keep language selection after logout
    localStorage.setItem("legna_language_selected", "true")
  }

  // Show loading while auth state is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show language selector only if not authenticated AND language not selected
  if (!languageSelected && !isAuthenticated) {
    return <LanguageModal onSelect={handleLanguageSelect} />
  }

  return (
    <ChatLayout
      isAuthenticated={isAuthenticated}
      user={user}
      language={language}
      onShowSettings={handleShowSettings}
      onLogout={handleLogout}
      onLanguageChange={handleLanguageChange}
      languageSelected={languageSelected}
    />
  )
}