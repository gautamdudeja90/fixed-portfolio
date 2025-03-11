// src/components/enhanced/radial-skill-section.tsx

"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Skill } from "@/data/skills"

interface RadialSkillSectionProps {
  skillGroup: Skill;
  index: number;
}

export function RadialSkillSection({ skillGroup, index }: RadialSkillSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="mb-16"
    >
      <div className="mb-8 text-center">
        <h3 className="font-serif text-2xl font-normal inline-block relative">
          {skillGroup.category}
          <motion.div
            className="absolute -bottom-1 left-0 h-px bg-primary"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          />
        </h3>
      </div>
      
      <div className="relative">
        {/* Radial background */}
        <div className="absolute inset-0 rounded-lg bg-gradient-radial from-primary/5 to-transparent opacity-70" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10 p-8">
          {skillGroup.items.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 + skillIndex * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-background/60 backdrop-blur-sm rounded-md border border-border/30 p-5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">{skill.name}</h4>
                <div className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {skill.level}%
                </div>
              </div>
              
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + skillIndex * 0.1 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}