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

interface LoginResponse {
  message: string
  token: string
  user: {
    id: string
    fullName: string
    email: string
    preferredLanguage: string
    country: string | null
    businessType: string | null
  }
}

interface RegisterResponse {
  user: {
    id: string
    fullName: string
    email: string
    preferredLanguage: string
    country: string | null
    businessType: string | null
    createdAt: string
  }
}

interface ApiError {
  error: string
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
    emailRequired: "ኢመይል ኣለዎ",
    passwordRequired: "ሚስጢር ቃል ኣለዎ",
    nameRequired: "ሙሉእ ሽም ኣለዎ",
    passwordsMatch: "ሚስጢር ቃል ይመሳሰል",
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
    emailRequired: "ኢሜል ያስፈልጋል",
    passwordRequired: "የይለፍ ቃል ያስፈልጋል",
    nameRequired: "ሙሉ ስም ያስፈልጋል",
    passwordsMatch: "የይለፍ ቃሎች ይዛመዳሉ",
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
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    nameRequired: "Full name is required",
    passwordsMatch: "Passwords must match",
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

  // Map your language prop to the API expected values
  const mapLanguageToApi = (lang: "tigrinya" | "amharic" | "english") => {
    const mapping = {
      tigrinya: "Oromigna", // Using Oromigna as fallback since your API doesn't support Tigrinya
      amharic: "Amharic",
      english: "English"
    }
    return mapping[lang]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Client-side validation
    if (!formData.email) {
      setError(t.emailRequired)
      return
    }

    if (!formData.password) {
      setError(t.passwordRequired)
      return
    }

    if (isRegister) {
      if (!formData.fullName) {
        setError(t.nameRequired)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError(t.passwordsMatch)
        return
      }
    }

    setIsLoading(true)

    try {
      if (isRegister) {
        // Register API call
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email.toLowerCase(),
            password: formData.password,
            preferredLanguage: mapLanguageToApi(language),
            businessType: formData.businessName || null,
          }),
        })

        const data: RegisterResponse | ApiError = await response.json()

        if (!response.ok) {
          const errorData = data as ApiError
          throw new Error(errorData.error || "Registration failed")
        }

        // After successful registration, automatically log the user in
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            password: formData.password,
          }),
        })

        const loginData: LoginResponse | ApiError = await loginResponse.json()

        if (!loginResponse.ok) {
          const errorData = loginData as ApiError
          throw new Error(errorData.error || "Auto-login failed after registration")
        }

        const successData = loginData as LoginResponse
        onSuccess(successData.user, successData.token)
      } else {
        // Login API call
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            password: formData.password,
          }),
        })

        const data: LoginResponse | ApiError = await response.json()

        if (!response.ok) {
          const errorData = data as ApiError
          throw new Error(errorData.error || "Login failed")
        }

        const successData = data as LoginResponse
        onSuccess(successData.user, successData.token)
      }
    } catch (err: any) {
      console.error("Auth error:", err)
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg sm:rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{isRegister ? t.register : t.login}</h1>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
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
                  disabled={isLoading}
                  className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={t.fullName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.businessName}</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  disabled={isLoading}
                  className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isLoading}
              className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isLoading}
              className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full rounded-lg bg-background border border-border px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-primary hover:underline font-medium"
            disabled={isLoading}
          >
            {isRegister ? t.switchToLogin : t.switchToRegister}
          </button>
        </div>
      </div>
    </div>
  )
}