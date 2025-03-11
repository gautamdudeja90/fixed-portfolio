"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download, ArrowDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Path to your PDF resume
  const resumePath = "/sample-resume.pdf"
  
  // Scroll to PDF viewer
  const scrollToViewer = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Header />
      
      <main className="pt-20">
        
        {/* PDF Viewer Section */}
        <section 
          ref={sectionRef}
          className="py-16 bg-muted/10"
        >
          <div className="container-wide max-w-5xl">
            {/* Wrap container in a group for hover-based transformations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group rounded-xl overflow-hidden
                         border border-border/30 shadow-lg
                         hover:shadow-2xl hover:shadow-primary/30
                         transition-all duration-500"
            >
              {/* Subtle animated gradient behind the container */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 
                           opacity-30 group-hover:opacity-50 rounded-xl blur-md
                           pointer-events-none transition-opacity duration-500"
                layout
              />
              
              {/* Glass-like backdrop on hover */}
              <motion.div
                className="absolute inset-0 bg-white/5 group-hover:bg-white/10
                           backdrop-blur-lg backdrop-saturate-150
                           rounded-xl pointer-events-none transition-colors duration-500"
              />

              {/* PDF Viewer */}
              <div className="relative w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] z-10">
                {isClient ? (
                  <iframe
                    src={`${resumePath}#view=Fit&toolbar=0&navpanes=0`}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    style={{ border: 'none' }}
                    title="Resume PDF Viewer"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <p>Loading PDF viewer...</p>
                  </div>
                )}
              </div>
              
              {/* Viewer Controls */}
              <div className="relative z-20 p-6 border-t border-border/30 bg-muted/10 rounded-b-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-muted-foreground font-light">
                    Use the controls below to navigate, zoom, or download the PDF.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="text-xs"
                    >
                      <a href={resumePath} target="_blank" rel="noopener noreferrer">
                        Open in New Tab <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      asChild
                      className="text-xs"
                    >
                      <a href={resumePath} download>
                        Download <Download className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 text-center max-w-2xl mx-auto"
            >
              <p className="text-muted-foreground mb-6">
                For more details about my work and projects, please explore the other sections of my portfolio or contact me directly.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <a href="/projects">
                    View Projects
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <a href="/contact">
                    Contact Me
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
