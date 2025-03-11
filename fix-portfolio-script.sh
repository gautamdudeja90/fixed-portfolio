#!/bin/bash
set -e

echo "🛠️ Fixing and enhancing the portfolio site..."

# Make sure we're in the fixed-portfolio directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this script from your fixed-portfolio directory!"
  exit 1
fi

# Install additional dependencies
echo "📦 Installing additional dependencies..."
npm install framer-motion gsap next-mdx-remote gray-matter react-intersection-observer date-fns zustand --legacy-peer-deps
npm install @tailwindcss/typography tailwindcss-animate --save-dev --legacy-peer-deps

# Create lib directory for utilities
mkdir -p src/lib
echo "📁 Creating utility functions..."
cat > src/lib/utils.ts << 'EOL'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOL

# Update tailwind.config.js with animation plugin
echo "⚙️ Updating Tailwind configuration..."
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}
EOL

# Update globals.css with custom utility classes
echo "🎨 Updating global styles..."
cat > src/app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom utility classes */
.container-wide {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.section-padding {
  @apply py-16 md:py-24;
}

.title-xl {
  @apply font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight;
}

.title-lg {
  @apply font-serif text-3xl md:text-5xl font-bold tracking-tight;
}

.title-md {
  @apply font-serif text-2xl md:text-4xl font-bold tracking-tight;
}

.subtitle {
  @apply font-sans text-lg md:text-xl text-muted-foreground;
}

/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Remove scroll bar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
EOL

# Update layout with fonts and theme provider
echo "📄 Setting up layout with fonts and theme provider..."

# Create fonts.ts
cat > src/app/fonts.ts << 'EOL'
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})
EOL

# Create theme provider
mkdir -p src/components
cat > src/components/theme-provider.tsx << 'EOL'
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
EOL

# Update layout.tsx
cat > src/app/layout.tsx << 'EOL'
import './globals.css'
import type { Metadata } from 'next'
import { inter, playfair } from './fonts'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Software Engineer Portfolio',
  description: 'A high-end portfolio for a Software/Data/ML/AI Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
EOL

# Create UI components
echo "🧩 Creating UI components..."
mkdir -p src/components/ui

# Create Button component
cat > src/components/ui/button.tsx << 'EOL'
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
EOL

# Create card component
cat > src/components/ui/card.tsx << 'EOL'
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
EOL

# Create theme toggle component
cat > src/components/theme-toggle.tsx << 'EOL'
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
EOL

# Create layout components
echo "🏗️ Creating layout components..."
mkdir -p src/components/layout

# Create header component
cat > src/components/layout/header.tsx << 'EOL'
"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Projects", path: "/projects" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-4 shadow-md"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-serif text-xl font-bold">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-50 bg-background md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
EOL

# Create footer component
cat > src/components/layout/footer.tsx << 'EOL'
"use client"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-muted-foreground max-w-xs">
              A Software Engineer specializing in building exceptional digital
              experiences with a focus on AI, ML, and Data Engineering.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
EOL

# Create animations directory and components
mkdir -p src/components/animations

# Create AnimatedText component
cat > src/components/animations/animated-text.tsx << 'EOL'
"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  tag = "div",
}: AnimatedTextProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })
  const [isMounted, setIsMounted] = useState(false)
  const hasAnimated = useRef(false)
  
  // Split text into words and characters
  const words = text.split(" ")

  const wordVariants: Variants = {
    hidden: {},
    visible: {},
  }

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * duration,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      controls.start("visible")
      hasAnimated.current = true
    }
  }, [controls, inView])

  if (!isMounted) {
    return null
  }

  const Component = tag

  return (
    <Component className={cn(className)} ref={ref}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        animate={controls}
        variants={wordVariants}
      >
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block mr-[0.25em]">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`${char}-${charIndex}`}
                className="inline-block"
                variants={characterVariants}
                custom={(wordIndex * 5) + charIndex}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  )
}
EOL

# Create home page with Hero section
mkdir -p src/components/sections

# Hero section
cat > src/components/sections/hero-section.tsx << 'EOL'
"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"

