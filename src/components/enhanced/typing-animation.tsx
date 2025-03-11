"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursorClassName?: string
  showCursor?: boolean
  cursorBlinkSpeed?: number
}

export function TypingAnimation({
  text,
  className,
  speed = 40,
  delay = 0,
  cursorClassName,
  showCursor = true,
  cursorBlinkSpeed = 800,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setDisplayedText("")
    setIsTypingComplete(false)
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        animateText()
      }, delay)
    } else {
      animateText()
    }
    
    function animateText() {
      let currentIndex = 0
      const textLength = text.length
      
      function typeCharacter() {
        if (currentIndex < textLength) {
          setDisplayedText(prev => prev + text.charAt(currentIndex))
          currentIndex++
          timeoutRef.current = setTimeout(typeCharacter, speed)
        } else {
          setIsTypingComplete(true)
        }
      }
      
      typeCharacter()
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, delay])
  
  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={cn(
            "inline-block w-[0.1em] h-[1.2em] bg-current translate-y-[0.1em] mx-[0.04em]",
            cursorClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypingComplete ? [0, 1] : 1 }}
          transition={isTypingComplete ? { 
            duration: 0.01, 
            repeat: Infinity, 
            repeatType: "reverse", 
            repeatDelay: cursorBlinkSpeed / 1000 / 2 
          } : {}}
        />
      )}
    </span>
  )
}
