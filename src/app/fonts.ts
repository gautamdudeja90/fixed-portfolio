import { Inter, Lora, JetBrains_Mono } from 'next/font/google'

// Primary sans-serif font (for body text)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  // Optimize for aesthetics
  weight: ['300', '400', '500', '600', '700'],
})

// Elegant serif font (for headings)
export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  // Include both regular and italic styles
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

// Monospace font (for code)
export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})