"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink, ArrowRight } from "lucide-react"  // Add ArrowRight here
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Link href={`/projects/${slug}`}>
        <Card
          ref={cardRef}
          className={cn(
            "group overflow-hidden transition-all duration-500 border-border/30 h-full bg-background/50 backdrop-blur-sm hover:backdrop-blur-md",
            isHovered && "shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.7)] border-primary/30 scale-[1.01]"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                isHovered && "scale-105 blur-[2px]"
              )}
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 transition-opacity duration-500",
              isHovered && "opacity-90"
            )} />
            
            {/* Floating tags on hover */}
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-flex items-center rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 px-2.5 py-0.5 text-xs font-light text-primary"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          <CardContent className="p-7">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-xl font-normal">{title}</h3>
              <div className="flex space-x-3">
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
            <p className="text-muted-foreground text-sm font-light tracking-wide mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={isHovered ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-gradient-to-r from-primary/80 to-primary/0"
            />
            <div className="flex justify-end mt-3">
              <motion.span 
                className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1 tracking-wider uppercase"
                initial={{ x: -10 }}
                animate={isHovered ? { x: 0 } : { x: -10 }}
                transition={{ duration: 0.3 }}
              >
                View Project <ArrowRight className="h-3 w-3 ml-1" />
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}