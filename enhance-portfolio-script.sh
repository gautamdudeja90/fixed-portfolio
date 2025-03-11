#!/bin/bash
set -e

echo "✨ Enhancing portfolio site with advanced visual features..."

# Make sure we're in the fixed-portfolio directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this script from your fixed-portfolio directory!"
  exit 1
fi

# Install additional advanced dependencies
echo "📦 Installing advanced visual dependencies..."
npm install three @react-three/fiber @react-three/drei vanta locomotive-scroll @tailwindcss/aspect-ratio smooth-scrollbar react-markdown rehype-raw prism-react-renderer date-fns react-tilt --legacy-peer-deps

# Create data directory for sample data
mkdir -p src/data

# Create projects data
echo "📊 Creating project data..."
cat > src/data/projects.ts << 'EOL'
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "real-time-analytics",
    title: "Real-time Analytics Dashboard",
    description: "A real-time analytics dashboard built with Next.js, Apache Kafka, and Apache Druid.",
    longDescription: `
      This project is a comprehensive real-time analytics dashboard that processes millions of events per second. 
      
      ## Features
      
      - Real-time data processing with Apache Kafka
      - Fast analytical queries with Apache Druid
      - Interactive visualizations with D3.js
      - Responsive UI built with Next.js and Tailwind CSS
      
      ## Technical Details
      
      The system uses Kafka for event ingestion, processes the data with Kafka Streams, and stores the results in Druid for fast analytical queries. The frontend is built with Next.js and uses D3.js for visualizations.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Next.js", "Kafka", "Druid", "D3.js", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "ml-pipeline",
    title: "ML Pipeline Orchestration",
    description: "A scalable ML pipeline orchestration system using Airflow, MLflow, and Kubernetes.",
    longDescription: `
      This project is a complete ML pipeline orchestration system that scales to handle large-scale machine learning workloads.
      
      ## Features
      
      - Workflow orchestration with Airflow
      - Experiment tracking with MLflow
      - Scalable training with Kubernetes
      - Model versioning and deployment
      
      ## Technical Details
      
      The system uses Airflow for orchestrating the entire ML workflow, from data extraction to model deployment. MLflow is used for experiment tracking and model registry. The training jobs are executed on a Kubernetes cluster for scalability.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Python", "Airflow", "MLflow", "Kubernetes", "TensorFlow"],
    github: "https://github.com",
    featured: true,
  },
  {
    id: "data-lake",
    title: "Cloud-Native Data Lake",
    description: "A modern data lake built on cloud infrastructure with Iceberg and Spark.",
    longDescription: `
      This project implements a modern cloud-native data lake architecture using Apache Iceberg for table format and Apache Spark for processing.
      
      ## Features
      
      - ACID transactions on data lake
      - Schema evolution
      - Time travel and versioning
      - Optimized for cloud storage
      
      ## Technical Details
      
      The data lake is built using Apache Iceberg as the table format, which provides ACID transactions, schema evolution, and time travel capabilities. Apache Spark is used for data processing, and the entire system is deployed on cloud infrastructure.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Spark", "Iceberg", "AWS", "Data Lake", "Python"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "transformer-nlp",
    title: "Transformer-based NLP Service",
    description: "An API service for natural language processing tasks using transformer-based models.",
    longDescription: `
      This project provides a scalable API service for various NLP tasks using state-of-the-art transformer models.
      
      ## Features
      
      - Text classification
      - Named entity recognition
      - Sentiment analysis
      - Question answering
      
      ## Technical Details
      
      The service is built using FastAPI and Hugging Face Transformers. It's deployed as microservices on Kubernetes with an efficient model serving architecture that includes caching and batching for optimal performance.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Python", "NLP", "Transformers", "FastAPI", "Kubernetes"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "recommendation-engine",
    title: "Large-Scale Recommendation Engine",
    description: "A recommendation engine that handles millions of users and items using collaborative filtering and deep learning.",
    longDescription: `
      This recommendation engine combines collaborative filtering techniques with deep learning models to provide personalized recommendations for millions of users.
      
      ## Features
      
      - Hybrid recommendation approach
      - Real-time personalization
      - A/B testing framework
      - Feature store integration
      
      ## Technical Details
      
      The recommendation engine uses matrix factorization and neural collaborative filtering models implemented with PyTorch. The system is designed to handle large-scale data with efficient retrieval mechanisms and near real-time updates.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Python", "PyTorch", "Redis", "Feature Store", "A/B Testing"],
    github: "https://github.com",
    featured: false,
  },
  {
    id: "llm-agent-framework",
    title: "LLM Agent Framework",
    description: "A framework for building autonomous agents using large language models with tool-use capabilities.",
    longDescription: `
      This framework enables developers to build autonomous agents powered by large language models that can use tools and interact with external systems.
      
      ## Features
      
      - Tool use framework
      - Memory management
      - Planning and reasoning
      - Multi-agent communication
      
      ## Technical Details
      
      The framework integrates with various LLM providers (OpenAI, Anthropic, open-source models) and provides abstractions for tool definition, memory systems, and agent workflows. It includes components for planning, reasoning, and self-reflection.
    `,
    image: "/images/project-placeholder.jpg",
    tags: ["Python", "LLM", "Agents", "TypeScript", "JavaScript"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: false,
  }
];
EOL

# Create blog post data
echo "📝 Creating blog post data..."
cat > src/data/blog-posts.ts << 'EOL'
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
  readingTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-spark-jobs",
    title: "Optimizing Spark Jobs for Large-Scale Data Processing",
    date: "2025-03-01",
    author: "John Doe",
    excerpt: "Learn how to optimize your Apache Spark jobs for processing petabytes of data efficiently.",
    content: `
# Optimizing Spark Jobs for Large-Scale Data Processing

Processing massive datasets with Apache Spark can be challenging. In this article, I'll share some best practices for optimizing Spark jobs based on my experience working with petabyte-scale data.

## Understanding Spark's Execution Model

Before diving into optimization techniques, it's essential to understand how Spark executes jobs. Spark breaks down jobs into stages, which are further divided into tasks. Tasks are distributed across executor nodes in the cluster.

\`\`\`scala
// Example Spark job
val data = spark.read.parquet("s3://my-bucket/data")
val filtered = data.filter($"value" > 100)
val aggregated = filtered.groupBy($"key").agg(sum($"value").as("total"))
aggregated.write.parquet("s3://my-bucket/output")
\`\`\`

## Key Optimization Techniques

### 1. Partitioning

Proper partitioning is crucial for performance. Too few partitions can lead to underutilization, while too many can cause overhead.

\`\`\`scala
// Repartition data for better parallelism
val repartitioned = data.repartition(numPartitions)
\`\`\`

### 2. Caching and Persistence

Cache intermediate datasets that are used multiple times to avoid recomputation.

\`\`\`scala
// Cache frequently accessed data
filtered.cache()
\`\`\`

### 3. Broadcast Joins

For joining large tables with small tables, use broadcast joins.

\`\`\`scala
import org.apache.spark.sql.functions.broadcast
val result = largeTable.join(broadcast(smallTable), "key")
\`\`\`

## Monitoring and Tuning

Always monitor your Spark application using the Spark UI. Look for:

- Skewed partitions
- Spill to disk
- GC pressure
- Serialization issues

## Conclusion

Optimizing Spark jobs is an iterative process. Start with understanding your data and query patterns, then apply these techniques systematically while monitoring performance.
    `,
    image: "/images/blog-placeholder.jpg",
    readingTime: "8 min read",
    tags: ["Apache Spark", "Big Data", "Performance", "Optimization"],
  },
  {
    slug: "introduction-to-llms",
    title: "Introduction to Large Language Models for Engineers",
    date: "2025-02-15",
    author: "Jane Smith",
    excerpt: "An engineering-focused introduction to large language models and how they can be leveraged in applications.",
    content: `
# Introduction to Large Language Models for Engineers

Large Language Models (LLMs) have revolutionized natural language processing and opened up new possibilities for building AI-powered applications. This article provides an engineering perspective on LLMs.

## What are Large Language Models?

LLMs are deep learning models trained on vast amounts of text data to predict the next word in a sequence. Models like GPT-4, Claude, and Llama have billions or even trillions of parameters.

## Key Concepts

### 1. Tokenization

Before processing text, LLMs convert it into tokens, which can be words, subwords, or characters.

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")
tokens = tokenizer.encode("Hello, world!")
print(tokens)  # [15496, 11, 995, 0]
\`\`\`

### 2. Transformer Architecture

Most modern LLMs use the transformer architecture, which relies on attention mechanisms to process text.

### 3. Few-Shot Learning

LLMs can learn from just a few examples provided in the prompt.

\`\`\`
Classify the sentiment (positive/negative):

Text: I love this product!
Sentiment: positive

Text: This is terrible.
Sentiment: negative

Text: The service was outstanding.
Sentiment:
\`\`\`

## Integrating LLMs in Applications

### Using APIs

The simplest way to integrate LLMs is through APIs like OpenAI's API.

\`\`\`python
import openai

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms"}
    ]
)
print(response.choices[0].message.content)
\`\`\`

### Running Models Locally

For applications requiring privacy or lower latency, you can run smaller models locally.

\`\`\`python
from transformers import pipeline

generator = pipeline('text-generation', model='llama2-7b')
result = generator("Explain the concept of recursion in programming:")
print(result[0]['generated_text'])
\`\`\`

## Considerations for Engineering

When working with LLMs, consider:

1. **Latency**: LLMs can be slow for real-time applications
2. **Cost**: API calls and computing resources can be expensive
3. **Hallucinations**: LLMs can generate plausible but incorrect information
4. **Prompt Engineering**: Writing effective prompts is crucial

## Conclusion

LLMs offer powerful capabilities for processing and generating natural language. Understanding their strengths and limitations is essential for integrating them effectively into your applications.
    `,
    image: "/images/blog-placeholder.jpg",
    readingTime: "10 min read",
    tags: ["AI", "LLMs", "NLP", "Machine Learning"],
  },
  {
    slug: "data-lake-design",
    title: "Designing a Modern Data Lake Architecture",
    date: "2025-01-20",
    author: "Alex Chen",
    excerpt: "Best practices for designing a scalable and maintainable data lake architecture using open-source technologies.",
    content: `
# Designing a Modern Data Lake Architecture

Data lakes have evolved significantly over the past decade. This article explores the key considerations for designing a modern data lake architecture that is scalable, maintainable, and cost-effective.

## The Challenges of Traditional Data Lakes

Traditional data lakes often suffer from several issues:

- **Data swamps**: Poor organization leads to unusable data
- **Schema drift**: Changing data structures break downstream processes
- **Performance issues**: Inefficient querying and processing
- **Governance problems**: Lack of metadata and lineage tracking

## Key Components of a Modern Data Lake

### 1. Table Formats

Modern table formats like Apache Iceberg, Delta Lake, and Apache Hudi provide:

- ACID transactions
- Schema evolution
- Time travel capabilities
- Efficient metadata handling

Here's an example of creating an Iceberg table:

\`\`\`sql
CREATE TABLE my_catalog.my_schema.my_table (
  id bigint,
  data string,
  ts timestamp
)
USING iceberg
PARTITIONED BY (days(ts))
\`\`\`

### 2. Storage Organization

A well-organized storage structure is crucial:

- **Raw zone**: Store data in its original format
- **Curated zone**: Cleansed and transformed data
- **Consumption zone**: Optimized for specific use cases

### 3. Processing Engines

Flexible processing engines for different workloads:

- **Batch processing**: Apache Spark, Trino
- **Stream processing**: Apache Flink, Spark Structured Streaming
- **Interactive queries**: Trino, Dremio

### 4. Metadata Management

Comprehensive metadata management:

- **Technical metadata**: Schemas, partitions, statistics
- **Business metadata**: Descriptions, owners, classifications
- **Operational metadata**: Job runs, data quality metrics

## Cloud-Native Considerations

For cloud deployments, consider:

- Separation of storage and compute
- Auto-scaling capabilities
- Cost management through careful service selection
- Data transfer costs between regions

## Example Architecture

A modern data lake architecture might include:

1. **Ingestion layer**: Kafka or cloud service (Kinesis, Pub/Sub)
2. **Storage layer**: S3, ADLS, or GCS with Iceberg
3. **Processing layer**: EMR, Databricks, or Dataproc
4. **Serving layer**: Trino, Athena, or BigQuery
5. **Catalog layer**: AWS Glue, Hive Metastore, or Dataproc Metastore

## Conclusion

Building a modern data lake requires careful consideration of table formats, storage organization, processing engines, and metadata management. By adopting open standards and focusing on maintainability, you can create a data lake that delivers value for years to come.
    `,
    image: "/images/blog-placeholder.jpg",
    readingTime: "12 min read",
    tags: ["Data Lake", "Apache Iceberg", "Data Engineering", "Cloud", "Architecture"],
  }
];
EOL

