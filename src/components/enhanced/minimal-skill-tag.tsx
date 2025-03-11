// src/components/enhanced/minimal-skill-tag.tsx
"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"


interface MinimalSkillTagProps {
  name: string;
  index: number;
  delay?: number;
}

export function MinimalSkillTag({ name, index, delay = 0 }: MinimalSkillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay + (index * 0.05),
        ease: [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      className="inline-block"
    >
      <div className="py-2 px-4 m-1 bg-background/50 backdrop-blur-sm rounded-md border border-border/30 
                    hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
        <span className="font-light tracking-wide text-sm">{name}</span>
      </div>
    </motion.motion>
  );
}

// Alternative version with different styling
export function MinimalSkillPill({ name, index, delay = 0 }: MinimalSkillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: delay + (index * 0.05) 
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="inline-block"
    >
      <div className="py-1.5 px-5 m-1 rounded-full bg-primary/5 hover:bg-primary/10 
                    text-foreground transition-all duration-300 border border-primary/10">
        <span className="font-light tracking-wide text-sm">{name}</span>
      </div>
    </motion.div>
  );
}

// Updated Skills Section for the About page
// In src/app/about/page.tsx, replace the skills section with this

{/* Skills Section - Elegant Minimal */}
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
              <MinimalSkillTag
                key={skill.name}
                name={skill.name}
                index={index}
                delay={groupIndex * 0.1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

// Alternative minimalist grid layout
// Another option for the skills section

{/* Skills Section - Elegant Minimal Grid */}
<section className="py-24 bg-muted/10">
  <div className="container-wide">
    <div className="text-center mb-16">
      <AnimatedText 
        text="Technical Expertise" 
        tag="h2"
        className="title-lg mb-4"
      />
      <p className="subtitle max-w-2xl mx-auto">
        Technologies and tools I've mastered over the years.
      </p>
    </div>
    
    <div className="space-y-20">
      {skills.map((skillGroup, groupIndex) => (
        <div key={skillGroup.category} className="relative">
          {/* Category label on the left side for larger screens */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="transform -rotate-90 origin-center whitespace-nowrap"
            >
              <h3 className="font-serif text-xl font-light tracking-widest text-primary/70 uppercase">
                {skillGroup.category}
              </h3>
            </motion.div>
          </div>
          
          {/* Category label for mobile */}
          <motion.h3 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-serif text-2xl font-normal mb-6 md:hidden"
          >
            {skillGroup.category}
          </motion.h3>
          
          {/* Skills grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-0 md:ml-8">
            {skillGroup.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05 + groupIndex * 0.1
                }}
                viewport={{ once: true }}
                className="p-4 border border-border/20 rounded-lg bg-background/50 backdrop-blur-sm
                         hover:border-primary/30 hover:shadow-sm transition-all duration-300 text-center"
              >
                <span className="font-light">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

// Third option: Magazine-style layout
// A more editorial, Vogue-inspired layout

{/* Skills Section - Magazine Style */}
<section className="py-24">
  <div className="container-wide">
    <div className="text-center mb-16">
      <AnimatedText 
        text="Expertise" 
        tag="h2"
        className="title-lg mb-4"
      />
      <p className="subtitle max-w-2xl mx-auto italic">
        Technologies and methodologies that define my professional portfolio
      </p>
    </div>
    
    {skills.map((skillGroup, groupIndex) => (
      <div key={skillGroup.category} className="mb-24">
        <div className="relative mb-16">
          {/* Large category name as background */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none opacity-5">
            <span className="font-serif text-[8rem] md:text-[12rem] font-bold whitespace-nowrap">
              {skillGroup.category}
            </span>
          </div>
          
          {/* Actual category heading */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative z-10 font-serif text-3xl md:text-4xl font-normal text-center mb-12"
          >
            {skillGroup.category}
          </motion.h3>
          
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {skillGroup.items.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                viewport={{ once: true }}
                className="px-6 py-3 border-b border-primary/30"
              >
                <span className="font-light tracking-wide">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>