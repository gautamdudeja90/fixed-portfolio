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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Link href={`/blog/${slug}`} className="block">
        <Card
          className={cn(
            "overflow-hidden transition-all duration-500 border-border/30 h-full bg-background/50 backdrop-blur-sm hover:backdrop-blur-md",
            isHovered && "shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.7)] border-primary/30 scale-[1.01]"
          )}
          {...hoverProps}
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                isHovered && "scale-105 blur-[2px]"
              )}
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 transition-opacity duration-500",
              isHovered && "opacity-90"
            )} />
            
            {/* Editorial-style category marker */}
            {tags && tags.length > 0 && (
              <div className="absolute top-4 left-4">
                <motion.span
                  className="inline-flex bg-primary/80 backdrop-blur-md text-white px-3 py-1 text-xs uppercase tracking-widest font-light"
                  animate={isHovered ? { y: 0, opacity: 1 } : { y: -10, opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {tags[0]}
                </motion.span>
              </div>
            )}
          </div>
          <CardContent className="p-7">
            <div className="flex items-center text-xs text-muted-foreground mb-4 space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span className="font-light tracking-wide">{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span className="font-light tracking-wide">{readingTime}</span>
              </div>
            </div>
            <h3 className="font-serif text-xl font-normal mb-3 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm font-light tracking-wide mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm font-light italic">By {author}</div>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={isHovered ? { opacity: 1, width: "30%" } : { opacity: 0, width: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] bg-gradient-to-r from-primary/80 to-primary/0"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}