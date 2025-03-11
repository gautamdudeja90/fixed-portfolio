"use client"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"  // Add this import

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-2xl font-normal mb-3 text-gradient"></h3>
            </Link>
            <p className="text-muted-foreground text-sm font-light tracking-wide max-w-xs leading-relaxed">
              A Software Engineer specializing in building exceptional digital
              experiences with a focus on AI, ML, and Data Engineering.
            </p>
            <div className="mt-6 flex space-x-4">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="mailto:hello@example.com"
                className="p-2 border border-border/50 rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-medium uppercase tracking-wide mb-5">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path} 
                    className={cn(
                      "text-sm font-light tracking-wide hover:text-primary transition-colors duration-300 animated-underline",
                      pathname === item.path ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-medium uppercase tracking-wide mb-5">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Resume", path: "/resume" },
                { name: "Publications", path: "/publications" },
                { name: "Speaking", path: "/speaking" },
                { name: "Mentoring", path: "/mentoring" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path} 
                    className="text-sm font-light tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 animated-underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground font-light mb-4 md:mb-0">
            © {currentYear} . All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Back to top <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}