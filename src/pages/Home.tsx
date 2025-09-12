import { motion } from 'framer-motion';
import { Hero } from '../components';
import { fadeUp, stagger } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  
  const heroProps = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    cta: [
      { label: t('hero.cta.viewProjects'), url: "/projects" },
      { label: t('hero.cta.getInTouch'), url: "/contact" }
    ]
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero {...heroProps} />

      {/* Featured Projects Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 font-bold mb-4">{t('featuredWork.title')}</h2>
            <p className="text-muted max-w-2xl mx-auto">
              {t('featuredWork.subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: t('featuredWork.projects.ecommerce.title'),
                description: t('featuredWork.projects.ecommerce.description'),
                tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
                image: "/api/placeholder/400/250",
                link: "/projects/ecommerce-platform"
              },
              {
                title: t('featuredWork.projects.designSystem.title'),
                description: t('featuredWork.projects.designSystem.description'),
                tech: ["React", "Storybook", "Jest", "Figma"],
                image: "/api/placeholder/400/250",
                link: "/projects/design-system"
              },
              {
                title: t('featuredWork.projects.analytics.title'),
                description: t('featuredWork.projects.analytics.description'),
                tech: ["React", "D3.js", "WebSocket", "Redis"],
                image: "/api/placeholder/400/250",
                link: "/projects/analytics-dashboard"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="group bg-surface rounded-xl overflow-hidden border border-surface hover:border-accent transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-bold text-xl">{index + 1}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-background rounded text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={project.link}
                    className="text-accent text-sm hover:underline"
                  >
                    {t('featuredWork.viewProject')} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              {t('featuredWork.viewAllProjects')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats & Achievements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "50+", label: t('stats.projectsCompleted') },
              { number: "5+", label: t('stats.yearsExperience') },
              { number: "20+", label: t('stats.technologiesMastered') },
              { number: "100%", label: t('stats.clientSatisfaction') }
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUp} className="text-center">
              <h3 className="text-h3 font-semibold mb-4">{t('highlights.featuredProjects')}</h3>
              <p className="text-muted">{t('highlights.featuredProjectsDesc')}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <h3 className="text-h3 font-semibold mb-4">{t('highlights.technicalExcellence')}</h3>
              <p className="text-muted">{t('highlights.technicalExcellenceDesc')}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="text-center">
              <h3 className="text-h3 font-semibold mb-4">{t('highlights.creativeVision')}</h3>
              <p className="text-muted">{t('highlights.creativeVisionDesc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Snapshot Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-h2 font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Specialized skills in modern web development and creative problem-solving
            </p>
          </motion.div>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                category: "Frontend Development",
                skills: ["React/Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                level: 95,
                icon: "⚛️"
              },
              {
                category: "Backend & Database",
                skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL"],
                level: 85,
                icon: "🛠️"
              },
              {
                category: "Design & UX",
                skills: ["Figma", "UI/UX Design", "Design Systems", "Prototyping"],
                level: 90,
                icon: "🎨"
              },
              {
                category: "DevOps & Tools",
                skills: ["Docker", "AWS", "CI/CD", "Git"],
                level: 80,
                icon: "⚙️"
              },
              {
                category: "Performance",
                skills: ["Web Vitals", "Optimization", "Caching", "Monitoring"],
                level: 88,
                icon: "⚡"
              },
              {
                category: "Architecture",
                skills: ["System Design", "Microservices", "Scalability", "Security"],
                level: 82,
                icon: "🏗️"
              }
            ].map((skillGroup) => (
              <motion.div
                key={skillGroup.category}
                variants={fadeUp}
                className="p-6 bg-surface rounded-xl border border-surface hover:border-accent transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{skillGroup.icon}</span>
                  <h4 className="font-semibold group-hover:text-accent transition-colors">
                    {skillGroup.category}
                  </h4>
                </div>
                <div className="space-y-2 mb-4">
                  {skillGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 bg-background rounded text-xs text-muted mr-2 mb-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Proficiency</span>
                  <span className="text-sm font-medium text-accent">{skillGroup.level}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <motion.div
                    className="bg-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skillGroup.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Me Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 font-bold mb-6">About Chen Yue</h2>
              <div className="space-y-4 text-muted">
                <p>
                  Passionate frontend architect with 5+ years of experience crafting exceptional digital experiences. 
                  I specialize in building scalable, performant web applications using modern technologies like React, 
                  TypeScript, and cutting-edge design systems.
                </p>
                <p>
                  My approach combines technical excellence with creative vision, ensuring every project not only 
                  functions flawlessly but also delivers an outstanding user experience. I believe in writing clean, 
                  maintainable code and staying at the forefront of web development trends.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, reading about design principles, 
                  or enjoying football matches. I'm always eager to take on new challenges and collaborate on 
                  innovative projects.
                </p>
              </div>
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Learn More About Me
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-background p-6 rounded-xl border border-surface">
                <h4 className="font-semibold mb-4 flex items-center">
                  <span className="text-accent mr-2">🎯</span>
                  Current Focus
                </h4>
                <ul className="space-y-2 text-muted">
                  <li>• Building scalable React applications with TypeScript</li>
                  <li>• Exploring Web3 and blockchain technologies</li>
                  <li>• Contributing to open-source projects</li>
                  <li>• Mentoring junior developers</li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-xl border border-surface">
                <h4 className="font-semibold mb-4 flex items-center">
                  <span className="text-accent mr-2">🏆</span>
                  Recent Achievements
                </h4>
                <ul className="space-y-2 text-muted">
                  <li>• Led frontend architecture for 3 major product launches</li>
                  <li>• Improved app performance by 40% through optimization</li>
                  <li>• Built design system adopted by 50+ developers</li>
                  <li>• Speaker at 2 tech conferences in 2024</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interests Teaser Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-bold mb-4">Beyond Code</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Exploring interests that fuel creativity and innovation
            </p>
          </motion.div>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeUp} className="group p-8 bg-surface rounded-xl border border-surface hover:border-accent transition-all duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-h3 font-semibold mb-4 group-hover:text-accent transition-colors">Reading & Learning</h3>
              <p className="text-muted mb-4">Curated collection of books on technology, design, and innovation. Always learning, always growing.</p>
              <Link to="/interests" className="text-accent hover:underline font-medium">
                Explore Reading List →
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="group p-8 bg-surface rounded-xl border border-surface hover:border-accent transition-all duration-300">
              <div className="text-4xl mb-4">⚽</div>
              <h3 className="text-h3 font-semibold mb-4 group-hover:text-accent transition-colors">Football Passion</h3>
              <p className="text-muted mb-4">Highlights and moments from the beautiful game. Football teaches teamwork and strategy.</p>
              <Link to="/interests" className="text-accent hover:underline font-medium">
                Watch Videos →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-bold mb-4">Let's Work Together</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
            </p>
            <motion.a
              href="/contact"
              className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
