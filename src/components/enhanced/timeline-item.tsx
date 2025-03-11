"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  date: string
  title: string
  subtitle?: string
  description?: string
  last?: boolean
  delay?: number
}

export function TimelineItem({
  date,
  title,
  subtitle,
  description,
  last = false,
  delay = 0,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-10 pb-10",
        last && "pb-0"
      )}
    >
      {/* Timeline line */}
      {!last && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20"
        />
      )}
      
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay }}
        className="absolute left-0 top-5 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      </motion.div>
      
      {/* Content */}
      <div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
          className="inline-block px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm font-medium mb-2"
        >
          {date}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="font-serif text-xl font-semibold mb-1"
        >
          {title}
        </motion.h3>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
            className="text-muted-foreground mb-1"
          >
            {subtitle}
          </motion.p>
        )}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: delay + 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}
