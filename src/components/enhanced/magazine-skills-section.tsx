"use client"
import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { 
  Code, Database, Server, Cloud, 
  Cpu, Braces, LineChart, Terminal,
  GitBranch, Layers, Globe, BarChart
} from "lucide-react"

// Skills data structure with icons
interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

type SkillsMap = Record<string, SkillItem[]>;

export function MagazineSkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Define your skills by category with icons
  const skillsMap: SkillsMap = useMemo(() => ({
    "Languages": [
      { name: "Python", icon: <Code size={16} /> },
      { name: "TypeScript", icon: <Braces size={16} /> },
      { name: "JavaScript", icon: <Braces size={16} /> },
      { name: "SQL", icon: <Database size={16} /> },
      { name: "Scala", icon: <Code size={16} /> },
      { name: "Java", icon: <Terminal size={16} /> },
      { name: "Go", icon: <Code size={16} /> }
    ],
    "Data Engineering": [
      { name: "Apache Spark", icon: <Cpu size={16} /> },
      { name: "Apache Kafka", icon: <Server size={16} /> },
      { name: "Apache Airflow", icon: <GitBranch size={16} /> },
      { name: "Apache Iceberg", icon: <Database size={16} /> },
      { name: "dbt", icon: <Database size={16} /> },
      { name: "Snowflake", icon: <Database size={16} /> },
      { name: "Trino/Presto", icon: <Database size={16} /> }
    ],
    "Machine Learning": [
      { name: "PyTorch", icon: <Cpu size={16} /> },
      { name: "TensorFlow", icon: <Cpu size={16} /> },
      { name: "Scikit-learn", icon: <LineChart size={16} /> },
      { name: "MLflow", icon: <GitBranch size={16} /> },
      { name: "Hugging Face", icon: <Cpu size={16} /> }
    ],
    "Cloud & DevOps": [
      { name: "AWS", icon: <Cloud size={16} /> },
      { name: "GCP", icon: <Cloud size={16} /> },
      { name: "Azure", icon: <Cloud size={16} /> },
      { name: "Kubernetes", icon: <Layers size={16} /> },
      { name: "Docker", icon: <Layers size={16} /> },
      { name: "Terraform", icon: <Server size={16} /> }
    ],
    "Web Technologies": [
      { name: "React", icon: <Globe size={16} /> },
      { name: "Next.js", icon: <Globe size={16} /> },
      { name: "Node.js", icon: <Server size={16} /> },
      { name: "GraphQL", icon: <Database size={16} /> },
      { name: "REST", icon: <Globe size={16} /> }
    ]
  }), []);

  return (
    <section className="py-12">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-2"
          >
            Technical Repertoire
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-light text-base text-muted-foreground italic max-w-xl mx-auto"
          >
            Technologies mastered through professional practice
          </motion.p>
        </div>
        
        <div className="space-y-12">
          {Object.entries(skillsMap).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category heading with editorial styling */}
              <div className="mb-4 relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.3 + 0.1 * categoryIndex }}
                  viewport={{ once: true }}
                  className="absolute top-1/2 left-0 right-0 h-px bg-border/70"
                />
                
                <motion.h3 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + 0.1 * categoryIndex }}
                  className="font-serif text-xl font-normal text-center relative inline-block bg-background px-6 mx-auto block"
                >
                  {category}
                </motion.h3>
              </div>
              
              {/* Skills layout - more compact with icons */}
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (index * 0.03) + (categoryIndex * 0.1),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div 
                      className={`
                        py-1.5 px-3 rounded-md flex items-center gap-1.5
                        transition-all duration-300 relative
                        ${hoveredSkill === skill.name 
                          ? "bg-primary/10 text-primary" 
                          : "border border-border/40 hover:border-primary/30"}
                      `}
                    >
                      {skill.icon && (
                        <span className={`
                          ${hoveredSkill === skill.name ? "text-primary" : "text-muted-foreground"}
                          transition-colors duration-300
                        `}>
                          {skill.icon}
                        </span>
                      )}
                      <span className="font-light text-sm tracking-wide whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Editorial footer element - smaller */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 pt-6 border-t border-border/30 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-light">
            Continually Expanding
          </p>
        </motion.div>
      </div>
    </section>
  );
}