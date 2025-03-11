// src/components/enhanced/blog-card.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useClientOnly } from "@/lib/use-client-only"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  readingTime: string
  author: string
  slug: string
  image?: string
  tags?: string[]
}

export function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  author,
  slug,
  image = "/images/blog-placeholder.jpg",
  tags = [],
}: BlogCardProps) {
  const isClient = useClientOnly()
  const [isHovered, setIsHovered] = useState(false)
  
  // Don't use hover effects during server-side rendering
  const hoverProps = isClient ? {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  } : {}

  return (
    <motion.div
      initial={isClient ? { opacity: 0, y: 20 } : false}
      whileInView={isClient ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${slug}`} className="block">
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300 border-border/50 h-full",
            isHovered && "shadow-xl border-primary/20"
          )}
          {...hoverProps}
        >
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered && "scale-105"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{readingTime}</span>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
              {excerpt}
            </p>
            <div className="text-sm font-medium">By {author}</div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}