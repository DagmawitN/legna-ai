"use client"
import Image from "next/image"

interface WelcomeMessageProps {
  language: "tigrinya" | "amharic" | "english"
  onLanguageChange?: (lang: "tigrinya" | "amharic" | "english") => void
  onShowAuth?: (mode: "register" | "login") => void
}

const welcomeContent = {
  tigrinya: {
    title: "ምንታይ ሓገዘነካ?",
    subtitle: "ወደ LEGNA-AI እንኳን በደህና መጡ",
    chooseLanguage: "ቋንቋ ምረጽ",
    prompts: ["ስዒሪ ብሙዚቃ ቡሕሪ ምጽሓፍ", "ሮደ መስኮት ብሳይክል ገደል", "ኢትዮጵያዊ ታሪክ ምሕዝናት ምጽሓፍ"],
    askPlaceholder: "ምንዳይ ምሕሳብ",
  },
  amharic: {
    title: "እንዴት ሊረዳህ ይችላለሁ?",
    subtitle: "ወደ LEGNA-AI እንኳን በደህና መጡ",
    chooseLanguage: "ቋንቋ ምረጽ",
    prompts: ["ከዚህ ወዶ ሴት ሪእሰ ስዔር ጻፈ", "ምግብ ሞቅ ሊሊት ምጽሓፍ", "ሥራ ፍለጋ ምክር ሰጠ"],
    askPlaceholder: "ምንዳይ ምሕሳብ",
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
  },
}

export default function WelcomeMessage({ language, onLanguageChange, onShowAuth }: WelcomeMessageProps) {
  const content = welcomeContent[language]

  return (
    <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="w-full max-w-2xl sm:max-w-3xl space-y-8 sm:space-y-10 md:space-y-12">
          <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center pt-6 sm:pt-8">
            <div className="flex items-center justify-center">
              <Image src="/assets/logo.svg" alt="LEGNA Logo"  width={100} 
          height={48} className="h-12 sm:h-14 md:h-16 w-auto drop-shadow-lg" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium tracking-wide px-2">
              {content.subtitle}
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight text-center px-2">
            {content.title}
          </h1>

          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <select
                value={language}
                onChange={(e) => onLanguageChange?.(e.target.value as "tigrinya" | "amharic" | "english")}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-muted border border-border/50 text-foreground text-sm sm:text-base font-medium hover:border-primary/50 focus:border-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer backdrop-blur-sm pr-10 text-center"
              >
                <option value="english">English</option>
                <option value="amharic">Amharic (አማርኛ)</option>
                <option value="tigrinya">Tigrinya (ትግርኛ)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{content.chooseLanguage}</p>
          </div>

          <div className="relative max-w-2xl mx-auto w-full px-2 sm:px-0">
            <input
              type="text"
              placeholder={content.askPlaceholder}
              disabled
              onClick={() => onShowAuth?.("login")}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl bg-muted border border-border/50 text-foreground placeholder-muted-foreground text-sm sm:text-base md:text-lg font-medium hover:border-primary/50 focus:border-primary focus:outline-none transition-all duration-200 cursor-pointer backdrop-blur-sm disabled:opacity-90"
            />
            <button
              onClick={() => onShowAuth?.("login")}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

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

        {/* Footer spacing */}
        <div className="h-8 sm:h-12 md:h-16" />
      </div>
    </div>
  )
}
