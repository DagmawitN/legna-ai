"use client"

interface MessageBubbleProps {
  role: "user" | "assistant"
  content: string
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-2xl px-4 py-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border border-border"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}