# Create publications data
echo "📚 Creating publications data..."
cat > src/data/publications.ts << 'EOL'
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: number;
  abstract: string;
  link?: string;
  doi?: string;
}

export const publications: Publication[] = [
  {
    id: "efficient-streaming",
    title: "Efficient Streaming Analytics: A Novel Approach to Real-Time Data Processing",
    authors: ["John Doe", "Jane Smith", "Robert Johnson"],
    conference: "IEEE International Conference on Big Data",
    year: 2024,
    abstract: "This paper presents a novel approach to real-time data processing that improves throughput by 40% while reducing latency by 30%. Our method combines optimized windowing techniques with a new scheduling algorithm that prioritizes critical data paths.",
    link: "https://example.com/paper1",
    doi: "10.1109/BD.2024.1234567",
  },
  {
    id: "distributed-ml",
    title: "Distributed Machine Learning on Edge Devices: Challenges and Solutions",
    authors: ["John Doe", "Alice Williams"],
    conference: "ACM Conference on Machine Learning Systems",
    year: 2023,
    abstract: "We explore the challenges of deploying machine learning models on resource-constrained edge devices in a distributed setting. Our research proposes a novel framework for model partitioning and communication optimization that enables complex models to run efficiently on edge networks.",
    link: "https://example.com/paper2",
    doi: "10.1145/ML.2023.9876543",
  },
  {
    id: "data-quality",
    title: "Automated Data Quality Assessment for Machine Learning Pipelines",
    authors: ["John Doe", "Michael Chen", "Sarah Johnson"],
    conference: "VLDB Conference",
    year: 2022,
    abstract: "We present an automated framework for assessing and improving data quality in machine learning pipelines. Our approach uses statistical methods and domain knowledge to detect anomalies, missing values, and inconsistencies in training data, significantly improving model performance and reliability.",
    link: "https://example.com/paper3",
    doi: "10.14778/VLDB.2022.123456",
  },
];
EOL

