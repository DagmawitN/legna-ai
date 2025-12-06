"use client"

import { useState } from "react"
import { Globe, ChevronRight, Sparkles } from "lucide-react"
import { AppLanguage } from "@/app/components/layout/chat-layout"

interface LanguageModalProps {
  onSelect: (language: AppLanguage) => void
}

const languages = [
  { 
    code: "english" as const, 
    name: "English", 
    flag: "🇺🇸", 
    nativeName: "English",
    description: "Global communication language",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    code: "amharic" as const, 
    name: "አማርኛ", 
    flag: "🇪🇹", 
    nativeName: "Amharic",
    description: "Official language of Ethiopia",
    color: "from-green-500 to-emerald-500"
  },
  { 
    code: "oromigna" as const, 
    name: "Afaan Oromoo", 
    flag: "🇪🇹", 
    nativeName: "Oromigna",
    description: "Most widely spoken language in Ethiopia",
    color: "from-red-500 to-orange-500"
  },
]

export default function LanguageModal({ onSelect }: LanguageModalProps) {
  const [selectedLang, setSelectedLang] = useState<AppLanguage | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSelect = (lang: AppLanguage) => {
    setSelectedLang(lang)
    setIsAnimating(true)
    
    // Animation before selection
    setTimeout(() => {
      onSelect(lang)
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-8 md:p-12 border-b border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">LEGNA AI</span>
                </h1>
                <p className="text-white/70">
                  Choose your language to begin your journey with intelligent assistance
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-white/50">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Powered by AI</span>
            </div>
          </div>
        </div>

        {/* Language Cards */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang.code
              
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  onMouseEnter={() => setSelectedLang(lang.code)}
                  className={`relative group p-6 rounded-2xl bg-gradient-to-br ${lang.color} border-2 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                    isSelected 
                      ? 'border-white scale-105 shadow-2xl' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {/* Selection indicator */}
                  {isSelected && isAnimating && (
                    <div className="absolute inset-0 bg-white/10 animate-ping rounded-2xl"></div>
                  )}
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${lang.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{lang.flag}</span>
                      <ChevronRight className={`h-5 w-5 text-white transform transition-transform duration-300 ${
                        isSelected ? 'translate-x-2' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{lang.name}</h3>
                      <p className="text-white/80 text-sm">{lang.nativeName}</p>
                      <p className="text-white/60 text-xs">{lang.description}</p>
                    </div>
                    
                    {/* Hover/Select indicator */}
                    <div className={`mt-6 h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}>
                      <div className="h-full bg-white animate-pulse"></div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Instruction */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/70 text-sm">
                Your selected language will be saved for future sessions
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/50 text-sm">
              © 2024 LEGNA AI • Ethiopia
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white/30 text-xs">Choose wisely</div>
              <div className="flex gap-1">
                {[1, 2, 3].map((dot) => (
                  <div 
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      selectedLang === languages[dot-1]?.code 
                        ? 'bg-white' 
                        : 'bg-white/20'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}