"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("[Error Boundary]", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-opacity-90 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
