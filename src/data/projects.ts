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
