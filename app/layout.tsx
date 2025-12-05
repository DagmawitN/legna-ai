import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Legna AI - Multilingual AI Marketer for Ethiopian Entrepreneurs",
  description:
    "AI-powered multilingual marketing assistant for Ethiopian businesses. Generate professional content in Tigrinya, Amharic, and English. Perfect for social media, product descriptions, and business guidance.",
  keywords: ["AI marketing", "Ethiopian business", "multilingual", "Tigrinya", "Amharic", "marketing assistant"],
  authors: [{ name: "Legna AI" }],
  creator: "v0.app",
  generator: "v0.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://legna-ai.vercel.app",
    title: "Legna AI - Multilingual AI Marketer",
    description: "AI-powered marketing assistant for Ethiopian entrepreneurs",
    siteName: "Legna AI",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0d0d0f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0d0d0f" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`font-sans antialiased dark bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
