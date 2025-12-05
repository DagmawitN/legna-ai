"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ChatMessageProps {
  message: {
    id: string
    type: "user" | "assistant"
    content: string
    timestamp: Date
  }
  language: string
}

export function ChatMessage({ message, language }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.type === "user"

  return (
    <div className={`chat-message flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
          <span className="text-xs font-bold text-secondary">L</span>
        </div>
      )}

      <div className={`max-w-2xl ${isUser ? "flex justify-end" : ""}`}>
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {!isUser && (
          <div className="flex items-center gap-2 mt-2 ml-3">
            <button
              onClick={handleCopy}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  {language === "en" ? "Copied" : language === "am" ? "ាចងក្រង" : "ገዝየ"}
                </>
              ) : (
                <>
                  <Copy size={14} />
                  {language === "en" ? "Copy" : language === "am" ? "ចងក្រង" : "ገዝወ"}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary-foreground">U</span>
        </div>
      )}
    </div>
  )
}
