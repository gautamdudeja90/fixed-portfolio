"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  slug: string
  priority?: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  github,
  demo,
  slug,
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${slug}`}>
        <Card
          ref={cardRef}
          className={cn(
            "group overflow-hidden transition-all duration-300 border-border/50 h-full",
            isHovered && "shadow-xl border-primary/20"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered && "scale-105"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
            
            {/* Floating tags on hover */}
            <div className="absolute bottom-0 left-0 w-full p-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="inline-flex items-center rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-xl font-bold">{title}</h3>
              <div className="flex space-x-2">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} />
                  </a>
                )}
                {demo && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {description}
            </p>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={isHovered ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="h-0.5 bg-gradient-to-r from-primary to-primary/0"
            />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
