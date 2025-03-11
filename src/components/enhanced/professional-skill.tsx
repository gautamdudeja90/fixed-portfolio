// First, create this new component file:
// src/components/enhanced/professional-skill.tsx

"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProfessionalSkillProps {
  name: string;
  level: number;
  index: number;
}

export function ProfessionalSkill({ name, level, index }: ProfessionalSkillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Map the level (0-100) to descriptive text
  const getExpertiseLevel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Foundational";
  };
  
  const expertiseLevel = getExpertiseLevel(level);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="py-6 px-6 md:px-8 border border-border/20 hover:border-primary/30 bg-background/50 rounded-md backdrop-blur-sm transition-all duration-500 hover:shadow-md group">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium tracking-wide">{name}</h3>
            <div className="text-sm text-muted-foreground font-light mt-1">{expertiseLevel}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              // Calculate if this dot should be filled based on level
              // Map level (0-100) to dots (0-5)
              const dotFilled = i < Math.ceil(level / 20);
              
              return (
                <motion.div 
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all duration-300",
                    dotFilled ? "bg-primary" : "bg-muted-foreground/20"
                  )}
                  animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Subtle indicator line that animates based on level */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/0 w-0 group-hover:w-full transition-all duration-700 ease-out" 
          style={{ width: isInView ? `${level}%` : '0%' }} 
        />
      </div>
    </motion.div>
  );
}