export function HeroSection() {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background z-10" />
        <div className="w-full h-full bg-black">
          {/* Placeholder for video background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-secondary/20 animate-gradient"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide relative z-10" ref={textRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="title-xl mb-6">
            Engineering the Future of{" "}
            <span className="text-primary">AI & Big Data</span>
          </h1>
          <p className="subtitle mb-8 max-w-xl mx-auto">
            Building innovative solutions at the intersection of software engineering,
            data science, and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
EOL

# Update home page
cat > src/app/page.tsx << 'EOL'
import { HeroSection } from "@/components/sections/hero-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimatedText } from "@/components/animations/animated-text"

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Featured Projects Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <AnimatedText 
                text="Featured Projects" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                Discover some of my recent work in software engineering, data processing, and AI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project cards will go here */}
              <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-xl font-bold mb-2">Real-time Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  A real-time analytics dashboard built with Next.js, Apache Kafka, and Apache Druid.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Next.js</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Kafka</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Druid</span>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-xl font-bold mb-2">ML Pipeline Orchestration</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  A scalable ML pipeline orchestration system using Airflow, MLflow, and Kubernetes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Python</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Airflow</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">MLflow</span>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-xl font-bold mb-2">Cloud-Native Data Lake</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  A modern data lake built on cloud infrastructure with Iceberg and Spark.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Spark</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Iceberg</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">AWS</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild>
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact CTA Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText 
                text="Let's Work Together" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

# Create public directory for images if it doesn't exist
mkdir -p public/images

# Create placeholder images
echo "🖼️ Creating placeholder images..."
cat > public/images/profile-placeholder.svg << 'EOL'
<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#1F2937"/>
  <circle cx="200" cy="150" r="80" fill="#4B5563"/>
  <path d="M80 350C80 280 140 240 200 240C260 240 320 280 320 350" fill="#4B5563"/>
</svg>
EOL

# Create minimal about page to test navigation
mkdir -p src/app/about
cat > src/app/about/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"

export const metadata = {
  title: 'About Me | Software Engineer Portfolio',
  description: 'Learn more about my background, skills, and experience as a software engineer.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <AnimatedText 
                text="About Me" 
                tag="h1"
                className="title-xl mb-6 text-center"
              />
              <p className="subtitle mb-6 text-center">
                I'm a software engineer specializing in building exceptional digital
                experiences with a focus on AI, ML, and Data Engineering.
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
              <p>
                This is a placeholder page. Replace this content with your actual about information.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

# Create placeholder pages for other sections
mkdir -p src/app/projects
cat > src/app/projects/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"

export const metadata = {
  title: 'Projects | Software Engineer Portfolio',
  description: 'Explore my latest software engineering, data, and AI projects.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Projects" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                Explore my latest work in software engineering, data processing, and artificial intelligence.
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
              <p>
                This is a placeholder page for projects. Replace this content with your actual projects.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

mkdir -p src/app/blog
cat > src/app/blog/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"

export const metadata = {
  title: 'Blog | Software Engineer Portfolio',
  description: 'Articles and insights on software engineering, data science, and AI.',
}

export default function BlogPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Blog" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                Thoughts, tutorials, and insights on software engineering, data science, and artificial intelligence.
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
              <p>
                This is a placeholder page for blog posts. Replace this content with your actual blog posts.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

mkdir -p src/app/resume
cat > src/app/resume/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"

export const metadata = {
  title: 'Resume | Software Engineer Portfolio',
  description: 'View and download my professional resume.',
}

export default function ResumePage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Resume" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                My professional experience, skills, and qualifications.
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
              <p>
                This is a placeholder page for your resume. Replace this content with your actual resume information.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

mkdir -p src/app/contact
cat > src/app/contact/page.tsx << 'EOL'
"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Get in Touch" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                Have a question or want to work together? Feel free to reach out!
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <form className="space-y-6 max-w-md mx-auto">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

echo "✅ Portfolio site fixed and enhanced!"
echo ""
echo "🚀 To view your site, run:"
echo "  docker-compose up"
echo ""
echo "🌐 Then open http://localhost:3000 in your browser."
echo ""
echo "The site now has:"
echo "  ✓ Working theme (dark/light) toggle"
echo "  ✓ Responsive navigation with mobile menu"
echo "  ✓ Homepage with animated hero section"
echo "  ✓ Placeholder pages for all sections"
echo "  ✓ Animated text components"
echo "  ✓ UI components (buttons, cards)"
echo "  ✓ Proper styling and layout"
echo ""
echo "You can now gradually enhance each page with more content and features."