# Create skill data
echo "📊 Creating skills data..."
cat > src/data/skills.ts << 'EOL'
export interface Skill {
  category: string;
  items: {
    name: string;
    level: number;
  }[];
}

export const skills: Skill[] = [
  {
    category: "Data Engineering",
    items: [
      { name: "Apache Spark", level: 95 },
      { name: "Apache Flink", level: 90 },
      { name: "Apache Kafka", level: 88 },
      { name: "Trino/Presto", level: 85 },
      { name: "Apache Iceberg", level: 90 },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Scikit-learn", level: 90 },
      { name: "MLflow", level: 85 },
      { name: "Hugging Face", level: 80 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Python", level: 95 },
      { name: "Scala", level: 85 },
      { name: "Java", level: 80 },
      { name: "TypeScript", level: 90 },
      { name: "SQL", level: 92 },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 90 },
      { name: "Kubernetes", level: 85 },
      { name: "Docker", level: 92 },
      { name: "Terraform", level: 80 },
      { name: "CI/CD", level: 88 },
    ],
  },
];

export const experiences = [
  {
    period: "2023 - Present",
    title: "Senior Data Engineer",
    company: "Tech Innovation Inc.",
    description: "Leading the design and implementation of data pipelines and distributed systems that process petabytes of data daily.",
  },
  {
    period: "2020 - 2023",
    title: "Machine Learning Engineer",
    company: "AI Solutions Ltd.",
    description: "Developed and deployed machine learning models for recommendation systems and natural language processing applications.",
  },
  {
    period: "2018 - 2020",
    title: "Software Engineer",
    company: "Digital Products Co.",
    description: "Built scalable backend services and APIs for high-traffic web applications using Node.js and Python.",
  },
];

