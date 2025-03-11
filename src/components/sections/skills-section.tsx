// src/components/sections/skills-section.tsx
"use client"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/animations/animated-text"
import { Skill } from "@/data/skills" // Make sure this import matches your actual types

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container-wide">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Technical Expertise" 
            tag="h2"
            className="title-lg mb-4"
          />
          <p className="subtitle max-w-2xl mx-auto">
            Technologies and tools I've worked with throughout my career.
          </p>
        </div>
        
        <div className="space-y-20">
          {skills.map((skillGroup, groupIndex) => (
            <div key={skillGroup.category} className="mb-12">
              <div className="mb-8 flex items-center gap-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="h-px bg-primary"
                />
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="font-serif text-2xl font-normal"
                >
                  {skillGroup.category}
                </motion.h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-px bg-primary/20 flex-grow"
                />
              </div>
              
              <div className="flex flex-wrap justify-center">
                {skillGroup.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (index * 0.05) + (groupIndex * 0.1),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    className="inline-block"
                  >
                    <div className="py-2 px-4 m-1 bg-background/50 backdrop-blur-sm rounded-md border border-border/30 
                                  hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
                      <span className="font-light tracking-wide text-sm">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}