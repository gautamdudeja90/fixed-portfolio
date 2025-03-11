import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"
import { TimelineItem } from "@/components/enhanced/timeline-item"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MagazineSkillsSection } from "@/components/enhanced/magazine-skills-section"
import { ParallaxSection } from "@/components/enhanced/parallax-section"
import { Background3D } from "@/components/enhanced/background-3d"

export const metadata = {
  title: 'About Me | Software Engineer Portfolio',
  description: 'Learn more about my background, skills, and experience as a software engineer.',
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL, CONCISE EXPERIENCE & EDUCATION
// ─────────────────────────────────────────────────────────────────────────────

const experiences = [
  {
    period: "Aug 2021 – Present",
    title: "Senior Software Engineer",
    company: "Apple, San Francisco, CA",
    description: `
I joined Apple in August 2021 to build a standardized data ingestion framework using Spark, Flink, Beam, and Iceberg, simplifying data workflows across teams. I developed monitoring with Grafana and Prometheus for clear pipeline metrics and led the implementation of a cross-platform catalog that supports Kafka, Hive, and S3. I also integrated DataHub to establish metadata governance, and optimized ML pipelines (XGBoost, SMOTE) with Spark and SageMaker to streamline analytics workloads.
`
  },
  {
    period: "Sep 2019 – Aug 2021",
    title: "Senior Software Engineer",
    company: "PayPal, San Francisco, CA",
    description: `
At PayPal, I created a data pipeline to manage event streams in a GCP-based data lake using DataFlow. I introduced schema discovery and management services to maintain consistent data models across multiple business units. I built a Docker + AWS analytics environment for standardized Python/R libraries, and contributed to PayPal’s recommendation system by handling both offline model training and real-time serving.
`
  },
  {
    period: "Jan 201? – Sep 2019",
    title: "Data Engineer",
    company: "Nielsen, Chicago, IL",
    description: `
While at Nielsen, I designed a scalable data ingestion platform with NiFi, Kafka, and Spark following a Lambda architecture for batch and streaming workloads. I focused on deduplication and identity resolution using Spark GraphFrames and TF-IDF, merging multi-source records accurately. This supported real-time audience pipelines and Elasticsearch-based targeting. I also implemented ML-Ops frameworks to support model training and deployment.
`
  }
]

const education = [
  {
    year: "Jan 2021 – May 2023",
    degree: "Master of Science in Analytics",
    field: "Major in Analytics",
    institution: "Georgia Institute of Technology"
  },
  {
    year: "Aug 2012 – Jul 2014",
    degree: "Master of Science in Computer Science & Eng.",
    field: "GPA: 4.00",
    institution: "Auburn University"
  },
  {
    year: "Aug 2008 – May 2012",
    degree: "Bachelor of Science in Electrical & Comp. Eng.",
    field: "GPA: 3.70",
    institution: "Auburn University"
  }
]

export default function AboutPage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedText 
                  text="Gautam Dudeja" 
                  tag="h1"
                  className="title-xl mb-6"
                />
                <p className="subtitle mb-6">
                  I&apos;m a software engineer specializing in building exceptional digital
                  experiences with a focus on AI, ML, and Data Engineering.
                </p>
                <p className="text-muted-foreground mb-6">
                  With over 11 years of experience, I&apos;ve worked on a wide range of projects
                  from real-time analytics platforms to machine learning systems, helping
                  organizations leverage their data to gain insights and build intelligent
                  applications.
                </p>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
                >
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative mx-auto md:ml-auto md:mr-0 w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Section - if needed, pass real data in place of [] */}
        <MagazineSkillsSection skills={[]} />
        
        {/* Career Timeline */}
        <section className="py-24">
          <div className="container-wide">
            <div className="text-center mb-16">
              <AnimatedText 
                text="Career Journey" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                A timeline of my professional experience.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {experiences.map((experience, index) => (
                <TimelineItem
                  key={index}
                  date={experience.period}
                  title={experience.title}
                  subtitle={experience.company}
                  description={experience.description}
                  last={index === experiences.length - 1}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <ParallaxSection direction="up" speed={0.2} className="py-24 bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-16">
              <AnimatedText 
                text="Education" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                My academic background and qualifications.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="bg-card p-8 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-lg text-primary font-mono mb-2">{edu.year}</div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{edu.degree}</h3>
                    <p className="text-muted-foreground mb-1">{edu.field}</p>
                    <p>{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ParallaxSection>
      </main>
      
      <Footer />
    </>
  )
}
