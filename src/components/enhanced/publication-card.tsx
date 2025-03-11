"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PublicationCardProps {
  title: string
  authors: string[]
  conference: string
  year: number
  abstract: string
  link?: string
  doi?: string
  delay?: number
}

export function PublicationCard({
  title,
  authors,
  conference,
  year,
  abstract,
  link,
  doi,
  delay = 0,
}: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 border-border/50",
          isHovered && "shadow-lg border-primary/20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <h2 className="font-serif text-xl font-bold mb-2 group flex items-start gap-2">
            {title}
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-muted-foreground hover:text-primary transition-colors mt-1 shrink-0"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </h2>
          
          <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground mb-4 gap-2 md:gap-4">
            <div>{authors.join(", ")}</div>
            <div className="hidden md:block text-primary/50">•</div>
            <div>{conference}</div>
            <div className="hidden md:block text-primary/50">•</div>
            <div>{year}</div>
            {doi && (
              <>
                <div className="hidden md:block text-primary/50">•</div>
                <div className="font-mono text-xs">{doi}</div>
              </>
            )}
          </div>
          
          <motion.div
            initial={{ height: "4.5rem" }}
            animate={{ height: isExpanded ? "auto" : "4.5rem" }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <p className={cn(
              "text-sm transition-opacity duration-300",
              !isExpanded && "line-clamp-3"
            )}>
              {abstract}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent" />
            )}
          </motion.div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
