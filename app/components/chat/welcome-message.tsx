"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Lightbulb, PenTool, TrendingUp } from "lucide-react"

interface WelcomeMessageProps {
  language: "english" | "amharic" | "oromigna"
  onLanguageChange?: (lang: "english" | "amharic" | "oromigna") => void
  onShowAuth?: (mode: "register" | "login") => void
}

const welcomeContent = {
  tigrinya: {
    title: "ምንታይ ሓገዘነካ?",
    subtitle: "ወደ LEGNA-AI እንኳን በደህና መጡ",
    chooseLanguage: "ቋንቋ ምረጽ",
    prompts: ["ስዒሪ ብሙዚቃ ቡሕሪ ምጽሓፍ", "ሮደ መስኮት ብሳይክል ገደል", "ኢትዮጵያዊ ታሪክ ምሕዝናት ምጽሓፍ"],
    askPlaceholder: "ምንዳይ ምሕሳብ",
    attachFile: "Attach File",
  },
  amharic: {
    title: "እንዴት ሊረዳህ ይችላለሁ?",
    subtitle: "ወደ LEGNA-AI እንኳን በደህና መጡ",
    chooseLanguage: "ቋንቋ ምረጽ",
    prompts: ["ከዚህ ወዶ ሴት ሪእሰ ስዔር ጻፈ", "ምግብ ሞቅ ሊሊት ምጽሓፍ", "ሥራ ፍለጋ ምክር ሰጠ"],
    askPlaceholder: "ምንዳይ ምሕሳብ",
    attachFile: "Attach File",
  },
  english: {
    title: "How can I help?",
    subtitle: "Welcome to LEGNA-AI",
    chooseLanguage: "Choose your language",
    prompts: [
      "Help me write a caption for a post",
      "Help me create a social media post",
      "Help me Write a business Proposal",
    ],
    askPlaceholder: "Ask anything",
    attachFile: "Attach File",
  },
}

export default function WelcomeMessage({ language, onLanguageChange, onShowAuth }: WelcomeMessageProps) {
  const content = welcomeContent[language]
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = () => {
    // Trigger file input click
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

  return (
    <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="w-full max-w-2xl sm:max-w-3xl space-y-8 sm:space-y-10 md:space-y-12">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center pt-6 sm:pt-8">
            <div className="flex items-center justify-center">
              <Image 
                src="/assets/logo.svg" 
                alt="LEGNA Logo"  
                width={100} 
                height={48} 
                className="h-12 sm:h-14 md:h-16 w-auto drop-shadow-lg" 
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium tracking-wide px-2">
              {content.subtitle}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight text-center px-2">
            {content.title}
          </h1>

          {/* Main textarea container */}
          <div className="space-y-4 sm:space-y-5">
            <div 
              className={`relative mx-auto w-full rounded-xl sm:rounded-2xl bg-muted border border-border/50 text-sm sm:text-base md:text-lg font-medium hover:border-primary/50 focus-within:border-primary transition-all duration-200 cursor-pointer backdrop-blur-sm max-w-[900px] h-[215px] resize-none overflow-hidden ${
                isDragging ? 'border-primary/50 bg-primary/5' : ''
              }`}
              onClick={() => onShowAuth?.("login")}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                placeholder={content.askPlaceholder}
                disabled
                className="w-full h-full px-4 sm:px-5 pt-4 sm:pt-6 md:pt-8 pb-14 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground/70"
                rows={1}
              />

              {/* Send button - Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onShowAuth?.("login")
                }}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 sm:p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none transition-all duration-200"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Bottom left controls container */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2">
                {/* Language selector button */}
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => {
                      e.stopPropagation()
                      onLanguageChange?.(e.target.value as "tigrinya" | "amharic" | "english")
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background border border-border/50 text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 focus:border-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer backdrop-blur-sm pr-7"
                  >
                    <option value="english">English</option>
                    <option value="amharic">Amharic</option>
                    <option value="tigrinya">Tigrinya</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background border border-border/50 text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 hover:bg-background/80 focus:outline-none transition-all duration-200"
                >
                  <svg 
                    className="h-3 w-3 sm:h-4 sm:w-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="hidden sm:inline">{content.attachFile}</span>
                </button>
              </div>

              {/* Drag overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <svg 
                      className="h-8 w-8 sm:h-10 sm:w-10 mx-auto text-primary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm sm:text-base font-medium text-primary">Drop files here</p>
                  </div>
                </div>
              )}
            </div>

            {/* File upload hint */}
            <p className="text-xs text-muted-foreground/60 text-center px-2">
              Drag and drop files here or click the attach button above. Supported: images, PDF, DOC, TXT
            </p>
          </div>

          {/* Suggested prompts section */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto w-full px-2 sm:px-0">
            <p className="text-xs sm:text-sm text-muted-foreground/70 font-semibold px-2">Suggested prompts</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {content.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onShowAuth?.("login")}
                  className={`group p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-border/50 text-foreground text-xs sm:text-sm md:text-base font-medium transition-all duration-300 text-left hover:border-primary/50 hover:scale-105 active:scale-95 backdrop-blur-sm overflow-hidden relative min-h-[100px] sm:min-h-[120px] ${
                    index === 0 ? "bg-card hover:bg-card/80" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl md:text-2xl">✨</span>
                    {prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      {/* --- Footer Branding (Fixed - Now cleared by pb-20) --- */}
      <div className="fixed bottom-6 text-xs text-muted-foreground/50 font-mono uppercase tracking-widest z-10">
        Legna AI • Ethiopia
      </div>
    </div>
  )
}