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
    <span className={cn("relative inline-block", className)}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={cn(
            "absolute top-0 right-[-0.1em] w-[0.05em] h-[1.1em] bg-primary translate-y-[0.1em]",
            cursorClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isTypingComplete ? [0, 1] : 1,
            height: isTypingComplete ? ["1.1em", "1.1em"] : ["0.2em", "1.1em"],
          }}
          transition={isTypingComplete ? { 
            opacity: {
              duration: 0.01, 
              repeat: Infinity, 
              repeatType: "reverse", 
              repeatDelay: cursorBlinkSpeed / 1000 / 2
            }
          } : {
            height: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }
          }}
        />
      )}
    </span>
  )
}