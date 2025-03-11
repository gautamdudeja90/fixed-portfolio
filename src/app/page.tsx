import { EnhancedHeroSection } from "@/components/enhanced/hero-section"
import { ProjectCard } from "@/components/enhanced/project-card"
import { BlogCard } from "@/components/enhanced/blog-card"
import { AnimatedText } from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ParallaxSection } from "@/components/enhanced/parallax-section"
import { projects } from "@/data/projects"
import { blogPosts } from "@/data/blog-posts"
import { Background3D } from "@/components/enhanced/background-3d"

export default function Home() {
  // Get only featured projects
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)
  
  // Get only the latest 3 blog posts
  const latestBlogPosts = blogPosts.slice(0, 3)
  
  return (
    <>
      <Header />
      
      <main>
        <EnhancedHeroSection />
        
        {/* Featured Projects Section */}
        <section className="py-24 bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-16">
              <AnimatedText 
                text="Featured Projects" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                Discover some of my recent work in software engineering, data processing, and artificial intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={`/images/project-${index + 1}.svg`}
                  tags={project.tags}
                  github={project.github}
                  demo={project.demo}
                  slug={project.id}
                  priority={index === 0}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
              >
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Latest Blog Posts Section */}
        <ParallaxSection direction="up" speed={0.2} className="py-24">
          <div className="container-wide">
            <div className="text-center mb-16">
              <AnimatedText 
                text="Latest Articles" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                Insights and tutorials on software engineering, data science, and artificial intelligence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBlogPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readingTime={post.readingTime}
                  author={post.author}
                  slug={post.slug}
                  image={`/images/blog-${index + 1}.svg`}
                  tags={post.tags}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                size="lg" 
                asChild
              >
                <Link href="/blog">
                  Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </ParallaxSection>
        
        {/* Contact CTA Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 opacity-20">
            <Background3D color="#60A5FA" backgroundColor="transparent" mouseMultiplier={0.1} />
          </div>
          
          <div className="container-wide relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText 
                text="Let's Work Together" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
