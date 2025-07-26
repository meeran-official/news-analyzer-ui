'use client'; // This must be a client component

import { motion } from 'framer-motion';

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12" // Keep original styling
    >
      {children}
    </motion.section>
  );
}