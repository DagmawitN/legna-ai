"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"

interface AuthModalProps {
  language: "tigrinya" | "amharic" | "english"
  onClose: () => void
  onSuccess: (userData: any, token: string) => void
  mode?: "register" | "login"
}

const authText = {
  tigrinya: {
    register: "ምዝገባ",
    login: "ምእታዩ",
    fullName: "ሙሉእ ሽም",
    businessName: "ስም ንግዳ",
    email: "ኢመይል",
    password: "ሚስጢር ቃል",
    confirmPassword: "ሚስጢር ቃል ኢድ ሓሙሳ",
    registerButton: "ምዝገባ",
    loginButton: "ምእታዩ",
    switchToLogin: "ምእታዩ",
    switchToRegister: "ምዝገባ",
  },
  amharic: {
    register: "ምዝገባ",
    login: "ግባ",
    fullName: "ሙሉ ስም",
    businessName: "የንግድ ስም",
    email: "ኢሜል",
    password: "ይለፍ ቃል",
    confirmPassword: "ይለፍ ቃል ይስገዩ",
    registerButton: "ምዝገባ",
    loginButton: "ግባ",
    switchToLogin: "ግባ",
    switchToRegister: "ምዝገባ",
  },
  english: {
    register: "Register",
    login: "Login",
    fullName: "Full Name",
    businessName: "Business Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerButton: "Sign Up",
    loginButton: "Sign In",
    switchToLogin: "Login",
    switchToRegister: "Register",
  },
}

export default function AuthModal({ language, onClose, onSuccess, mode = "register" }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(mode === "register")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const t = authText[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }

        const userData = {
          id: Date.now().toString(),
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          preferredLanguage: language,
        }
        const token = "jwt_token_" + Date.now()
        onSuccess(userData, token)
      } else {
        const userData = {
          id: Date.now().toString(),
          fullName: formData.email.split("@")[0],
          email: formData.email,
          preferredLanguage: language,
        }
        const token = "jwt_token_" + Date.now()
        onSuccess(userData, token)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg sm:rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{isRegister ? t.register : t.login}</h1>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive bg-opacity-10 border border-destructive text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.fullName}</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  placeholder={t.fullName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.businessName}</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  placeholder={t.businessName}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t.email}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              placeholder={t.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">{t.password}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              placeholder={t.password}
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t.confirmPassword}</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                placeholder={t.confirmPassword}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isRegister ? t.registerButton : t.loginButton}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary hover:underline font-medium">
            {isRegister ? t.switchToLogin : t.switchToRegister}
          </button>
        </div>
      </div>
    </div>
  )
}
