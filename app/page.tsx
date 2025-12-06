"use client"

import { useState } from "react"
import ChatLayout from "@/app/components/layout/chat-layout"
import LanguageSelector from "@/app/components/modals/language-modal"
import { useAuth } from "@/app/context/auth-context"

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth()
  const [language, setLanguage] = useState<"english" | "amharic" | "oromigna" | "tigrinya">("english")
  const [languageSelected, setLanguageSelected] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleLanguageSelect = (lang: "english" | "amharic" | "oromigna" | "tigrinya") => {
    setLanguage(lang)
    setLanguageSelected(true)
  }

  const handleLanguageChange = (lang: "english" | "amharic" | "oromigna" | "tigrinya") => {
    setLanguage(lang)
  }

  const handleShowSettings = () => {
    setShowSettings(true)
  }

  const handleLogout = () => {
    logout()
    // You might want to redirect to home or show language selector
  }

  if (!languageSelected) {
    return <LanguageSelector onSelect={handleLanguageSelect} />
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