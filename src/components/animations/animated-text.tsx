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
