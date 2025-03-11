import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProjectCard } from "@/components/enhanced/project-card"
import { AnimatedText } from "@/components/animations/animated-text"
import { projects } from "@/data/projects"
import { Background3D } from "@/components/enhanced/background-3d"

export const metadata = {
  title: 'Projects | Software Engineer Portfolio',
  description: 'Explore my latest software engineering, data, and AI projects.',
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Background3D color="#60A5FA" backgroundColor="transparent" mouseMultiplier={0.1} />
          </div>
          <div className="container-wide relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Projects" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                Explore my latest work in software engineering, data processing, and artificial intelligence.
              </p>
            </div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section className="py-24">
          <div className="container-wide">
            {/* Featured Projects */}
            <div className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter(project => project.featured)
                  .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      image={`/images/project-${index + 1}.svg`}
                      tags={project.tags}
                      github={project.github}
                      demo={project.demo}
                      slug={project.id}
                    />
                  ))}
              </div>
            </div>
            
            {/* All Projects */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter(project => !project.featured)
                  .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      image={`/images/project-${index + 3}.svg`}
                      tags={project.tags}
                      github={project.github}
                      demo={project.demo}
                      slug={project.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
