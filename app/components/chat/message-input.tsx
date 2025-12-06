"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  language: "english" | "amharic" | "oromigna"
  disabled?: boolean
  isAuthenticated: boolean
  onShowAuth?: (mode: "register" | "login") => void
  onLanguageChange?: (lang: "english" | "amharic" | "oromigna") => void
}

const messageContent = {
  tigrinya: {
    askPlaceholder: "ምንዳይ ምሕሳብ",
    attachFile: "ፋይል ኣእትይ",
  },
  amharic: {
    askPlaceholder: "ማንኛውንም ጥያቄ ጠይቁ",
    attachFile: "ፋይል አያይዝ",
  },
  english: {
    askPlaceholder: "Ask anything",
    attachFile: "Attach File",
  },
}

export default function MessageInput({
  onSendMessage,
  language,
  disabled = false,
  isAuthenticated,
  onShowAuth,
  onLanguageChange,
}: MessageInputProps) {
  const content = messageContent[language]
  const [inputValue, setInputValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleFileUpload = () => {
    if (!isAuthenticated && onShowAuth) {
      onShowAuth("login")
      return
    }
    
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt'
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        // Handle file upload for authenticated users
        if (isAuthenticated) {
          // You can process files here or send them with message
          console.log("Files uploaded:", files)
        }
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
    if (files.length > 0 && isAuthenticated) {
      console.log("Files dropped:", files)
    } else if (files.length > 0 && !isAuthenticated && onShowAuth) {
      onShowAuth("login")
    }
  }

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputClick = () => {
    if (!isAuthenticated && onShowAuth) {
      onShowAuth("login")
    }
  }

  return (
    <div className="border-t border-border/30 bg-background/50 backdrop-blur-sm px-4 py-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-4">
          <div 
            className={`relative w-full rounded-xl sm:rounded-2xl bg-muted border border-border/50 text-sm sm:text-base md:text-lg font-medium hover:border-primary/50 focus-within:border-primary transition-all duration-200 backdrop-blur-sm resize-none overflow-hidden min-h-[120px] ${
              isDragging ? 'border-primary/50 bg-primary/5' : ''
            } ${!isAuthenticated ? 'cursor-pointer opacity-90 hover:border-amber-500/50' : ''}`}
            onClick={handleInputClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isAuthenticated ? content.askPlaceholder : "Please login to send messages..."}
              disabled={disabled || !isAuthenticated}
              className="w-full h-full px-4 sm:px-5 pt-4 sm:pt-6 md:pt-8 pb-14 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed min-h-[120px] max-h-[300px]"
              rows={1}
            />

            {/* Send button - Top Right with ArrowUp icon */}
            <button
              onClick={handleSend}
              disabled={disabled || !inputValue.trim() || !isAuthenticated}
              className={`absolute right-3 top-3 sm:right-4 sm:top-4 p-2.5 sm:p-3 rounded-lg text-primary-foreground hover:bg-primary/90 focus:outline-none transition-all duration-200 group ${
                isAuthenticated && inputValue.trim() && !disabled
                  ? 'bg-primary cursor-pointer hover:scale-105' 
                  : 'bg-gray-400 cursor-not-allowed opacity-70'
              }`}
              aria-label="Send message"
            >
              <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 transform group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Bottom left controls container */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2">
              {/* Language selector button - only show if onLanguageChange provided */}
              {onLanguageChange && (
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => {
                      onLanguageChange(e.target.value as "english" | "amharic" | "oromigna")
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background border border-border/50 text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 focus:border-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer backdrop-blur-sm pr-7"
                  >
                    <option value="english">English</option>
                    <option value="amharic">Amharic</option>
                    <option value="oromigna">Oromigna</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              )}

              {/* File attachment button */}
              <button
                onClick={handleFileUpload}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-background border text-foreground text-xs sm:text-sm font-medium focus:outline-none transition-all duration-200 ${
                  isAuthenticated 
                    ? 'border-border/50 hover:border-primary/50 hover:bg-background/80 cursor-pointer' 
                    : 'border-gray-300 cursor-not-allowed opacity-70'
                }`}
                aria-label={isAuthenticated ? "Attach file" : "Login to attach files"}
                disabled={!isAuthenticated}
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
                  <p className="text-sm sm:text-base font-medium text-primary">
                    {isAuthenticated ? "Drop files here" : "Login to upload files"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File upload hint */}
          <p className="text-xs text-muted-foreground/60 text-center px-2">
            {isAuthenticated 
              ? "Drag and drop files here or click the attach button above. Supported: images, PDF, DOC, TXT"
              : "Please login to send messages and upload files"}
          </p>
        </div>

        {/* Suggested prompts for authenticated users */}
        {isAuthenticated && (
          <div className="space-y-3 sm:space-y-4 mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground/70 font-semibold px-2">Quick prompts</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {messageContent[language].prompts?.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(prompt)}
                  disabled={disabled}
                  className={`p-3 sm:p-4 rounded-lg border border-border/50 text-foreground text-xs sm:text-sm font-medium transition-all duration-300 text-left hover:border-primary/50 hover:scale-105 active:scale-95 backdrop-blur-sm ${
                    index === 0 ? "bg-card hover:bg-card/80" : "bg-muted hover:bg-muted/80"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    {prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}