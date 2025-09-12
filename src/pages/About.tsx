import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/utils';

const About = () => {
  return (
    <div className="pt-16">
      {/* Profile Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeUp} className="text-h1 font-bold mb-6">
              About Me
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted max-w-2xl mx-auto">
              Frontend architect passionate about creating exceptional digital experiences
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="w-full h-96 bg-surface rounded-lg mb-6 flex items-center justify-center">
                <span className="text-muted">Profile Image Placeholder</span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-muted leading-relaxed">
                I'm a frontend architect with over 8 years of experience building scalable, 
                user-centric web applications. My expertise spans modern JavaScript frameworks, 
                design systems, and performance optimization.
              </p>
              <p className="text-muted leading-relaxed">
                I believe in the power of clean code, thoughtful design, and continuous learning. 
                When I'm not coding, you'll find me reading about emerging technologies or 
                watching football matches.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold text-center mb-16"
          >
            Professional Journey
          </motion.h2>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                year: '2024',
                title: 'Senior Frontend Architect',
                company: 'Tech Innovation Co.',
                description: 'Leading frontend architecture decisions and mentoring development teams'
              },
              {
                year: '2022',
                title: 'Frontend Team Lead',
                company: 'Digital Solutions Inc.',
                description: 'Built and scaled frontend teams while delivering high-impact products'
              },
              {
                year: '2020',
                title: 'Senior Frontend Developer',
                company: 'Creative Agency',
                description: 'Developed award-winning web applications for Fortune 500 clients'
              },
              {
                year: '2018',
                title: 'Frontend Developer',
                company: 'Startup Ventures',
                description: 'Full-stack development in fast-paced startup environment'
              }
            ].map((item) => (
              <motion.div
                key={item.year}
                variants={fadeUp}
                className="flex gap-6 p-6 bg-background rounded-lg border border-surface"
              >
                <div className="flex-shrink-0 w-16 text-accent font-semibold">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-accent mb-2">{item.company}</p>
                  <p className="text-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download CV Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-h2 font-bold mb-6">Get My Resume</h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Download my complete CV to learn more about my experience, skills, and achievements.
            </p>
            <motion.button
              className="bg-accent text-background px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV (PDF)
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
