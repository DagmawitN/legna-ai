"use client"

import { Plus, MessageSquare, Compass, BookOpen, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  language: string
  onLanguageChange: (lang: string) => void
}

export function Sidebar({ language, onLanguageChange }: SidebarProps) {
  const content = {
    en: {
      newChat: "New chat",
      searchChats: "Search chats",
      library: "Library",
      projects: "Projects",
      yourChats: "Your chats",
      language: "Language",
      settings: "Settings",
      logout: "Logout",
      upgradeToGo: "Upgrade to Go",
    },
    am: {
      newChat: "ថ្មីនិយាយ",
      searchChats: "ស្វាគមន៍ស្វាយ",
      library: "បណ្ណាល័យ",
      projects: "គម្រង់",
      yourChats: "របស់អ្នក",
      language: "ភាសា",
      settings: "ការ세팅",
      logout: "ចាកចេញ",
      upgradeToGo: "ធ្វើឱ្យប្រសើរទៅ Go",
    },
    ti: {
      newChat: "ሓደስ ንግግር",
      searchChats: "ንግግር ፈልግ",
      library: "መጽሐፍ ቤት",
      projects: "ፕሮጀክቶች",
      yourChats: "ናትka ንግግራትካ",
      language: "ቋንቋ",
      settings: "ምግባር",
      logout: "ውጣ",
      upgradeToGo: "ወደ Go ሰፊ",
    },
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "am", name: "អ្នក" },
    { code: "ti", name: "ትግርኛ" },
  ]

  const currentContent = content[language as keyof typeof content] || content.en
  const chats = [
    "AI marketer multilingual sup...",
    "Google Cloud Project explai...",
    "Google Cloud hackathon tips",
    "Correct my English",
    "Roadmap for mastering skills",
    "Multilingual AI Assistant",
    "LLMs and triple quotes",
    "Choose winning hackathon i...",
    "Additional context for skills",
  ]

  return (
    <aside className="w-64 bg-secondary border-r border-border flex flex-col h-screen">
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
            <span className="text-secondary font-bold text-sm">L</span>
          </div>
          <span className="text-sm font-semibold text-foreground">Legna AI</span>
        </div>
      </div>

      <div className="px-3 py-2">
        <Button className="w-full bg-card text-foreground hover:bg-card/80 rounded-md gap-2 text-sm h-10 border border-border justify-start">
          <Plus size={16} />
          {currentContent.newChat}
        </Button>
      </div>

      <nav className="px-2 py-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-card/40 transition-colors text-sm group">
          <MessageSquare size={16} />
          <span>{currentContent.searchChats}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-card/40 transition-colors text-sm group">
          <BookOpen size={16} />
          <span>{currentContent.library}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-card/40 transition-colors text-sm group">
          <Compass size={16} />
          <span>{currentContent.projects}</span>
        </button>
      </nav>

      <div className="flex-1 px-2 py-3 overflow-y-auto">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 py-2 mb-2">
          {currentContent.yourChats}
        </h3>
        <div className="space-y-1">
          {chats.map((chat, idx) => (
            <button
              key={idx}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-foreground hover:bg-card/40 transition-colors truncate group flex items-center justify-between"
            >
              <span className="truncate flex-1">{chat}</span>
              <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-3 border-t border-border space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase block">{currentContent.language}</label>
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                language === lang.code ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-card/40"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 py-2 space-y-2 border-t border-border">
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/80 rounded-md text-sm h-10">
          {currentContent.upgradeToGo}
        </Button>
      </div>
    </aside>
  )
}
