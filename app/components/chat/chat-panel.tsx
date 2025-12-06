"use client"

import { forwardRef } from "react"
import { AppLanguage } from "@/app/components/layout/chat-layout"

interface ChatPanelProps {
  messages: Array<{ id: string; role: "user" | "assistant"; content: string }>
  isAuthenticated: boolean
  language: AppLanguage // ✅ Updated to use AppLanguage
  isLoading: boolean
}

// Add type for chat content
const chatContent = {
  english: {
    thinking: "Thinking...",
    placeholder: "Start a conversation with LEGNA AI",
  },
  amharic: {
    thinking: "ያስባል...",
    placeholder: "ከ LEGNA AI ጋር ውይይት ይጀምሩ",
  },
  oromigna: {
    thinking: "Yaada godhaa...",
    placeholder: "Waliigala LEGNA AI wajjin jalqabi",
  },
}

const ChatPanel = forwardRef<HTMLDivElement, ChatPanelProps>(
  ({ messages, isAuthenticated, language, isLoading }, ref) => {
    const content = chatContent[language]

    if (!isAuthenticated) {
      return (
        <div
          ref={ref}
          className="flex-1 overflow-y-auto bg-background scrollbar-hide"
        >
          <div className="h-full flex items-center justify-center p-8 text-center">
            <div className="max-w-lg space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Welcome to LEGNA AI
              </h3>
              <p className="text-muted-foreground">
                Please sign in to start chatting with our AI assistant
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="flex-1 overflow-y-auto bg-background scrollbar-hide"
      >
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {content.placeholder}
              </h3>
              <p className="text-muted-foreground">
                Ask anything and LEGNA AI will help you with personalized responses
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted text-foreground">
                <p className="flex items-center gap-2">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse">●</span>
                  <span className="ml-2">{content.thinking}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

ChatPanel.displayName = "ChatPanel"

export default ChatPanel