"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Plus, Mic, AudioLines } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"

interface ChatInterfaceProps {
  language: string
}

export function ChatInterface({ language }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<
    Array<{ id: string; type: "user" | "assistant"; content: string; timestamp: Date }>
  >([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const content = {
    en: {
      whatOnMind: "What's on your mind today?",
      askAnything: "Ask anything",
      placeholder: "Legna AI can help with marketing, customer support, and business strategy",
      thinking: "Legna is thinking...",
    },
    am: {
      whatOnMind: "ថ្ងៃនេះ តើ មាន អ្វី ក្នុង គំនិត របស់ អ្នក?",
      askAnything: "សួរ អ្វី ក៏បាន",
      placeholder: "Legna AI សាមารថ ជួយ ក្នុង ឈឺក ទឹក លក ពាណិជ្ជកម្ម ការ គាំទ ខ្ញុំ",
      thinking: "Legna កំពុង គិត...",
    },
    ti: {
      whatOnMind: "ዛሬ ምን ሃሳብ ይደረግ?",
      askAnything: "ምንም ይጠይቁ",
      placeholder: "Legna AI እንደ ግብይት ፣ ደንበኞች ድጋፍ እና ስራ ስትራቴጂ ሊረዳ ይችላል",
      thinking: "Legna ያስባል...",
    },
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant" as const,
        content: `I've received your message in ${language === "en" ? "English" : language === "am" ? "Khmer" : "Tigrinya"}. How can I help you with your business today?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-foreground font-semibold flex items-center gap-2 hover:bg-card/40 px-3 py-1 rounded">
            <span>Legna AI</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-primary/10 text-primary hover:bg-primary/20 text-sm h-9">Upgrade to Pro</Button>
          <button className="p-2 hover:bg-card/40 rounded text-foreground">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.5 8h-15c-.825 0-1.5.675-1.5 1.5v10c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-10c0-.825-.675-1.5-1.5-1.5zm0 11h-15v-10h15v10z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-card/40 rounded text-foreground">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="max-w-2xl text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-light text-foreground">{currentContent.whatOnMind}</h1>

              {/* Quick action cards */}
              <div className="grid grid-cols-2 gap-3 max-w-xl">
                {[
                  {
                    en: "Marketing Strategy",
                    am: "ផែនការ ឈឺក",
                    ti: "ግብይት ስትራቴጂ",
                  },
                  {
                    en: "Customer Support Tips",
                    am: "ដំបូន្ម ការ គាំទ",
                    ti: "ደንበኞች ድጋፍ",
                  },
                  {
                    en: "Business Growth Plan",
                    am: "ផែនការ ក្រុម ពាណិជ្ជកម្ម",
                    ti: "ስራ ዕድገት ፕላን",
                  },
                  {
                    en: "Multilingual Content",
                    am: "មាតិកា ច្រើន ភាសា",
                    ti: "ብዙ-ቋንቋ ይዘት",
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="text-left p-4 rounded-lg border border-border hover:bg-card/60 transition-colors bg-card"
                  >
                    <p className="text-sm text-foreground font-medium">
                      {item[language as keyof typeof item] || item.en}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} language={language} />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{currentContent.thinking}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border px-6 py-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <button className="text-muted-foreground hover:text-foreground p-1">
                <Plus size={18} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={currentContent.askAnything}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
              <button className="text-muted-foreground hover:text-foreground p-1">
                <Mic size={18} />
              </button>
              <button className="text-muted-foreground hover:text-foreground p-1">
                <AudioLines size={18} />
              </button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-foreground text-background hover:bg-foreground/80 rounded-lg p-3 h-auto"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">{currentContent.placeholder}</p>
        </div>
      </div>
    </div>
  )
}
