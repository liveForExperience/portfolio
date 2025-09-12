import { motion } from 'framer-motion';
import { SkillBar } from '../components';
import { fadeUp, stagger } from '../lib/utils';
import type { Skill } from '../types';

const Skills = () => {
  const skills: Skill[] = [
    // Frontend Technologies
    { id: '1', name: 'React', level: 'expert', category: 'Frontend', weight: 95 },
    { id: '2', name: 'TypeScript', level: 'expert', category: 'Frontend', weight: 90 },
    { id: '3', name: 'Next.js', level: 'advanced', category: 'Frontend', weight: 85 },
    { id: '4', name: 'Vue.js', level: 'advanced', category: 'Frontend', weight: 80 },
    { id: '5', name: 'Svelte', level: 'intermediate', category: 'Frontend', weight: 70 },
    
    // Styling & Design
    { id: '6', name: 'Tailwind CSS', level: 'expert', category: 'Styling', weight: 90 },
    { id: '7', name: 'CSS/SCSS', level: 'expert', category: 'Styling', weight: 95 },
    { id: '8', name: 'Styled Components', level: 'advanced', category: 'Styling', weight: 85 },
    { id: '9', name: 'Framer Motion', level: 'advanced', category: 'Styling', weight: 80 },
    
    // Tools & Build Systems
    { id: '10', name: 'Vite', level: 'advanced', category: 'Tools', weight: 85 },
    { id: '11', name: 'Webpack', level: 'advanced', category: 'Tools', weight: 80 },
    { id: '12', name: 'ESLint/Prettier', level: 'expert', category: 'Tools', weight: 90 },
    { id: '13', name: 'Git', level: 'expert', category: 'Tools', weight: 95 },
    
    // Testing
    { id: '14', name: 'Jest', level: 'advanced', category: 'Testing', weight: 85 },
    { id: '15', name: 'React Testing Library', level: 'advanced', category: 'Testing', weight: 80 },
    { id: '16', name: 'Playwright', level: 'intermediate', category: 'Testing', weight: 75 },
    
    // Backend & APIs
    { id: '17', name: 'Node.js', level: 'advanced', category: 'Backend', weight: 80 },
    { id: '18', name: 'GraphQL', level: 'intermediate', category: 'Backend', weight: 70 },
    { id: '19', name: 'REST APIs', level: 'expert', category: 'Backend', weight: 90 },
  ];

  const categories = ['Frontend', 'Styling', 'Tools', 'Testing', 'Backend'];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeUp} className="text-h1 font-bold mb-6">
              Skills & Expertise
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels 
              across different areas of frontend development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-h3 font-bold mb-8 text-center">{category}</h2>
                
                <motion.div
                  variants={stagger}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {categorySkills.map((skill) => (
                    <motion.div key={skill.id} variants={fadeUp}>
                      <SkillBar skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Level Visualization Legend */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold text-center mb-12"
          >
            Proficiency Levels
          </motion.h2>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { level: 'Expert', description: 'Deep expertise, can mentor others', color: 'bg-green-500' },
              { level: 'Advanced', description: 'Highly proficient, production ready', color: 'bg-blue-500' },
              { level: 'Intermediate', description: 'Comfortable with most features', color: 'bg-yellow-500' },
              { level: 'Beginner', description: 'Basic understanding, learning', color: 'bg-gray-500' },
            ].map((item) => (
              <motion.div
                key={item.level}
                variants={fadeUp}
                className="text-center p-6 bg-background rounded-lg"
              >
                <div className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-3`}></div>
                <h3 className="font-semibold mb-2">{item.level}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
