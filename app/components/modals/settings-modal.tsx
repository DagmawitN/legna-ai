"use client"

import { X, Globe, Bell, Shield } from "lucide-react"
import { useState } from "react"

interface SettingsModalProps {
  user: any
  language: "tigrinya" | "amharic" | "english"
  onClose: () => void
  onLanguageChange: (lang: "tigrinya" | "amharic" | "english") => void
}

const settingsText = {
  tigrinya: {
    settings: "ሴላምታ",
    account: "ሳዕብ",
    language: "ፊደል",
    preferences: "ምርጫ",
    notifications: "ማስታወቂያ",
    privacy: "ድሕነት",
    fullName: "ሙሉእ ሽም",
    businessName: "ስም ንግዳ",
    email: "ኢመይል",
    saveChanges: "ለውጥ ኣዋስ",
    changesSaved: "ለውጥ ተዃዕ",
  },
  amharic: {
    settings: "ቅንብሮች",
    account: "መለያ",
    language: "ቋንቋ",
    preferences: "ምርጫዎች",
    notifications: "ማሳወቂያዎች",
    privacy: "ሚስጢር",
    fullName: "ሙሉ ስም",
    businessName: "የንግድ ስም",
    email: "ኢሜል",
    saveChanges: "ለውጦችን ያስቀምጡ",
    changesSaved: "ለውጦች ተቀምጠዋል",
  },
  english: {
    settings: "Settings",
    account: "Account",
    language: "Language",
    preferences: "Preferences",
    notifications: "Notifications",
    privacy: "Privacy & Security",
    fullName: "Full Name",
    businessName: "Business Name",
    email: "Email Address",
    saveChanges: "Save Changes",
    changesSaved: "Changes saved successfully",
  },
}

const languages = [
  { code: "tigrinya" as const, name: "ትግርኛ", flag: "🇪🇷" },
  { code: "amharic" as const, name: "አማርኛ", flag: "🇪🇹" },
  { code: "english" as const, name: "English", flag: "🌐" },
]

export default function SettingsModal({ user, language, onClose, onLanguageChange }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<"account" | "preferences" | "privacy">("account")
  const [isSaved, setIsSaved] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    businessName: user?.businessName || "",
    email: user?.email || "",
  })

  const t = settingsText[language]

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-2xl bg-card border border-border shadow-xl max-h-96 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-foreground">{t.settings}</h1>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="w-40 border-r border-border bg-background px-3 py-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "account" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{t.account}</span>
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "preferences" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Bell className="h-4 w-4" />
              <span className="text-sm font-medium">{t.preferences}</span>
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === "privacy" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">{t.privacy}</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {activeTab === "account" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.fullName}</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-lg bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.businessName}</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full rounded-lg bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg bg-background border border-border px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  />
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">{t.language}</label>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 rounded-lg border-2 px-4 py-3 transition-all ${
                          language === lang.code
                            ? "border-primary bg-primary bg-opacity-10"
                            : "border-border hover:border-primary hover:bg-muted"
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span
                          className={`text-sm font-medium ${
                            language === lang.code ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {lang.name}
                        </span>
                        {language === lang.code && <div className="ml-auto w-3 h-3 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-medium text-foreground mb-2">Data Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data is encrypted and stored securely. We never share your information with third parties.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <h3 className="font-medium text-foreground mb-2">Chat History</h3>
                  <p className="text-sm text-muted-foreground">
                    All chat conversations are stored locally and associated with your account.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-background px-6 py-3 flex items-center justify-between flex-shrink-0">
          {isSaved && <p className="text-sm text-primary">{t.changesSaved}</p>}
          <div className="ml-auto flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-opacity-90 transition-all"
            >
              {t.saveChanges}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
