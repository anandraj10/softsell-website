import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoftSell - Turn Unused Software Licenses Into Cash",
  description: "SoftSell helps businesses recover value from unused software licenses. Fast, secure, and hassle-free.",
  keywords: ["software resale", "license resale", "software licenses", "license valuation", "sell software licenses"],
  authors: [{ name: "SoftSell Team" }],
  openGraph: {
    title: "SoftSell - Turn Unused Software Licenses Into Cash",
    description:
      "SoftSell helps businesses recover value from unused software licenses. Fast, secure, and hassle-free.",
    type: "website",
    url: "https://softsell.vercel.app",
    images: [
      {
        url: "https://softsell.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoftSell - Software License Resale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell - Turn Unused Software Licenses Into Cash",
    description:
      "SoftSell helps businesses recover value from unused software licenses. Fast, secure, and hassle-free.",
    images: ["https://softsell.vercel.app/og-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <footer className="py-6 md:py-8 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 md:px-6 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} SoftSell. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
