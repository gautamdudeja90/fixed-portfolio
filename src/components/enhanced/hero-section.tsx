"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Background3D } from "@/components/enhanced/background-3d"
import { TypingAnimation } from "@/components/enhanced/typing-animation"
import { RotatingText } from "@/components/enhanced/rotating-text"
import { HexagonAnimation } from "@/components/enhanced/hexagon-animation"
import gsap from "gsap"

// 1) Import useTheme
import { useTheme } from "next-themes"

export function EnhancedHeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // 2) Access the current theme
  const { theme } = useTheme()

  useEffect(() => {
    if (!heroRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // 3) Decide opacities based on theme
  const isDark = theme === "dark"
  const leftOpacity = isDark ? 1 : 0.3
  const rightOpacity = isDark ? 1 : 0.3

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Left half animation (rotating in one direction) */}
      <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <HexagonAnimation
          opacity={leftOpacity}
          rotationSpeedY={0.003} // spins clockwise
        />
      </div>

      {/* Right half animation (rotating in the opposite direction) */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <HexagonAnimation
          opacity={rightOpacity}
          rotationSpeedY={-0.003} // spins counter-clockwise
        />
      </div>

      {/* 3D Background (optional) */}
      <Background3D
        color="hsl(var(--primary) / 0.6)"
        backgroundColor="transparent"
        mouseMultiplier={0.3}
      />

      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

      {/* Centered Hero Text */}
      <div className="container-wide relative z-10 mt-16" ref={textRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="title-xl mb-3">
              <span className="block font-light tracking-wider text-base uppercase text-primary mb-3"></span>
              <span className="block">Engineering the</span>
              <span className="block mt-2">
                Future of{" "}
                <RotatingText
                  words={["AI", "Data", "ML", "Cloud"]}
                  interval={2000}
                  className="text-gradient font-medium"
                />
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              <TypingAnimation
                text="Building innovative solutions at the intersection of software engineering, data science, and artificial intelligence."
                speed={15}
                delay={1500}
              />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary hover:border-primary/40 transition-all duration-500"
            >
              <Link href="/contact" className="px-8 py-6 text-base">
                Get in Touch
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Refined scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground font-light tracking-widest uppercase mb-3"></span>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], height: [20, 30, 20] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px bg-primary/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
