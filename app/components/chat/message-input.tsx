"use client"

import type React from "react"
import { useState } from "react"
import { Send, Mic } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  language: "tigrinya" | "amharic" | "english"
  disabled: boolean
  isAuthenticated: boolean
}

const placeholders = {
  tigrinya: "ምንታይ ሓገዘነካ?",
  amharic: "ምንድን ሓልፊ ይኹን?",
  english: "Ask anything...",
}

const loginPrompts = {
  tigrinya: "ርክብ ምስ ምዝላም ሀጋዙ",
  amharic: "ወደ ውይይት ለመጀመር ግባ",
  english: "Sign in to start chatting",
}

export default function MessageInput({ onSendMessage, language, disabled, isAuthenticated }: MessageInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSendMessage(input)
    setInput("")
  }

  return (
    <div className="flex-shrink-0 border-t border-border bg-background p-4 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-3">
        {/* Remove flex-1 and use fixed width/height */}
        <div className="flex items-center gap-2 rounded-full bg-input border border-border px-4 py-3 hover:border-primary/50 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary w-[900px] h-[215px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isAuthenticated ? placeholders[language] : loginPrompts[language]}
            disabled={disabled}
            // Make the input fill the entire container
            className="w-full h-full bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-sm px-2"
          />
          <button type="button" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="h-4 w-4" />
          </button>
        </div>

        <button
          type="submit"
          disabled={disabled || !input.trim() || !isAuthenticated}
          className="rounded-full bg-primary p-3 text-primary-foreground hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}