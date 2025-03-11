"use client"
import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedSkillBarProps {
  label: string
  percentage: number
  color?: string
  className?: string
  delay?: number
}

export function AnimatedSkillBar({
  label,
  percentage,
  color = "bg-primary",
  className,
  delay = 0,
}: AnimatedSkillBarProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("mb-6", className)} ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.4, delay: delay + 0.6 },
            },
          }}
          className="text-muted-foreground"
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { width: 0 },
            visible: {
              width: `${percentage}%`,
              transition: { 
                duration: 1, 
                delay, 
                ease: [0.33, 1, 0.68, 1] 
              },
            },
          }}
        />
      </div>
    </div>
  )
}
