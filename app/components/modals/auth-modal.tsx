"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, Globe, CheckCircle } from "lucide-react"

interface AuthModalProps {
  language: "english" | "amharic" | "oromigna" | "tigrinya"
  onClose: () => void
  onSuccess: (userData: any, token: string) => void
  mode?: "register" | "login"
}

// Language options matching backend
const languageOptions = [
  { value: "English", label: "English", nativeName: "English" },
  { value: "Amharic", label: "Amharic", nativeName: "አማርኛ" },
  { value: "Oromigna", label: "Oromigna", nativeName: "Afaan Oromoo" },
]

// Country options
const countryOptions = [
  "Ethiopia", "United States", "Canada", "United Kingdom", "Kenya", 
  "Nigeria", "South Africa", "Germany", "France", "Other"
]

// Business type options
const businessTypeOptions = [
  "Retail", "Technology", "Agriculture", "Education", "Healthcare",
  "Finance", "Manufacturing", "Services", "Food & Beverage", "Other"
]

const authText = {
  tigrinya: {
    register: "ምዝገባ",
    login: "ምእታዩ",
    fullName: "ሙሉእ ሽም",
    businessType: "ኣይነት ንግዲ",
    country: "ሃገር",
    preferredLanguage: "ቅድመ ምርጫ ቋንቋ",
    email: "ኢመይል",
    password: "ሚስጢር ቃል",
    confirmPassword: "ሚስጢር ቃል ኢድ ሓሙሳ",
    registerButton: "ምዝገባ",
    loginButton: "ምእታዩ",
    switchToLogin: "ምእታዩ",
    switchToRegister: "ምዝገባ",
    or: "ወይ",
    registrationSuccess: "ምዝገባ ተወዲኡ! ኣብ ታሕቲ ብኢመይልኩምን ፓስዎርድኩምን ክትእተዉ ትኽእሉ ኢኹም።",
  },
  amharic: {
    register: "ምዝገባ",
    login: "ግባ",
    fullName: "ሙሉ ስም",
    businessType: "የንግድ አይነት",
    country: "አገር",
    preferredLanguage: "ተመራጭ ቋንቋ",
    email: "ኢሜል",
    password: "የይለፍ ቃል",
    confirmPassword: "የይለፍ ቃል አረጋግጥ",
    registerButton: "ምዝገባ",
    loginButton: "ግባ",
    switchToLogin: "ግባ",
    switchToRegister: "ምዝገባ",
    or: "ወይም",
    registrationSuccess: "ምዝገባዎ ተሳኒዩ! አሁን በኢሜልዎ እና በይለፍ ቃልዎ መግባት ይችላሉ።",
  },
  english: {
    register: "Register",
    login: "Login",
    fullName: "Full Name",
    businessType: "Business Type",
    country: "Country",
    preferredLanguage: "Preferred Language",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerButton: "Sign Up",
    loginButton: "Sign In",
    switchToLogin: "Login",
    switchToRegister: "Register",
    or: "or",
    registrationSuccess: "Registration successful! You can now login with your email and password.",
  },
}

export default function AuthModal({ language, onClose, onSuccess, mode = "register" }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(mode === "register")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferredLanguage: "English",
    country: "",
    businessType: "",
  })
  const [error, setError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

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
    
    // Validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return
    }
    
    if (isRegister) {
      if (!formData.fullName) {
        setError("Full name is required")
        return
      }
      
      if (!formData.preferredLanguage) {
        setError("Preferred language is required")
        return
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
    }

    setIsLoading(true)

    try {
      if (isRegister) {
        // Register the user
        const registerResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email.toLowerCase(),
            password: formData.password,
            preferredLanguage: formData.preferredLanguage,
            country: formData.country || null,
            businessType: formData.businessType || null,
          }),
        })

        const registerData = await registerResponse.json()

        if (!registerResponse.ok) {
          throw new Error(registerData.error || "Registration failed")
        }

        // Show success message and switch to login mode
        setRegistrationSuccess(true)
        setError("") // Clear any errors
        
        // Switch to login mode automatically
        setIsRegister(false)
        
        // Clear password fields but keep email
        setFormData(prev => ({
          ...prev,
          password: "",
          confirmPassword: ""
        }))
        
        // Don't call onSuccess - we want user to login manually
        // Don't close the modal - keep it open for login
        
      } else {
        // Login flow
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

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Authentication failed")
        }

        // Success - call onSuccess with login data (which includes token)
        onSuccess(data.user, data.token)
        onClose()
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
      console.error("Auth error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl sm:rounded-2xl bg-card border border-border/50 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {isRegister ? t.register : t.login} • LEGNA
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success message after registration */}
        {registrationSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 text-sm flex items-start gap-2">
            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Registration Successful!</p>
              <p className="text-xs mt-1">{t.registrationSuccess}</p>
            </div>
          </div>
        )}

        {error && !registrationSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.fullName} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder={t.fullName}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.preferredLanguage} <span className="text-destructive">*</span>
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all"
                  >
                    {languageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t.country}
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all"
                  >
                    <option value="">Select country</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.businessType}
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all"
                >
                  <option value="">Select business type</option>
                  {businessTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.email} <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.password} <span className="text-destructive">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.confirmPassword} <span className="text-destructive">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full rounded-lg bg-background border border-border px-4 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isRegister ? t.registerButton : t.loginButton}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister)
                setError("")
                setRegistrationSuccess(false)
                setFormData(prev => ({
                  ...prev,
                  password: "",
                  confirmPassword: ""
                }))
              }}
              className="text-primary hover:underline font-medium"
            >
              {isRegister ? t.switchToLogin : t.switchToRegister}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}