export const education = [
  {
    degree: "Master of Science",
    field: "Computer Science, Specialization in Machine Learning",
    institution: "University of Technology",
    year: "2018",
  },
  {
    degree: "Bachelor of Science",
    field: "Computer Engineering",
    institution: "State University",
    year: "2016",
  },
];
EOL

# Create placeholder images directory
mkdir -p public/images
echo "🖼️ Creating placeholder images..."

# Create project placeholders
for i in {1..6}; do
  cat > public/images/project-${i}.svg << EOL
<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#1F2937"/>
  <rect width="800" height="450" fill="url(#paint0_linear)" />
  <text x="400" y="225" font-family="Arial" font-size="48" fill="#E5E7EB" text-anchor="middle" dominant-baseline="middle">Project ${i}</text>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
      <stop stop-color="#111827"/>
      <stop offset="1" stop-color="#374151"/>
    </linearGradient>
  </defs>
</svg>
EOL
done

# Create blog placeholders
for i in {1..3}; do
  cat > public/images/blog-${i}.svg << EOL
<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="#1F2937"/>
  <rect width="800" height="450" fill="url(#paint0_linear)" />
  <text x="400" y="225" font-family="Arial" font-size="48" fill="#E5E7EB" text-anchor="middle" dominant-baseline="middle">Blog Post ${i}</text>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
      <stop stop-color="#111827"/>
      <stop offset="1" stop-color="#4B5563"/>
    </linearGradient>
  </defs>
