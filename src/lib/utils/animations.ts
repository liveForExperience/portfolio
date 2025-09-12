import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 12 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

export const stagger: Variants = {
  container: { 
    transition: {
      staggerChildren: 0.08 
    }
  }
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Enhanced variants that respect motion preferences
export const createMotionVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      initial: {},
      animate: {}
    };
  }
  return variants;
};
