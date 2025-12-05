"use client"

import { Sparkles, Users, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface FeatureModulesProps {
  language: string
}

export function FeatureModules({ language }: FeatureModulesProps) {
  const features = {
    en: [
      {
        icon: Sparkles,
        title: "Marketing Assistant",
        description: "Generate professional captions, posts, and product descriptions in multiple languages",
        examples: ["Create social media posts", "Write product descriptions", "Generate marketing copy"],
      },
      {
        icon: Users,
        title: "Customer Support",
        description: "Automatically generate customer replies and analyze customer messages",
        examples: ["Respond to customers", "Analyze feedback", "Manage inquiries"],
      },
      {
        icon: TrendingUp,
        title: "Business Strategy",
        description: "Get quick tips, templates, and strategies for growing your business",
        examples: ["Campaign strategies", "Content calendar", "Growth tactics"],
      },
    ],
    am: [
      {
        icon: Sparkles,
        title: "የግብይት ረዳት",
        description: "በብዙ ቋንቋዎች የምርት መግለጫ እና ግብይት ይዘት ይፍጠሩ",
        examples: ["በማህበራዊ ሚዲያ ላይ ይለጠፉ", "ምርት መግለጫ ይፃፉ", "ግብይት ይዘት ይፍጠሩ"],
      },
      {
        icon: Users,
        title: "የደንበኞች ድጋፍ",
        description: "በራስ-ሰር የደንበኞች ምላሾችን ይፍጠሩ እና ምላሽ ይተንትኑ",
        examples: ["ደንበኞችን ይመልሱ", "ገምገም ይተንትኑ", "መጠይቆችን ያስተዳድሩ"],
      },
      {
        icon: TrendingUp,
        title: "የሥራ ስትራቴጂ",
        description: "ንኁስ ምክር, ንድፎች እና የእድገት ስትራቴጂ ያግኙ",
        examples: ["ስትራቴጂ ምክር", "ይዘት ታቅዷ", "የእድገት ዘዴዎች"],
      },
    ],
    ti: [
      {
        icon: Sparkles,
        title: "ብር.ምድብ ሓገዝ",
        description: "ብዙ ቋንቋ ምድብ ይዘት ወ ምርት መግለጫ ፍጠር",
        examples: ["ሶሻል ሚዲያ ይለጠፉ", "ምርት መግለጫ ፅሕፍ", "ምድብ ተወካይ ፍጠር"],
      },
      {
        icon: Users,
        title: "ረዳት ሕዝብ",
        description: "ራስ-ሰር ተወካይ ምላሽ ፍጠር ወ ገምገም ተንትን",
        examples: ["ተወካይ ምላሽ", "ተሓተት ተንትን", "መጠይቅ ቁጥጥር"],
      },
      {
        icon: TrendingUp,
        title: "ስትራቴጂ ስራ",
        description: "ምክር, ንዑስ መግለጫ ወ ስራ ማደግ መዴ ዝረክብ",
        examples: ["ስትራቴጂ ምክር", "ይዘት ታቅዷ", "ማደግ መዴ"],
      },
    ],
  }

  const currentFeatures = features[language as keyof typeof features] || features.en

  const greetings = {
    en: "What can I help you with today?",
    am: "ዛሬ በምን ነገር እንዲረዳዎ ይችላለሁ?",
    ti: "ሎም ብምን ኣገዲስካ?",
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">Legna AI</h1>
        <p className="text-lg text-muted-foreground">{greetings[language as keyof typeof greetings] || greetings.en}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentFeatures.map((feature, idx) => {
          const Icon = feature.icon
          return (
            <Card
              key={idx}
              className="p-6 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:bg-card/80"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/15">
                  <Icon className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.examples.map((example, exIdx) => (
                      <div
                        key={exIdx}
                        className="text-xs text-primary hover:text-primary/80 cursor-pointer transition-colors"
                      >
                        • {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