</svg>
EOL
done

# Create a profile image placeholder
cat > public/images/profile.svg << 'EOL'
<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="250" cy="250" r="250" fill="url(#paint0_radial)"/>
  <circle cx="250" cy="180" r="80" fill="#E5E7EB"/>
  <path d="M130 350C130 280 190 250 250 250C310 250 370 280 370 350" fill="#E5E7EB"/>
  <defs>
    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 250) rotate(90) scale(250)">
      <stop stop-color="#1F2937"/>
      <stop offset="1" stop-color="#111827"/>
    </radialGradient>
  </defs>
</svg>
EOL

# Create sample resume PDF
echo "📄 Creating sample resume PDF..."
cat > public/sample-resume.pdf << 'EOL'
%PDF-1.4
1 0 obj
<< /Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<< /Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<< /Type /Page
/Parent 2 0 R
/Resources 4 0 R
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<< /Font << /F1 6 0 R >>
>>
endobj
5 0 obj
<< /Length 115 >>
stream
BT
/F1 24 Tf
100 700 Td
(Sample Resume) Tj
/F1 12 Tf
0 -50 Td
(This is a placeholder for a real resume PDF.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
xref
0 7
0000000000 65535 f
0000000010 00000 n
0000000059 00000 n
0000000118 00000 n
0000000220 00000 n
0000000261 00000 n
0000000426 00000 n
trailer
<< /Size 7
/Root 1 0 R
>>
startxref
493
%%EOF
EOL

# Create enhanced components
mkdir -p src/components/enhanced

# Create ParallaxSection component
echo "✨ Creating enhanced visual components..."
cat > src/components/enhanced/parallax-section.tsx << 'EOL'
"use client"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
  offset?: number
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
  offset = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -speed : speed
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + 100 * factor])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
EOL

# Create AnimatedSkillBar component
cat > src/components/enhanced/animated-skill-bar.tsx << 'EOL'
"use client"
import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedSkillBarProps {
  label: string
  percentage: number
  color?: string
  className?: string
  delay?: number
}

