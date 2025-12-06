"use client"

import Image from "next/image"
import { ArrowRight, Lightbulb, PenTool, TrendingUp } from "lucide-react"

interface WelcomeMessageProps {
  language: "english" | "amharic" | "oromigna"
  onLanguageChange?: (lang: "english" | "amharic" | "oromigna") => void
  onShowAuth?: (mode: "register" | "login") => void
}

const welcomeContent = {
  english: {
    greeting: "Hello",
    title: "How can I assist you?",
    subtitle: "Your AI Business Partner",
    inputPlaceholder: "Ask anything about your business...",
    prompts: [
      { icon: <PenTool className="w-5 h-5"/>, text: "Write a caption for a post" },
      { icon: <TrendingUp className="w-5 h-5"/>, text: "Create a marketing strategy" },
      { icon: <Lightbulb className="w-5 h-5"/>, text: "Give business growth tips" },
    ]
  },
  amharic: {
    greeting: "ሰላም",
    title: "እንዴት ልርዳህ?",
    subtitle: "የንግድ ማስተዳደር አማካሪ",
    inputPlaceholder: "ስለ ንግድህ ማንኛውንም ጥያቄ ጠይቅ...",
    prompts: [
      { icon: <PenTool className="w-5 h-5"/>, text: "ለፌስቡክ ማስታወቂያ ጽሁፍ አዘጋጅ" },
      { icon: <TrendingUp className="w-5 h-5"/>, text: "የሽያጭ ስልቶችን ንገረኝ" },
      { icon: <Lightbulb className="w-5 h-5"/>, text: "አዲስ የንግድ ሀሳብ ስጠኝ" },
    ]
  },
  oromigna: {
    greeting: "Akkam",
    title: "Akkaan si gargaaruu danda'a?",
    subtitle: "Hojii Kee Milkeessuuf AI Si Gargaaru",
    inputPlaceholder: "Dhimmoota hojii kee irratti gaafadhu...",
    prompts: [
      { icon: <PenTool className="w-5 h-5"/>, text: "Ergaa miidiyaa hawaasaa barreessi" },
      { icon: <TrendingUp className="w-5 h-5"/>, text: "Tarsiimoo gabaa uumuu" },
      { icon: <Lightbulb className="w-5 h-5"/>, text: "Gorsa guddina hojii kenni" },
    ]
  }
}

export default function WelcomeMessage({ language, onLanguageChange, onShowAuth }: WelcomeMessageProps) {
  const content = welcomeContent[language]

  return (
    <div className="flex-1 overflow-y-auto bg-background flex flex-col items-center p-6 sm:pt-12">
      <div className="w-full max-w-3xl space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-20">
        <div className="flex flex-col items-center space-y-5 text-center">
          <Image src="/assets/logo.svg" alt="Legna AI Logo" width={48} height={48} className="w-12 h-12"/>
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {content.title}
            </h1>
            <p className="text-muted-foreground text-lg font-light">{content.subtitle}</p>
          </div>
        </div>
        <div className="relative max-w-2xl mx-auto w-full group">
          <div 
            onClick={() => onShowAuth?.("register")}
            className="flex items-center w-full px-5 py-4 rounded-3xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all duration-200"
          >
            <input
              type="text"
              readOnly
              placeholder={content.inputPlaceholder}
              className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-lg cursor-pointer"
            />
            <div className="bg-primary p-2.5 rounded-xl text-primary-foreground group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-3">
            {(["english", "amharic", "oromigna"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange?.(lang)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-colors border ${
                  language === lang 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
          {content.prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onShowAuth?.("register")}
              className="flex flex-col items-start gap-4 p-5 rounded-xl bg-card border border-border hover:bg-card/70 hover:border-primary/50 transition-all text-left group h-full"
            >

              <div className="p-3 rounded-lg bg-secondary text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center">
                {prompt.icon} 
              </div>
              <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                {prompt.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- Footer Branding (Fixed - Now cleared by pb-20) --- */}
      <div className="fixed bottom-6 text-xs text-muted-foreground/50 font-mono uppercase tracking-widest z-10">
        Legna AI • Ethiopia
      </div>
    </div>
  )
}