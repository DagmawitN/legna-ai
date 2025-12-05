"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { WelcomeScreen } from "@/components/welcome-screen"

export function LegnaApp() {
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} onLanguageChange={setSelectedLanguage} />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar language={selectedLanguage} onLanguageChange={setSelectedLanguage} />
      <ChatInterface language={selectedLanguage} />
    </div>
  )
}
