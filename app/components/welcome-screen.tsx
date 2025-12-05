"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface WelcomeScreenProps {
  onStart: () => void
  onLanguageChange: (lang: string) => void
}

export function WelcomeScreen({ onStart, onLanguageChange }: WelcomeScreenProps) {
  const [selectedLang, setSelectedLang] = useState("en")

  const languages = [
    { code: "en", name: "English" },
    { code: "am", name: "አማርኛ" },
    { code: "ti", name: "ትግርኛ" },
  ]

  const content = {
    en: {
      greeting: "Welcome to Legna AI",
      subtitle: "Your Multilingual Business Assistant",
      cta: "Get Started",
      selectLanguage: "Select Your Language",
      user: "Tsion Birhanu",
      plan: "Free",
      upgradeText: "Upgrade",
    },
    am: {
      greeting: "ወደ ለግና ኢ.አይ እንኳን ደህና መጡ",
      subtitle: "የእርስዎ ብዙ ቋንቋ ሥራ ረዳት",
      cta: "ጀምር",
      selectLanguage: "ቋንቋ ይምረጡ",
      user: "ጺዮን ብርሃኑ",
      plan: "ነጻ",
      upgradeText: "ሰፊ",
    },
    ti: {
      greeting: "ናብ ለግና ኤ.አይ ብሓወይ መጻወትኩ",
      subtitle: "ብዙ-ቋንቋ ስራ ረዳት",
      cta: "ጀምር",
      selectLanguage: "ቋንቋ ምረጫ",
      user: "ጺዮን ብርሃኑ",
      plan: "ነጻ",
      upgradeText: "ሰፊ",
    },
  }

  const currentContent = content[selectedLang as keyof typeof content] || content.en

  const handleStart = () => {
    onLanguageChange(selectedLang)
    onStart()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary border-r border-border flex flex-col">
          <div className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-secondary font-bold">L</span>
              </div>
              <span className="font-semibold text-foreground text-sm">Legna AI</span>
            </div>
          </div>

          <div className="flex-1" />

          {/* User card at bottom */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                <span className="text-xs font-semibold text-foreground">T</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{currentContent.user}</p>
                <p className="text-xs text-muted-foreground">{currentContent.plan}</p>
              </div>
            </div>
            <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/80 text-sm h-9">
              {currentContent.upgradeText}
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center space-y-12">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-secondary font-bold text-4xl">L</span>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-light text-foreground">{currentContent.greeting}</h1>
              <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
            </div>

            {/* Language Selection */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground">{currentContent.selectLanguage}</p>
              <div className="flex gap-3 justify-center">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      selectedLang === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground hover:bg-card/80"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleStart}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/80 text-lg h-12 px-8 gap-2 rounded-lg"
            >
              {currentContent.cta}
              <ArrowRight size={20} />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
