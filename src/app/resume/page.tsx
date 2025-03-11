import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"

export const metadata = {
  title: 'Resume | Software Engineer Portfolio',
  description: 'View and download my professional resume.',
}

export default function ResumePage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedText 
                text="Resume" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                My professional experience, skills, and qualifications.
              </p>
            </div>
          </div>
        </section>
        
        {/* Placeholder Content */}
        <section className="py-16">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto prose dark:prose-invert">
              <p>
                This is a placeholder page for your resume. Replace this content with your actual resume information.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
