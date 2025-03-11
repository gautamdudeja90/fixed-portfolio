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
