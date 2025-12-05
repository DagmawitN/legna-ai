"use client"

import { forwardRef } from "react"
import WelcomeMessage from "@/app/components/chat/welcome-message"
import MessageBubble from "@/app/components/chat/message-bubble"

interface ChatPanelProps {
  messages: Array<{ id: string; role: "user" | "assistant"; content: string }>
  isAuthenticated: boolean
  language: "tigrinya" | "amharic" | "english"
  isLoading?: boolean
}

const ChatPanel = forwardRef<HTMLDivElement, ChatPanelProps>(
  ({ messages, isAuthenticated, language, isLoading }, ref) => {
    return (
      <div ref={ref} className="flex-1 overflow-y-auto bg-background px-4 py-6 md:px-8 space-y-4 flex flex-col">
        {messages.length === 0 && <WelcomeMessage language={language} showLanguageDropdown={!isAuthenticated} />}

        <div className="space-y-4 max-w-4xl mx-auto w-full mt-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} content={message.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
)

ChatPanel.displayName = "ChatPanel"

export default ChatPanel
