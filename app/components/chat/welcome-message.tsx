"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowUp, Paperclip, Sparkles, Zap, MessageSquare, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface WelcomeMessageProps {
  language: "english" | "amharic" | "oromigna"
  onLanguageChange?: (lang: "english" | "amharic" | "oromigna") => void
  onShowAuth?: (mode: "register" | "login") => void
}

const welcomeContent = {
  amharic: {
    title: "እንዴት ሊረዳህ ይችላለሁ?",
    subtitle: "ወደ LEGNA-AI እንኳን በደህና መጡ",
    chooseLanguage: "ቋንቋ ምረጽ",
    prompts: [
      { text: "ከዚህ ወዶ ሴት ሪእሰ ስዔር ጻፈ", icon: "✍️" },
      { text: "ምግብ ሞቅ ሊሊት ምጽሓፍ", icon: "📝" },
      { text: "ሥራ ፍለጋ ምክር ሰጠ", icon: "💼" },
    ],
    askPlaceholder: "ምንዳይ ምሕሳብ",
    attachFile: "ፋይል አያይዝ",
  },
  english: {
    title: "How can I help you today?",
    subtitle: "Welcome to LEGNA-AI",
    chooseLanguage: "Choose your language",
    prompts: [
      { text: "Help me write a caption for a post", icon: "📱" },
      { text: "Help me create a social media post", icon: "💬" },
      { text: "Help me Write a business Proposal", icon: "📊" },
    ],
    askPlaceholder: "Ask anything...",
    attachFile: "Attach File",
  },
  oromigna: {
    title: "Akkam si gargaaru?",
    subtitle: "Baga nagaan dhuftan LEGNA-AI",
    chooseLanguage: "Afaan filadhu",
    prompts: [
      { text: "Maqaa post koo qorachuu na gargaari", icon: "✍️" },
      { text: "Post media hawaasaa uumu na gargaari", icon: "📱" },
      { text: "Ka'umsa daldalaa barreessuu na gargaari", icon: "💼" },
    ],
    askPlaceholder: "Waan hunda gaafadhu...",
    attachFile: "Faayili maxxansisi",
  },
}

export default function WelcomeMessage({ language, onLanguageChange, onShowAuth }: WelcomeMessageProps) {
  const content = welcomeContent[language]
  const [isDragging, setIsDragging] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleFileUpload = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt'
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        onShowAuth?.("login")
      }
    }
    fileInput.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onShowAuth?.("login")
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleSend = () => {
    if (inputValue.trim()) {
      onShowAuth?.("login")
    }
  }

  const navigateHome = () => {
    router.push('/')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white scrollbar-hide">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="w-full max-w-4xl space-y-8 sm:space-y-10 md:space-y-12">
          {/* Header with animated logo */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center pt-6 sm:pt-8">
            <button
              onClick={navigateHome}
              className="flex items-center justify-center group cursor-pointer relative"
              title="Go to Home"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <Image 
                src="/assets/logo.svg" 
                alt="LEGNA Logo"  
                width={120} 
                height={60} 
                className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-xl group-hover:scale-110 transition-all duration-300 relative z-10" 
              />
            </button>
            <div className="space-y-2">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium tracking-wide px-2">
                {content.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-blue-600 font-medium">Powered by AI</span>
              </div>
            </div>
          </div>

          {/* Main heading with gradient */}
          <div className="text-center px-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {content.title}
            </h1>
          </div>

          {/* Main input area with glassmorphism effect */}
          <div className="space-y-4">
            <div 
              className={`relative mx-auto w-full rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer max-w-3xl h-[220px] resize-none overflow-hidden shadow-xl ${
                isDragging 
                  ? 'border-blue-500/50 bg-blue-50/50 shadow-blue-200' 
                  : 'border-gray-200/50 hover:border-blue-300/50 hover:shadow-2xl'
              }`}
              onClick={() => onShowAuth?.("login")}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
              
              <textarea
                placeholder={content.askPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled
                className="w-full h-full px-5 sm:px-6 pt-5 sm:pt-6 md:pt-8 pb-16 bg-transparent border-none outline-none resize-none text-gray-900 placeholder:text-gray-400/70 text-lg font-medium relative z-10"
                rows={1}
              />

              {/* Send button with animation */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleSend()
                }}
                disabled={!inputValue.trim()}
                className={`absolute right-4 top-4 p-3 rounded-xl transition-all duration-300 group ${
                  inputValue.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <ArrowUp className={`h-5 w-5 transform transition-transform duration-300 ${
                  inputValue.trim() 
                    ? 'text-white group-hover:scale-110' 
                    : 'text-gray-400'
                }`} />
              </button>

              {/* Bottom controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Language selector */}
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => {
                        onLanguageChange?.(e.target.value as "english" | "amharic" | "oromigna")
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-900 text-sm font-medium hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-all duration-300 appearance-none cursor-pointer pr-10 shadow-sm"
                    >
                      <option value="english">🇺🇸 English</option>
                      <option value="amharic">🇪🇹 Amharic</option>
                      <option value="oromigna">🇪🇹 Oromigna</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* File attachment button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFileUpload()
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-900 text-sm font-medium hover:border-blue-300 hover:bg-white/90 focus:outline-none transition-all duration-300 group"
                    aria-label="Attach file"
                  >
                    <Paperclip className="h-4 w-4 text-gray-600 group-hover:text-blue-500 transition-colors" />
                    <span className="hidden sm:inline">{content.attachFile}</span>
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  Press Enter to send • Shift + Enter for new line
                </div>
              </div>

              {/* Drag overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-blue-600">Drop files here</p>
                      <p className="text-sm text-blue-500/70 mt-1">Supports images, PDF, DOC, TXT</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* File upload hint */}
            <p className="text-xs text-gray-400/60 text-center px-2">
              Drag and drop files here or click the attach button. Max file size: 10MB
            </p>
          </div>

          {/* Suggested prompts section */}
          <div className="space-y-4 max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-semibold text-gray-700">Suggested prompts</p>
              </div>
              <div className="text-xs text-gray-400">
                Click to try
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt.text)}
                  className="group p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 text-gray-800 text-sm font-medium transition-all duration-300 text-left hover:border-blue-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm overflow-hidden relative"
                  aria-label={`Use prompt: ${prompt.text}`}
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-500 rounded-2xl"></div>
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{prompt.icon}</span>
                      <span className="text-lg sm:text-xl md:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
                    </div>
                    <p className="leading-relaxed">{prompt.text}</p>
                    <div className="flex items-center text-blue-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Try this</span>
                      <ArrowUp className="h-3 w-3 ml-1 transform rotate-90" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="max-w-3xl mx-auto w-full pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Multilingual Support</h4>
                <p className="text-xs text-gray-600">Chat in English, Amharic & Oromigna</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-500" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">File Support</h4>
                <p className="text-xs text-gray-600">Upload images, PDFs, Docs & more</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Smart AI</h4>
                <p className="text-xs text-gray-600">Context-aware responses</p>
              </div>
            </div>
          </div>

          {/* Footer branding */}
          <div className="pt-12 pb-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400/50 font-mono uppercase tracking-widest px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-50/50 border border-gray-200/30">
              <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span>Legna AI • Ethiopia</span>
              <div className="w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}