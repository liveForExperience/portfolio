import { motion } from 'framer-motion';
import type { FooterProps } from '../../types';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className="bg-surface border-t border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} Chen Yue. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
