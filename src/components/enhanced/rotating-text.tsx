"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  words: string[]
  className?: string
  interval?: number
  transitionDuration?: number
}

export function RotatingText({
  words,
  className,
  interval = 3000,
  transitionDuration = 0.5,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [words, interval])
  
  if (!isMounted) {
    return <span className={className}>{words[0]}</span>
  }
  
  return (
    <span className={cn("inline-block relative", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            duration: transitionDuration,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}