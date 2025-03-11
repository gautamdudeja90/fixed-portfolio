"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"

export function HeroSection() {
  const heroRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background z-10" />
        <div className="w-full h-full bg-black">
          {/* Placeholder for video background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-secondary/20 animate-gradient"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide relative z-10" ref={textRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="title-xl mb-6">
            Engineering the Future of{" "}
            <span className="text-primary">AI & Big Data</span>
          </h1>
          <p className="subtitle mb-8 max-w-xl mx-auto">
            Building innovative solutions at the intersection of software engineering,
            data science, and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
