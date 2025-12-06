"use client"

import { Globe } from "lucide-react"
import { AppLanguage } from "@/app/components/layout/chat-layout"

interface LanguageModalProps {
  onSelect: (language: AppLanguage) => void
}

const languages = [
  { code: "english" as const, name: "English", flag: "🌐", nativeName: "English" },
  { code: "amharic" as const, name: "አማርኛ", flag: "🇪🇹", nativeName: "Amharic" },
  { code: "oromigna" as const, name: "Afaan Oromoo", flag: "🇪🇹", nativeName: "Oromigna" },
]

export default function LanguageModal({ onSelect }: LanguageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Select Language</h1>
        </div>

        <p className="mb-6 text-center text-muted-foreground">Choose your preferred language to get started</p>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-4 text-left transition-all hover:border-primary hover:bg-primary hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-foreground">{lang.name}</span>
                  <span className="text-sm text-muted-foreground">{lang.nativeName}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          You can change the language later in the settings
        </p>
      </div>
    </div>
  )
}