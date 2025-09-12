import { motion } from 'framer-motion';
import type { HeroProps } from '../../types';
import { fadeUp } from '../../lib/utils';

const Hero = ({ title, subtitle, cta }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="text-h1 font-bold mb-6 bg-gradient-to-r from-text to-accent bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>
        
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-xl text-muted mb-12 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {cta.map((button, index) => (
            <motion.a
              key={button.label}
              href={button.url}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                index === 0
                  ? 'bg-accent text-background hover:bg-accent/90'
                  : 'border border-accent text-accent hover:bg-accent hover:text-background'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {button.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
