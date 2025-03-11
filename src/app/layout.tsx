import './globals.css'
import type { Metadata } from 'next'
import { inter, lora, jetbrains } from './fonts'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Professional Portfolio',
  description: 'A high-end portfolio for a Software/Data/ML/AI Engineer',
  keywords: ['software engineer', 'developer', 'portfolio', 'data science', 'AI', 'machine learning'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}