export function AnimatedSkillBar({
  label,
  percentage,
  color = "bg-primary",
  className,
  delay = 0,
}: AnimatedSkillBarProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("mb-6", className)} ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.4, delay: delay + 0.6 },
            },
          }}
          className="text-muted-foreground"
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", color)}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { width: 0 },
            visible: {
              width: `${percentage}%`,
              transition: { 
                duration: 1, 
                delay, 
                ease: [0.33, 1, 0.68, 1] 
              },
            },
          }}
        />
      </div>
    </div>
  )
}
EOL

# Create TimelineItem component
cat > src/components/enhanced/timeline-item.tsx << 'EOL'
"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineItemProps {
  date: string
  title: string
  subtitle?: string
  description?: string
  last?: boolean
  delay?: number
}

export function TimelineItem({
  date,
  title,
  subtitle,
  description,
  last = false,
  delay = 0,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-10 pb-10",
        last && "pb-0"
      )}
    >
      {/* Timeline line */}
      {!last && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : { height: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20"
        />
      )}
      
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay }}
        className="absolute left-0 top-5 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="w-3 h-3 rounded-full bg-primary"
        />
      </motion.div>
      
      {/* Content */}
      <div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
          className="inline-block px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm font-medium mb-2"
        >
          {date}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="font-serif text-xl font-semibold mb-1"
        >
          {title}
        </motion.h3>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
            className="text-muted-foreground mb-1"
          >
            {subtitle}
          </motion.p>
        )}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: delay + 0.4 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}
EOL

# Create ProjectCard component with hover effects
cat > src/components/enhanced/project-card.tsx << 'EOL'
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
EOL

# Create BlogCard component with hover effects
cat > src/components/enhanced/blog-card.tsx << 'EOL'
"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  readingTime: string
  author: string
  slug: string
  image?: string
  tags?: string[]
}

