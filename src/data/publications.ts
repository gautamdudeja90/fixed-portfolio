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