export function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  author,
  slug,
  image = "/images/blog-placeholder.jpg",
  tags = [],
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/blog/${slug}`}>
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300 border-border/50 h-full",
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
              className={cn(
                "object-cover transition-transform duration-700",
                isHovered && "scale-105"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
            
            {/* Tags overlay */}
            {tags && tags.length > 0 && (
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag) => (
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
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{readingTime}</span>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
              {excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">By {author}</div>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={isHovered ? { opacity: 1, width: "30%" } : { opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="h-0.5 bg-gradient-to-r from-primary to-primary/0"
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
EOL

# Create PublicationCard component
cat > src/components/enhanced/publication-card.tsx << 'EOL'
"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PublicationCardProps {
  title: string
  authors: string[]
  conference: string
  year: number
  abstract: string
  link?: string
  doi?: string
  delay?: number
}

export function PublicationCard({
  title,
  authors,
  conference,
  year,
  abstract,
  link,
  doi,
  delay = 0,
}: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 border-border/50",
          isHovered && "shadow-lg border-primary/20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <h2 className="font-serif text-xl font-bold mb-2 group flex items-start gap-2">
            {title}
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-muted-foreground hover:text-primary transition-colors mt-1 shrink-0"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </h2>
          
          <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground mb-4 gap-2 md:gap-4">
            <div>{authors.join(", ")}</div>
            <div className="hidden md:block text-primary/50">•</div>
            <div>{conference}</div>
            <div className="hidden md:block text-primary/50">•</div>
            <div>{year}</div>
            {doi && (
              <>
                <div className="hidden md:block text-primary/50">•</div>
                <div className="font-mono text-xs">{doi}</div>
              </>
            )}
          </div>
          
          <motion.div
            initial={{ height: "4.5rem" }}
            animate={{ height: isExpanded ? "auto" : "4.5rem" }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <p className={cn(
              "text-sm transition-opacity duration-300",
              !isExpanded && "line-clamp-3"
            )}>
              {abstract}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent" />
            )}
          </motion.div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
EOL

# Create 3D background component
cat > src/components/enhanced/background-3d.tsx << 'EOL'
"use client"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface Background3DProps {
  className?: string
  color?: string
  backgroundColor?: string
  mouseMultiplier?: number
  showPoints?: boolean
}

export function Background3D({
  className,
  color = "#3B82F6",
  backgroundColor = "transparent",
  mouseMultiplier = 0.4,
  showPoints = true,
}: Background3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const animationFrameId = useRef<number>()
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const posArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Create lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.2,
    })
    
    const linesGeometry = new THREE.BufferGeometry()
    const linesArray = new Float32Array(particlesCount * 3)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      linesArray[i] = posArray[i]
      linesArray[i + 1] = posArray[i + 1]
      linesArray[i + 2] = posArray[i + 2]
    }
    
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesArray, 3))
    const linesMesh = new THREE.Line(linesGeometry, linesMaterial)
    scene.add(linesMesh)
    
    // Animation
    const animate = () => {
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      
      linesMesh.rotation.x = particlesMesh.rotation.x
      linesMesh.rotation.y = particlesMesh.rotation.y
      
      renderer.render(scene, camera)
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animate()
    setIsLoaded(true)
    
    // Mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      mouse.current.x = ((event.clientX - rect.left) / width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / height) * 2 + 1
      
      particlesMesh.rotation.x += mouse.current.y * 0.001 * mouseMultiplier
      particlesMesh.rotation.y += mouse.current.x * 0.001 * mouseMultiplier
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      
      renderer.setSize(newWidth, newHeight)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [color, backgroundColor, mouseMultiplier, showPoints])
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full",
        isLoaded ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000",
        className
      )}
    />
  )
}
EOL

# Create TypingAnimation component
cat > src/components/enhanced/typing-animation.tsx << 'EOL'
"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  cursorClassName?: string
  showCursor?: boolean
  cursorBlinkSpeed?: number
}

export function TypingAnimation({
  text,
  className,
  speed = 40,
  delay = 0,
  cursorClassName,
  showCursor = true,
  cursorBlinkSpeed = 800,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setDisplayedText("")
    setIsTypingComplete(false)
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        animateText()
      }, delay)
    } else {
      animateText()
    }
    
    function animateText() {
      let currentIndex = 0
      const textLength = text.length
      
      function typeCharacter() {
        if (currentIndex < textLength) {
          setDisplayedText(prev => prev + text.charAt(currentIndex))
          currentIndex++
          timeoutRef.current = setTimeout(typeCharacter, speed)
        } else {
          setIsTypingComplete(true)
        }
      }
      
      typeCharacter()
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, delay])
  
  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {showCursor && (
        <motion.span
          className={cn(
            "inline-block w-[0.1em] h-[1.2em] bg-current translate-y-[0.1em] mx-[0.04em]",
            cursorClassName
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypingComplete ? [0, 1] : 1 }}
          transition={isTypingComplete ? { 
            duration: 0.01, 
            repeat: Infinity, 
            repeatType: "reverse", 
            repeatDelay: cursorBlinkSpeed / 1000 / 2 
          } : {}}
        />
      )}
    </span>
  )
}
EOL

# Create RotatingText component
cat > src/components/enhanced/rotating-text.tsx << 'EOL'
"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  words: string[]
  className?: string
  interval?: number
  transitionDuration?: number
}

export function RotatingText({
  words,
  className,
  interval = 3000,
  transitionDuration = 0.5,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [words, interval])
  
  if (!isMounted) {
    return <span className={className}>{words[0]}</span>
  }
  
  return (
    <span className={cn("inline-block relative", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: transitionDuration }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
EOL

# Create enhanced hero section component
cat > src/components/enhanced/hero-section.tsx << 'EOL'
"use client"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Background3D } from "@/components/enhanced/background-3d"
import { TypingAnimation } from "@/components/enhanced/typing-animation"
import { RotatingText } from "@/components/enhanced/rotating-text"
import gsap from "gsap"

export function EnhancedHeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Background3D className="opacity-40" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background pointer-events-none" />

      {/* Content */}
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
            className="mb-6 font-serif"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block">Engineering the</span>
              <span className="block mt-2">
                Future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  <RotatingText
                    words={["AI", "Data", "ML", "Cloud"]}
                    interval={2000}
                  />
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
            >
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-0.5 h-10 bg-muted-foreground/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
EOL

# Update homepage with enhanced components
echo "🏠 Updating homepage with enhanced visual components..."
cat > src/app/page.tsx << 'EOL'
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
EOL

# Create enhanced about page with animations and interactive timeline
echo "👤 Creating enhanced about page..."
cat > src/app/about/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"
import { AnimatedSkillBar } from "@/components/enhanced/animated-skill-bar"
import { TimelineItem } from "@/components/enhanced/timeline-item"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { skills, experiences, education } from "@/data/skills"
import { ParallaxSection } from "@/components/enhanced/parallax-section"
import { Background3D } from "@/components/enhanced/background-3d"

export const metadata = {
  title: 'About Me | Software Engineer Portfolio',
  description: 'Learn more about my background, skills, and experience as a software engineer.',
}

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
                  text="About Me" 
                  tag="h1"
                  className="title-xl mb-6"
                />
                <p className="subtitle mb-6">
                  I'm a software engineer specializing in building exceptional digital
                  experiences with a focus on AI, ML, and Data Engineering.
                </p>
                <p className="text-muted-foreground mb-6">
                  With over 7 years of experience, I've worked on a wide range of projects
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
                    src="/images/profile.svg"
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
        
        {/* Skills Section */}
        <ParallaxSection direction="up" speed={0.2} className="py-24 bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-16">
              <AnimatedText 
                text="Skills & Expertise" 
                tag="h2"
                className="title-lg mb-4"
              />
              <p className="subtitle max-w-2xl mx-auto">
                Technologies and tools I've worked with extensively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {skills.map((skillGroup, groupIndex) => (
                <div key={skillGroup.category}>
                  <h3 className="font-serif text-2xl font-bold mb-6">{skillGroup.category}</h3>
                  <div className="space-y-6">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <AnimatedSkillBar
                        key={skill.name}
                        label={skill.name}
                        percentage={skill.level}
                        delay={0.1 * skillIndex}
                        color={groupIndex % 2 === 0 ? "bg-primary" : "bg-blue-500"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ParallaxSection>
        
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
EOL

# Create enhanced projects page with animations and interactions
echo "📱 Creating enhanced projects page..."
cat > src/app/projects/page.tsx << 'EOL'
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
EOL

# Create enhanced publications page
echo "📚 Creating enhanced publications page..."
cat > src/app/publications/page.tsx << 'EOL'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimatedText } from "@/components/animations/animated-text"
import { PublicationCard } from "@/components/enhanced/publication-card"
import { publications } from "@/data/publications"
import { Background3D } from "@/components/enhanced/background-3d"

export const metadata = {
  title: 'Publications | Software Engineer Portfolio',
  description: 'My research publications and papers in the fields of data engineering, machine learning, and software engineering.',
}

export default function PublicationsPage() {
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
                text="Publications" 
                tag="h1"
                className="title-xl mb-6"
              />
              <p className="subtitle">
                My research publications and papers in the fields of data engineering, machine learning, and software engineering.
              </p>
            </div>
          </div>
        </section>
        
        {/* Publications List */}
        <section className="py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto space-y-8">
              {publications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  title={publication.title}
                  authors={publication.authors}
                  conference={publication.conference}
                  year={publication.year}
                  abstract={publication.abstract}
                  link={publication.link}
                  doi={publication.doi}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
EOL

# Update Docker environment and serve
echo "🐳 Updating Docker environment..."
cat > Dockerfile << 'EOL'
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
EOL

echo "✅ Portfolio site enhancement complete!"
echo ""
echo "🚀 Your portfolio site now includes:"
echo "  ✓ Stunning 3D animated backgrounds"
echo "  ✓ Parallax scrolling effects"
echo "  ✓ Interactive project cards with hover effects"
echo "  ✓ Animated typing and rotating text effects"
echo "  ✓ Beautiful publication cards with expandable abstracts"
echo "  ✓ Interactive timeline for career history"
echo "  ✓ Animated skill bars with staggered animations"
echo "  ✓ Bold, magazine-inspired typography and spacing"
echo ""
echo "🌐 To view your enhanced site, run:"
echo "  docker-compose up --build"
echo ""
echo "🧠 This site now matches the high-end Vogue-inspired aesthetic"
echo "   specified in the original prompt."
echo ""
echo "You can continue to enhance this foundation with more pages"
echo "and features as needed."
